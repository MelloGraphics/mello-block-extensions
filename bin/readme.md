<h1>Mello Block Extensions</h1>
<p>Custom block extensions and functionality for WordPress block themes.</p>

<h2>Development Scripts</h2>
<p>This plugin uses npm scripts to automate development tasks. Here's a breakdown of available commands:</p>

<h3>Build & Development</h3>
<table>
    <tr>
        <th>Command</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>npm run build</code></td>
        <td>Builds both blocks and extensions for production. Outputs to <code>build/blocks</code> and <code>build/extensions</code> directories.</td>
    </tr>
    <tr>
        <td><code>npm run start</code></td>
        <td>Starts development mode with hot reloading for both blocks and extensions.</td>
    </tr>
    <tr>
        <td><code>npm run prepare</code></td>
        <td>Runs build automatically after npm install.</td>
    </tr>
</table>

<h3>Code Quality</h3>
<table>
    <tr>
        <th>Command</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>npm run lint:css</code></td>
        <td>Lints CSS/SCSS files for code quality issues.</td>
    </tr>
    <tr>
        <td><code>npm run lint:js</code></td>
        <td>Lints JavaScript files for code quality issues.</td>
    </tr>
    <tr>
        <td><code>npm run lint:js:src</code></td>
        <td>Specifically lints JavaScript files in the src directory.</td>
    </tr>
    <tr>
        <td><code>npm run lint:js:src:fix</code></td>
        <td>Automatically fixes JavaScript lint issues where possible in the src directory.</td>
    </tr>
</table>

<h3>Internationalization</h3>
<table>
    <tr>
        <th>Command</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>npm run update-pot</code></td>
        <td>Updates the translation template file (POT) for internationalization. Excludes src directory.</td>
    </tr>
</table>

<h3>Block Creation</h3>
<table>
    <tr>
        <th>Command</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>npm run create-block</code></td>
        <td>Creates a new static block using @wordpress/create-block with the mello-block namespace.</td>
    </tr>
    <tr>
        <td><code>npm run create-block:dynamic</code></td>
        <td>Creates a new dynamic block using @wordpress/create-block with the mello-block namespace.</td>
    </tr>
</table>

<h3>Package & Release Management</h3>
<table>
    <tr>
        <th>Command</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>npm run package</code></td>
        <td>Creates a distributable zip file excluding map files, containing only production files.</td>
    </tr>
    <tr>
        <td><code>npm run export</code></td>
        <td>Builds assets and then packages the plugin into a zip file.</td>
    </tr>
    <tr>
        <td><code>npm run packages-update</code></td>
        <td>Updates WordPress packages to their latest versions.</td>
    </tr>
    <tr>
        <td><code>npm run version</code></td>
        <td>Updates the plugin file version to match package.json and stages the changes in git.</td>
    </tr>
    <tr>
        <td><code>npm run preversion</code></td>
        <td>Runs automatically before versioning to build assets.</td>
    </tr>
    <tr>
        <td><code>npm run postversion</code></td>
        <td>Runs automatically after versioning to create the plugin package.</td>
    </tr>
    <tr>
        <td><code>npm run release</code></td>
        <td>Complete release process: bumps version, updates plugin file, creates git tag, packages the plugin.</td>
    </tr>
</table>

<h2>Automated Version Management</h2>
<p>This plugin features an automated version management system that keeps package.json and the plugin file in sync.</p>

<h3>How to Release a New Version</h3>
<pre><code>

# Complete your code changes and commit them

git add .
git commit -m "Your commit message"

# Run the release command

npm run release

# This will:

# 1. Build the plugin

# 2. Increment the patch version (e.g., 2.1.0 → 2.1.1)

# 3. Update the plugin file version

# 4. Create a git commit with the version change

# 5. Create a git tag

# 6. Push commits and tags to GitHub

# 7. Create the zip file

</code></pre>

<div class="tip">
    <strong>Tip:</strong> To increment minor or major versions instead, use:
    <br>
    <code>npm version minor</code> (e.g., 2.1.0 → 2.2.0)
    <br>
    <code>npm version major</code> (e.g., 2.1.0 → 3.0.0)
</div>

<h3>GitHub Release Process</h3>
<ol>
    <li>Run <code>npm run release</code></li>
    <li>Go to your GitHub repository → "Releases" → "Create a new release"</li>
    <li>Select the tag that was just pushed</li>
    <li>Upload the zip file that was automatically created</li>
    <li>Add release notes describing your changes</li>
    <li>Publish the release</li>
</ol>

<div class="success">
    <strong>Automatic Updates:</strong> Once published, sites using your plugin will receive update notifications through the WordPress admin panel.
</div>

<h2>Plugin Structure</h2>
<pre><code>

mello-block-extensions/
├── assets/ # Static assets for production
├── bin/ # Utility scripts
│ └── update-version.js # Version synchronization script
├── build/ # Compiled assets
│ ├── blocks/ # Compiled blocks
│ └── extensions/ # Compiled extensions
├── inc/ # PHP includes
├── languages/ # Translation files
├── plugin-update-checker/ # Update checker library
├── src/ # Source files
│ ├── blocks/ # Block source files
│ └── extensions/ # Extension source files
├── mello-block-extensions.php # Main plugin file
└── package.json # Project configuration and dependencies
</code></pre>

<h2>Plugin Update System</h2>
<p>This plugin uses the Plugin Update Checker library to enable automatic updates from GitHub releases.</p>

<div class="note">
    <strong>Note:</strong> The GitHub token used for API access requires <code>Contents: Read-only</code> and <code>Metadata: Read-only</code> permissions to function correctly.
</div>

<h3>Dependencies</h3>
<table>
    <tr>
        <th>Dependency</th>
        <th>Version</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>classnames</td>
        <td>^2.3.2</td>
        <td>Utility for conditionally joining CSS class names.</td>
    </tr>
    <tr>
        <td>lenis</td>
        <td>^1.2.3</td>
        <td>Smooth scrolling library.</td>
    </tr>
    <tr>
        <td>motion</td>
        <td>^12.7.3</td>
        <td>Animation library.</td>
    </tr>
    <tr>
        <td>swiper</td>
        <td>^11.2.6</td>
        <td>Modern mobile touch slider library.</td>
    </tr>
</table>

<h3>Development Dependencies</h3>
<table>
    <tr>
        <th>Dependency</th>
        <th>Version</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>@wordpress/icons</td>
        <td>^9.35.0</td>
        <td>WordPress icon library.</td>
    </tr>
    <tr>
        <td>@wordpress/scripts</td>
        <td>^26.15.0</td>
        <td>Collection of reusable scripts for WordPress development.</td>
    </tr>
    <tr>
        <td>glob</td>
        <td>^11.0.0</td>
        <td>File pattern matching utility.</td>
    </tr>
    <tr>
        <td>micromodal</td>
        <td>^0.6.1</td>
        <td>Tiny modal library.</td>
    </tr>
    <tr>
        <td>mini-css-extract-plugin</td>
        <td>^2.9.2</td>
        <td>Extracts CSS into separate files for production.</td>
    </tr>
    <tr>
        <td>webpack-remove-empty-scripts</td>
        <td>^1.0.4</td>
        <td>Removes empty JavaScript files from build output.</td>
    </tr>
</table>
