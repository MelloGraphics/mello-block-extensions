import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { ComboboxControl, Notice, SelectControl, Spinner, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

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
        // Fetched from /wp/v2/acf/field-groups when ACF mode is toggled on.
        // Requires "Show in REST API" to be enabled on each ACF field group.
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
                    // Fetch fields for every group in parallel
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

        // ── Toggle handlers ───────────────────────────────────────────────────
        const onTaxonomyToggle = () => {
            const newState = !matchCurrentTaxonomy;
            setAttributes({
                matchCurrentTaxonomy: newState,
                ...(newState && { matchAcfField: false, matchAcfFieldName: '', matchAcfDirection: 'pull' }),
                ...(!newState && { matchTaxonomySlug: '' }),
            });
        };

        const onAcfToggle = () => {
            const newState = !matchAcfField;
            setAttributes({
                matchAcfField: newState,
                ...(newState && { matchCurrentTaxonomy: false, matchTaxonomySlug: '' }),
                ...(!newState && { matchAcfFieldName: '', matchAcfDirection: 'pull' }),
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

            // REST API not available or no qualifying fields found — fall back
            // to a plain text input and show a setup notice.
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

            // Happy path — show a searchable combobox of available fields.
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

        return (
            <>
                <BlockEdit {...props} />
                <InspectorAdvancedControls>

                    {/* ── Taxonomy mode ── */}
                    <ToggleControl
                        label={__('Match Current Taxonomy', 'extend-query-block')}
                        help={
                            matchCurrentTaxonomy
                                ? __("Query will filter by the current post's terms in the selected taxonomy.", 'extend-query-block')
                                : __('Show related posts that share a taxonomy term with the current post.', 'extend-query-block')
                        }
                        checked={matchCurrentTaxonomy}
                        onChange={onTaxonomyToggle}
                        disabled={matchAcfField}
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
                        label={__('Match ACF Relationship Field', 'extend-query-block')}
                        help={
                            matchAcfField
                                ? __('Query will return posts linked via the specified ACF field.', 'extend-query-block')
                                : __('Show posts linked to the current post via an ACF Relationship or Post Object field.', 'extend-query-block')
                        }
                        checked={matchAcfField}
                        onChange={onAcfToggle}
                        disabled={matchCurrentTaxonomy}
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