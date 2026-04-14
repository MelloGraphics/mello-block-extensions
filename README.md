<h1>Mello Block Extensions</h1>

<p>
  A modular plugin for extending WordPress core blocks with enhanced functionality, built for Mello Graphics projects.
  <br /><br />
  <a href="https://mellographics.com" target="_blank"><strong>Visit Mello Graphics</strong></a>
</p>

<hr />

<h2>Overview</h2>

<p>
  <strong>Mello Block Extensions</strong> allows toggled enhancements for WordPress core blocks through a modular, well-structured plugin architecture.
  Each enhancement (or "extension") targets a specific core block and can be enabled or disabled from the WordPress admin interface.
</p>

<h2>Plugin Structure</h2>

<pre><code>
mello-block-extensions/
├── build/              # Compiled assets for active extensions
├── src/blocks/         # Source files for each MelloBlock
├── src/extensions/     # Source files for each block extension
├── inc/                # Admin panel, enqueue logic, helpers
├── languages/          # .pot file for translations
├── bin/                # Holds custom build processes
├── mello-block-extensions.php  # Plugin bootstrap
</code></pre>

<p>Each extension includes:</p>
<ul>
  <li><code>edit.js</code> – Editor enhancements</li>
  <li><code>frontend.js</code> – Front-end JS (optional)</li>
  <li><code>styles.scss</code> – Front-end styles</li>
  <li><code>editor.scss</code> – Editor styles</li>
  <li><code>block-functions.php</code> – Optional PHP for rendering filters/templates</li>
</ul>

<h2>Extensions</h2>

<table>
  <thead>
    <tr>
      <th>Extension</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>add-data-attributes</code></td>
      <td>Adds an input to render custom data attributes on the front end</td>
    </tr>
    <tr>
      <td><code>add-smooth-scroll</code></td>
      <td>Adds smooth scroll controls to core and mellobase blocks</td>
    </tr>
    <tr>
      <td><code>animation-controls</code></td>
      <td>Adds scroll-triggered animation controls to core and mellobase blocks</td>
    </tr>
    <tr>
      <td><code>button-icon-toggle</code></td>
      <td>Adds icon upload and position controls to the core Button block</td>
    </tr>
    <tr>
      <td><code>button-modal-toggle</code></td>
      <td>Adds modal popup support to the core Button block</td>
    </tr>
    <tr>
      <td><code>buttons-allow-additional-blocks</code></td>
      <td>Allows additional blocks to be nested inside the core Buttons block</td>
    </tr>
    <tr>
      <td><code>columns-reverse-toggle</code></td>
      <td>Adds a responsive reverse-order toggle to the core Columns block</td>
    </tr>
    <tr>
      <td><code>content-in-modal-toggle</code></td>
      <td>Adds a toggle to wrap block content inside a modal on the front end</td>
    </tr>
    <tr>
      <td><code>cover-ext-video</code></td>
      <td>Allows external video URLs (YouTube/Vimeo) in the core Cover block</td>
    </tr>
    <tr>
      <td><code>details-faq-schema</code></td>
      <td>Adds a toggle that outputs FAQ schema markup on the core Details block</td>
    </tr>
    <tr>
      <td><code>details-heading-level</code></td>
      <td>Adds a custom heading level control inside the core Details block</td>
    </tr>
    <tr>
      <td><code>details-name-attribute</code></td>
      <td>Adds a name attribute input to the core Details block</td>
    </tr>
    <tr>
      <td><code>group-link-wrapper</code></td>
      <td>Adds a URL link wrapper to the core Group block via the toolbar</td>
    </tr>
    <tr>
      <td><code>group-tag-name</code></td>
      <td>Adds additional HTML tag options to the core Group block</td>
    </tr>
    <tr>
      <td><code>load-motion-library</code></td>
      <td>Loads the Motion.js animation library globally on the front end</td>
    </tr>
    <tr>
      <td><code>navigation-allowed-blocks</code></td>
      <td>Allows additional blocks within the core Navigation block to create complex menus</td>
    </tr>
    <tr>
      <td><code>navigation-link-render-image</code></td>
      <td>Renders an image inside the core Navigation Link block</td>
    </tr>
    <tr>
      <td><code>query-exclude-current-post</code></td>
      <td>Re-renders the Query Loop block excluding the current post from results</td>
    </tr>
    <tr>
      <td><code>query-match-taxonomies</code></td>
      <td>Adds taxonomy-matching controls to filter the Query Loop by related terms</td>
    </tr>
    <tr>
      <td><code>query-render-featured-video</code></td>
      <td>Enables featured video (ACF) inside the Query Loop block. Requires an ACF <code>featured_video</code> field.</td>
    </tr>
    <tr>
      <td><code>render-svg</code></td>
      <td>Adds a toggle to render inline SVG output on image-based blocks</td>
    </tr>
  </tbody>
