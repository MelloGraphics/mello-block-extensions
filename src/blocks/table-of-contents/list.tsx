/**
 * External dependencies
 */
import type { MouseEvent, ReactElement } from 'react';
import React from 'react'; // <-- Added to resolve the TS error about React global

/**
 * Internal dependencies
 */
import type { NestedHeadingData } from './utils';

const ENTRY_CLASS_NAME = 'mello-block-table-of-contents__entry';

/**
 * TableOfContentsList component
 *
 * This component accepts a list of nested headings and renders them as a table of contents.
 * Each heading is rendered as either an anchor (<a>) if a link is provided, or a span otherwise.
 * If a heading node contains children, it recursively renders another TableOfContentsList inside an ordered list (<ol>).
 *
 * Props:
 * - nestedHeadingList: An array of heading data, which includes the text content and link (if any).
 * - disableLinkActivation (optional): A flag that, when true, disables link activation via the aria-disabled attribute.
 * - onClick (optional): A click handler for the anchor elements, used when link activation is disabled.
 */
export default function TableOfContentsList( {
	nestedHeadingList,
	disableLinkActivation,
	onClick,
}: {
	nestedHeadingList: NestedHeadingData[];
	disableLinkActivation?: boolean;
	onClick?: ( event: MouseEvent< HTMLAnchorElement > ) => void;
} ): ReactElement {
	return (
		<>
			{ nestedHeadingList.map( ( node, index ) => {
				const { content, link } = node.heading;

				// Conditionally render an anchor or a span based on whether a link exists
				const entry = link ? (
					<a
						className={ ENTRY_CLASS_NAME }
						href={ link }
						aria-disabled={ disableLinkActivation || undefined }
						onClick={
							disableLinkActivation &&
							'function' === typeof onClick
								? onClick
								: undefined
						}
					>
						{ content }
					</a>
				) : (
					<span className={ ENTRY_CLASS_NAME }>{ content }</span>
				);

				return (
					<li key={ index }>
						{ entry }
						{ node.children ? (
							<ol>
								<TableOfContentsList
									nestedHeadingList={ node.children }
									disableLinkActivation={ disableLinkActivation }
									onClick={
										disableLinkActivation &&
										'function' === typeof onClick
											? onClick
											: undefined
									}
								/>
							</ol>
						) : null }
					</li>
				);
			} ) }
		</>
	);
}