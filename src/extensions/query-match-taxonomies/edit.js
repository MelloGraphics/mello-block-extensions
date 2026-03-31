import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { ComboboxControl, FormTokenField, Notice, SelectControl, Spinner, TextControl, ToggleControl } from '@wordpress/components';
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __, sprintf } from '@wordpress/i18n';

const apiFetch = wp.apiFetch;

function addAttributes(settings) {
    if ('core/query' !== settings.name) {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            // Taxonomy mode
            matchCurrentTaxonomy: {
                type: 'boolean',
                default: false,
            },
            matchTaxonomySlug: {
                type: 'string',
                default: '',
            },
            // ACF mode
            matchAcfField: {
                type: 'boolean',
                default: false,
            },
            matchAcfFieldName: {
                type: 'string',
                default: '',
            },
            // 'pull' — field is on the current post, pointing outward to other posts
            // 'push' — field is on other posts, pointing back to the current post
            matchAcfDirection: {
                type: 'string',
                default: 'pull',
            },
            // Static post picker mode
            matchStaticPosts: {
                type: 'boolean',
                default: false,
            },
            matchStaticPostIds: {
                type: 'array',
                default: [],
                items: { type: 'integer' },
            },
        },
    };
}

addFilter(
    'blocks.registerBlockType',
    'extend-query-block/taxonomy-match-attributes',
    addAttributes
);

