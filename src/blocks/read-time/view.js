/**
 * Use this file for JavaScript code that you want to run in the front-end 
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any 
 * JavaScript running in the front-end, then you should delete this file and remove 
 * the `viewScript` property from `block.json`. 
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

console.log('Read Time Script Loaded'); // Debugging

const wordsPerMinute = 200;
const postContentElement = document.querySelector('.entry-content'); // Find the post content

const postContent = postContentElement.innerText.trim();
const wordCount = postContent ? postContent.split(/\s+/).length : 0;
const readTime = Math.ceil(wordCount / wordsPerMinute);

console.log(`Word Count: ${wordCount}, Read Time: ${readTime} min`); // Debugging

document.querySelectorAll('.wp-block-mello-block-read-time').forEach((block) => {
    block.innerText = `${readTime}min read`;
});