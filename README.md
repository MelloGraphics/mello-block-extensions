<h1 >Mello Block Extensions</h1>

<p >
  A modular plugin for extending WordPress core blocks with enhanced functionality, built for Mello Graphics projects.
  <br /><br />
  <a href="https://mellographics.com" target="blank"><strong>Visit Mello Graphics</strong></a>
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
├── build/               # Compiled assets for active extensions
├── src/blocks/         # Source files for each block extension
├── inc/                # Admin panel, enqueue logic, helpers
├── languages/          # .pot file for translations
├── webpack.config.js   # Custom build process
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

<h2>Example Extensions</h2>

<table>
  <thead>
    <tr>
      <th>Extension</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>extend-core-button-modal</code></td>
      <td>Adds modal popup support to core Button block</td>
    </tr>
    <tr>
      <td><code>extend-core-columns</code></td>
      <td>Adds responsive layout options to core Columns block</td>
    </tr>
    <tr>
      <td><code>extend-core-cover-ext-video</code></td>
      <td>Allows external video URLs (YouTube/Vimeo) in Cover block</td>
    </tr>
    <tr>
      <td><code>extend-core-query-video</code></td>
      <td>Enables featured video (ACF) inside Query Loop block</td>
    </tr>
    <tr>
      <td><code>extend-core-details-heading-level</code></td>
      <td>Adds custom heading level control inside the Details block</td>
    </tr>
    <tr>
      <td><code>extend-core-navigation-link</code></td>
      <td>Adds custom data attributes to nav links</td>
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
  <img src="https://via.placeholder.com/1200x600?text=Mello+Block+Extensions+Admin+Screenshot" alt="Mello Block Extensions Admin Screenshot" />
</p>

<h2>Roadmap</h2>
<ul>
  <li>[ ] UI improvements for admin toggles</li>
  <li>[ ] Auto-detection of available extensions</li>
  <li>[ ] Extension grouping in admin UI</li>
  <li>[ ] JSON config import/export</li>
</ul>

<h2>License</h2>
<p>GPL-3.0 © <a href="https://mellographics.com">Mello Graphics</a></p>

<h2>Maintainer</h2>
<p><strong>Ashley Pickering</strong> – <a href="https://mellographics.com">https://mellographics.com</a></p>