function addInspectorControls(BlockEdit) {
    return (props) => {
        if (props.name !== 'core/query') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const {
            matchCurrentTaxonomy,
            matchTaxonomySlug,
            matchAcfField,
            matchAcfFieldName,
            matchAcfDirection,
            matchStaticPosts,
            matchStaticPostIds,
        } = attributes;

        // ── Taxonomy options ──────────────────────────────────────────────────
        const [taxonomies, setTaxonomies]           = useState([]);
        const [taxonomiesLoading, setTaxonomiesLoading] = useState(false);

        useEffect(() => {
            setTaxonomiesLoading(true);
            apiFetch({ path: '/wp/v2/taxonomies?context=edit' })
                .then((response) => {
                    const options = Object.values(response)
                        .filter((tax) => tax.visibility?.show_ui !== false)
                        .map((tax) => ({ label: tax.name, value: tax.slug }));

                    setTaxonomies([
                        { label: __('— Select a Taxonomy —', 'extend-query-block'), value: '' },
                        ...options,
                    ]);

                    if (matchTaxonomySlug && !options.find((o) => o.value === matchTaxonomySlug)) {
                        setAttributes({ matchTaxonomySlug: '' });
                    }
                })
                .catch(() => {
                    setTaxonomies([{ label: __('Error loading taxonomies', 'extend-query-block'), value: '' }]);
                })
                .finally(() => setTaxonomiesLoading(false));
        }, []);

        // ── ACF field options ─────────────────────────────────────────────────
        const [acfFields, setAcfFields]         = useState([]);
        const [acfLoading, setAcfLoading]       = useState(false);
        const [acfRestError, setAcfRestError]   = useState(false);
        const [acfFilterText, setAcfFilterText] = useState('');

        useEffect(() => {
            if (!matchAcfField) return;

            setAcfLoading(true);
            setAcfRestError(false);

            apiFetch({ path: '/wp/v2/acf/field-groups?per_page=100' })
                .then((groups) => {
                    return Promise.all(
                        groups.map((group) =>
                            apiFetch({ path: `/wp/v2/acf/field-groups/${group.id}/fields?per_page=100` })
                                .then((fields) =>
                                    fields
                                        .filter((f) =>
                                            ['relationship', 'post_object'].includes(f.type)
                                        )
                                        .map((f) => ({
                                            label: `${f.label} (${f.name}) — ${group.title}`,
                                            value: f.name,
                                        }))
                                )
                                .catch(() => [])
                        )
                    );
                })
                .then((grouped) => {
                    const flat = grouped.flat();
                    setAcfFields(flat);
                    if (flat.length === 0) {
                        setAcfRestError('no_fields');
                    }
                })
                .catch(() => {
                    setAcfRestError('no_rest');
                })
                .finally(() => setAcfLoading(false));
        }, [matchAcfField]);

        // Filtered options for the combobox
        const filteredAcfOptions = useMemo(() => {
            if (!acfFilterText) return acfFields;
            const lower = acfFilterText.toLowerCase();
            return acfFields.filter(
                (f) =>
                    f.label.toLowerCase().includes(lower) ||
                    f.value.toLowerCase().includes(lower)
            );
        }, [acfFields, acfFilterText]);

        // ── Static post picker ────────────────────────────────────────────────
        // postMap:     id → title   (for token display)
        // postTypeMap: id → subtype (for auto-setting query.postType on the preview)
        const [postMap, setPostMap]               = useState({});
        const [postTypeMap, setPostTypeMap]       = useState({});
        const [postSuggestions, setPostSuggestions] = useState([]);
        const [postSearchLoading, setPostSearchLoading] = useState(false);

        // Derive the postType to feed to query.postType for the editor preview.
        // core/query's preview fetches /wp/v2/{postType}?include[]=... so the
        // postType must match the selected items. We use the type of the first
        // selected ID; if the selection is mixed, the preview will only show
        // items of that type (a REST API limitation).
        const derivedPostType = useMemo(() => {
            if (!matchStaticPostIds?.length) return null;
            const firstId = matchStaticPostIds[0];
            return postTypeMap[firstId] ?? null;
        }, [matchStaticPostIds, postTypeMap]);

        // On mount (or when the attribute loads), hydrate titles + subtypes for
        // already-saved IDs. Uses /wp/v2/search with include[] — post-type agnostic.
        useEffect(() => {
            if (!matchStaticPosts || !matchStaticPostIds?.length) return;

            const missingIds = matchStaticPostIds.filter((id) => !postMap[id]);
            if (!missingIds.length) return;

            const includeParam = missingIds.map((id) => `include[]=${id}`).join('&');
            apiFetch({ path: `/wp/v2/search?${includeParam}&per_page=100&type=post&subtype=any&_fields=id,title,subtype` })
                .then((results) => {
                    const newTitles = {};
                    const newTypes  = {};
                    results.forEach((r) => {
                        newTitles[r.id] = r.title;
                        newTypes[r.id]  = r.subtype ?? 'post';
                    });
                    missingIds.forEach((id) => {
                        if (!newTitles[id]) newTitles[id] = `#${id}`;
                    });
                    setPostMap((prev)     => ({ ...prev, ...newTitles }));
                    setPostTypeMap((prev) => ({ ...prev, ...newTypes }));
                })
                .catch(() => {
                    setPostMap((prev) => {
                        const next = { ...prev };
                        missingIds.forEach((id) => { if (!next[id]) next[id] = `#${id}`; });
                        return next;
                    });
                });
        }, [matchStaticPosts, matchStaticPostIds]);

        // When derivedPostType changes, sync query.postType so the editor
        // preview fetches from the correct REST endpoint.
        useEffect(() => {
            if (!matchStaticPosts || !derivedPostType) return;
            if (attributes.query?.postType === derivedPostType) return;
            setAttributes({ query: { ...attributes.query, postType: derivedPostType } });
        }, [matchStaticPosts, derivedPostType]);

        // Debounced search — fires when the user types in the token field.
        const searchTimeout = useState(null);
        const handlePostSearch = useCallback((input) => {
            if (searchTimeout[0]) clearTimeout(searchTimeout[0]);
            if (!input || input.length < 2) {
                setPostSuggestions([]);
                return;
            }

            setPostSearchLoading(true);
            searchTimeout[0] = setTimeout(() => {
                apiFetch({
                    path: `/wp/v2/search?search=${encodeURIComponent(input)}&type=post&subtype=any&per_page=20&_fields=id,title,subtype`,
                })
                    .then((results) => {
                        const newTitles = {};
                        const newTypes  = {};
                        results.forEach((r) => {
                            newTitles[r.id] = r.title;
                            newTypes[r.id]  = r.subtype ?? 'post';
                        });
                        setPostMap((prev)     => ({ ...prev, ...newTitles }));
                        setPostTypeMap((prev) => ({ ...prev, ...newTypes }));

                        setPostSuggestions(
                            results.map((r) => `${r.title} [${r.subtype ?? 'post'}] #${r.id}`)
                        );
                    })
                    .catch(() => setPostSuggestions([]))
                    .finally(() => setPostSearchLoading(false));
            }, 300);
        }, []);

        // Convert saved IDs to token strings for display.
        const selectedTokens = useMemo(() => {
            return (matchStaticPostIds ?? []).map((id) =>
                postMap[id] ? `${postMap[id]} #${id}` : `#${id}`
            );
        }, [matchStaticPostIds, postMap]);

        // Convert token strings to IDs on change, and keep query.postType + query.include in sync.
        const handleTokenChange = useCallback((tokens) => {
            const ids = tokens.map((token) => {
                const match = token.match(/#(\d+)$/);
                return match ? parseInt(match[1], 10) : null;
            }).filter(Boolean);

            // Determine postType from the first selected ID so the preview works.
            const firstType = ids.length ? (postTypeMap[ids[0]] ?? attributes.query?.postType ?? 'post') : (attributes.query?.postType ?? 'post');

            setAttributes({
                matchStaticPostIds: ids,
                query: {
                    ...attributes.query,
                    include:  ids.length ? ids : undefined,
                    postType: firstType,
                },
            });
        }, [setAttributes, attributes.query, postTypeMap]);

        // Toggle handlers
        const onTaxonomyToggle = () => {
            const newState = !matchCurrentTaxonomy;
            setAttributes({
                matchCurrentTaxonomy: newState,
                ...(newState && {
                    matchAcfField: false,
                    matchAcfFieldName: '',
                    matchAcfDirection: 'pull',
                    matchStaticPosts: false,
                    matchStaticPostIds: [],
                    query: { ...attributes.query, include: undefined },
                }),
                ...(!newState && { matchTaxonomySlug: '' }),
            });
        };

        const onAcfToggle = () => {
            const newState = !matchAcfField;
            setAttributes({
                matchAcfField: newState,
                ...(newState && {
                    matchCurrentTaxonomy: false,
                    matchTaxonomySlug: '',
                    matchStaticPosts: false,
                    matchStaticPostIds: [],
                    query: { ...attributes.query, include: undefined },
                }),
                ...(!newState && { matchAcfFieldName: '', matchAcfDirection: 'pull' }),
            });
        };

        const onStaticPostsToggle = () => {
            const newState = !matchStaticPosts;
            setAttributes({
                matchStaticPosts: newState,
                ...(newState && {
                    matchCurrentTaxonomy: false,
                    matchTaxonomySlug: '',
                    matchAcfField: false,
                    matchAcfFieldName: '',
                    matchAcfDirection: 'pull',
                    // Seed include + postType with already-saved IDs when re-enabling
                    query: {
                        ...attributes.query,
                        include:  matchStaticPostIds?.length ? matchStaticPostIds : undefined,
                        postType: matchStaticPostIds?.length && derivedPostType ? derivedPostType : attributes.query?.postType,
                    },
                }),
                ...(!newState && {
                    matchStaticPostIds: [],
                    // Restore postType to 'post' (core default) when turning off
                    query: { ...attributes.query, include: undefined, postType: 'post' },
                }),
            });
        };

        const directionHelp = matchAcfDirection === 'pull'
            ? __('Pull: the field lives on the current post and points to the posts you want to show.', 'extend-query-block')
            : __('Push: the field lives on other posts and points back to the current post — those posts are shown.', 'extend-query-block');

        // ── ACF field picker UI ───────────────────────────────────────────────
        const renderAcfFieldPicker = () => {
            if (acfLoading) {
                return <Spinner />;
            }

            if (acfRestError) {
                const noticeText = acfRestError === 'no_rest'
                    ? __(
                        'ACF fields could not be loaded. To enable the field picker, open each ACF field group in the ACF admin, scroll to "Settings", and enable "Show in REST API". Until then you can type the field name manually below.',
                        'extend-query-block'
                    )
                    : __(
                        'No Relationship or Post Object fields were found via the REST API. Make sure "Show in REST API" is enabled on the field group that contains the field you want to use, then reload the editor.',
                        'extend-query-block'
                    );

                return (
                    <>
                        <Notice status="warning" isDismissible={false}>
                            {noticeText}
                        </Notice>
                        <TextControl
                            __next40pxDefaultSize
                            label={__('ACF Field Name', 'extend-query-block')}
                            value={matchAcfFieldName}
                            onChange={(value) => setAttributes({ matchAcfFieldName: value.trim() })}
                            help={__('Enter the field name exactly as it appears in ACF (e.g. related_posts). This is the "Field Name", not the label.', 'extend-query-block')}
                            placeholder="e.g. related_posts"
                        />
                    </>
                );
            }

            return (
                <ComboboxControl
                    __next40pxDefaultSize
                    label={__('ACF Field', 'extend-query-block')}
                    help={__(
                        'Shows Relationship and Post Object fields from field groups with "Show in REST API" enabled.',
                        'extend-query-block'
                    )}
                    value={matchAcfFieldName}
                    options={filteredAcfOptions}
                    onFilterValueChange={(text) => setAcfFilterText(text)}
                    onChange={(value) => setAttributes({ matchAcfFieldName: value ?? '' })}
                    allowReset
                />
            );
        };

        // ── Static post picker UI ─────────────────────────────────────────────
        const renderStaticPostPicker = () => {
            return (
                <>
                    <FormTokenField
                        label={__('Select Posts / Pages', 'extend-query-block')}
                        value={selectedTokens}
                        suggestions={postSuggestions}
                        onInputChange={handlePostSearch}
                        onChange={handleTokenChange}
                        help={__(
                            'Search by title across all post types. Selected items will be shown in this query.',
                            'extend-query-block'
                        )}
                        placeholder={__('Type to search…', 'extend-query-block')}
                        __experimentalShowHowTo={false}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />
                    {postSearchLoading && <Spinner />}
                    {matchStaticPostIds?.length > 0 && (
                        <>
                            <p style={{ fontSize: '11px', color: '#757575', margin: '4px 0 8px' }}>
                                {matchStaticPostIds.length === 1
                                    ? __('1 post selected', 'extend-query-block')
                                    : sprintf(
                                        // translators: %d = number of posts selected
                                        __('%d posts selected', 'extend-query-block'),
                                        matchStaticPostIds.length
                                    )}
                                {derivedPostType && (
                                    <> &mdash; {sprintf(
                                        // translators: %s = post type slug
                                        __('post type set to "%s"', 'extend-query-block'),
                                        derivedPostType
                                    )}</>
                                )}
                            </p>
                            <Notice status="info" isDismissible={false} style={{ marginBottom: '8px' }}>
                                {__('The "Post type" setting above is managed automatically while specific posts are selected. Mixed post types will preview using the type of the first selected item.', 'extend-query-block')}
                            </Notice>
                        </>
                    )}
                </>
            );
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorAdvancedControls>

                    {/* ── Taxonomy mode ── */}
                    <ToggleControl
                        __nextHasNoMarginBottom
                        label={__('Match Current Taxonomy', 'extend-query-block')}
                        help={
                            matchCurrentTaxonomy
                                ? __("Query will filter by the current post's terms in the selected taxonomy.", 'extend-query-block')
                                : __('Show related posts that share a taxonomy term with the current post.', 'extend-query-block')
                        }
                        checked={matchCurrentTaxonomy}
                        onChange={onTaxonomyToggle}
                        disabled={matchAcfField || matchStaticPosts}
                    />

                    {matchCurrentTaxonomy && (
                        taxonomiesLoading ? <Spinner /> : (
                            <SelectControl
                                __next40pxDefaultSize
                                label={__('Taxonomy', 'extend-query-block')}
                                value={matchTaxonomySlug}
                                options={taxonomies}
                                onChange={(value) => setAttributes({ matchTaxonomySlug: value })}
                                help={__('Posts sharing any term in this taxonomy with the current post will be returned.', 'extend-query-block')}
                            />
                        )
                    )}

                    {/* ── ACF field mode ── */}
                    <ToggleControl
                        __nextHasNoMarginBottom
                        label={__('Match ACF Relationship Field', 'extend-query-block')}
                        help={
                            matchAcfField
                                ? __('Query will return posts linked via the specified ACF field.', 'extend-query-block')
                                : __('Show posts linked to the current post via an ACF Relationship or Post Object field.', 'extend-query-block')
                        }
                        checked={matchAcfField}
                        onChange={onAcfToggle}
                        disabled={matchCurrentTaxonomy || matchStaticPosts}
                    />

                    {matchAcfField && (
                        <>
                            {renderAcfFieldPicker()}

                            <SelectControl
                                __next40pxDefaultSize
                                label={__('Field Direction', 'extend-query-block')}
                                value={matchAcfDirection}
                                options={[
                                    { label: __('Pull — field is on this post', 'extend-query-block'), value: 'pull' },
                                    { label: __('Push — field is on other posts', 'extend-query-block'), value: 'push' },
                                ]}
                                onChange={(value) => setAttributes({ matchAcfDirection: value })}
                                help={directionHelp}
                            />
                        </>
                    )}

                    {/* ── Static post picker mode ── */}
                    <ToggleControl
                        __nextHasNoMarginBottom
                        label={__('Show Specific Posts', 'extend-query-block')}
                        help={
                            matchStaticPosts
                                ? __('Query will return only the manually selected posts below.', 'extend-query-block')
                                : __('Manually pick specific posts or pages to display in this query.', 'extend-query-block')
                        }
                        checked={matchStaticPosts}
                        onChange={onStaticPostsToggle}
                        disabled={matchCurrentTaxonomy || matchAcfField}
                    />

                    {matchStaticPosts && renderStaticPostPicker()}

                </InspectorAdvancedControls>
            </>
        );
    };
}

addFilter(
    'editor.BlockEdit',
    'extend-query-block/taxonomy-match-inspector-controls',
    addInspectorControls
);