</table>

<h2>MelloBlocks</h2>

<table>
  <thead>
    <tr>
      <th>Block</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Swiper</td>
      <td>Full-featured Swiper.js slider block supporting query elements, responsive slides, autoplay, pagination, navigation, creative effects, and more</td>
    </tr>
    <tr>
      <td>Counter</td>
      <td>Displays stats and figures animated in on scroll</td>
    </tr>
    <tr>
      <td>Featured Video</td>
      <td>Renders a featured video field (ACF) for the current post</td>
    </tr>
  </tbody>
</table>

<h2>Deprecated Extensions</h2>

<p>The following extensions are no longer in active use and have been excluded from the build:</p>

<table>
  <thead>
    <tr>
      <th>Extension</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>post-type</code> block</td>
      <td>Superseded by WordPress core</td>
    </tr>
    <tr>
      <td><code>read-time</code> block</td>
      <td>Superseded by WordPress core</td>
    </tr>
    <tr>
      <td><code>add-data-aria-label</code></td>
      <td>Superseded by <code>add-data-attributes</code></td>
    </tr>
    <tr>
      <td><code>mega-menu</code></td>
      <td>No longer maintained</td>
    </tr>
    <tr>
      <td><code>mega-menu-section</code></td>
      <td>No longer maintained</td>
    </tr>
  </tbody>
</table>

<h2>Developer Admin Settings</h2>

<p>
  The plugin adds a settings page under <strong>Settings → Block Extensions</strong> where you can:
</p>
<ul>
  <li>Toggle individual extensions on/off</li>
  <li>Dynamically load assets (JS/CSS/PHP) only for enabled extensions</li>
  <li>Theme-specific configurations (coming soon)</li>
</ul>

<h2>Installation</h2>

<ol>
  <li>Visit the <a href="https://github.com/MelloGraphics/mello-block-extensions/releases">GitHub Releases page</a>.</li>
  <li>Download the latest <code>.zip</code> release of the plugin.</li>
  <li>In your WordPress admin, go to <strong>Plugins → Add New → Upload Plugin</strong>.</li>
  <li>Upload the zip and activate the plugin.</li>
</ol>

<h2>Development</h2>

<h3>Requirements</h3>
<ul>
  <li>Node.js & npm</li>
  <li>WordPress with a block-based theme</li>
</ul>

<h3>Install & Build</h3>

<pre><code>
npm install
npm run build
</code></pre>

<h3>Dev Scripts</h3>
<ul>
  <li><code>npm run build</code> – Build all enabled extensions</li>
  <li><code>npm run start</code> – Watch mode for dev</li>
  <li><code>npm run export</code> – Create deployable plugin .zip</li>
</ul>

<h2>Screenshot</h2>

<p>
  <img src="https://mellographics.com/images/mello-blocks/mello-block-extensions.png" alt="Mello Block Extensions Admin Screenshot" />
</p>

<h2>Roadmap</h2>
<ul>
  <li>[ ] Scroll based animations</li>
  <li>[ ] Auto-detection of available extensions</li>
  <li>[ ] Extension grouping in admin UI</li>
  <li>[ ] JSON config import/export</li>
</ul>

<h2>License</h2>
<p>GPL-2.0+ © <a href="https://mellographics.com">Mello Graphics</a></p>

<h2>Maintainer</h2>
<p><strong>Ashley Pickering</strong> – <a href="https://mellographics.com">https://mellographics.com</a></p>
