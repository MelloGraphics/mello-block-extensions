
  <h1>Animation Controls Extension Documentation</h1>

  <p>This document outlines how the Animation Controls extension works across the WordPress block editor (edit screen), frontend rendering, and animation execution using Motion One.</p>

  <hr />

  <h2>Overview</h2>
  <p>The Animation Controls extension allows content creators to add scroll-based or custom-triggered animations to any block. Animations can target individual blocks or stagger animations for child blocks within layout containers like <code>core/group</code>, <code>core/columns</code>, or <code>core/post-template</code>.</p>

  <hr />

  <h2>Tech Stack</h2>
  <ul>
    <li><strong>JavaScript Animation Library:</strong> <a href="https://motion.dev/" target="_blank">Motion One</a></li>
    <li><strong>Triggering:</strong> <code>inView()</code> from Motion One</li>
    <li><strong>Block Editor API:</strong> WordPress Block Editor InspectorControls + Filters</li>
  </ul>

  <hr />

  <h2>Editor Functionality (<code>edit.js</code>)</h2>
  <p><strong>File:</strong> <code>src/extensions/animation-controls/edit.js</code></p>

  <h3>1. Attribute Registration</h3>
  <p>Animation attributes are added to all <code>core/*</code> blocks. Child-specific attributes are added for layout blocks like <code>core/group</code>, <code>core/columns</code>, etc.</p>

  <h3>2. Inspector Panel: “Animation Controls”</h3>
  <p><strong>For all blocks:</strong></p>
  <ul>
    <li>Animate block (toggle)</li>
    <li>If enabled:
      <ul>
        <li>Animation Type (fade, slide, clip)</li>
        <li>Duration, Delay (range)</li>
        <li>Trigger (Section, Self, Custom)
          <ul>
            <li>If Self: Trigger Point (%)</li>
            <li>If Custom: Custom selector + Trigger Point</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

  <p><strong>For layout/container blocks:</strong></p>
  <ul>
    <li>Animate Children (toggle)</li>
    <li>If enabled:
      <ul>
        <li>Child Animation Type, Duration, Delay, Stagger</li>
        <li>Child Trigger (Section, Self, Custom)</li>
        <li>Custom child selector (if applicable)</li>
      </ul>
    </li>
  </ul>

  <h3>3. UI Enhancements</h3>
  <p>Controls appear conditionally. Shared logic avoids duplication. Friendly labels and tooltips provided.</p>

  <hr />

  <h2>Server Rendering (<code>block-functions.php</code>)</h2>
  <p><strong>File:</strong> <code>build/extensions/animation-controls/block-functions.php</code></p>

  <h3>1. Output <code>data-*</code> attributes</h3>
  <p>Based on block attributes, the server outputs:</p>
  <ul>
    <li><code>data-animation</code> attributes for individual animations</li>
    <li><code>data-child-animation</code> attributes for staggered child animations</li>
  </ul>

  <h3>2. Output Conditions</h3>
  <p>Attributes are only rendered if <code>animateSelf</code> or <code>animateChildren</code> are enabled. Prevents markup bloat.</p>

  <h3>3. Dynamic Block Support (To Do)</h3>

  <p>The following core blocks are rendered dynamically and may require server-side injection of <code>data-animation</code> attributes. This section tracks which blocks need to be updated in <code>block-functions.php</code> to support animations:</p>

  <table>
    <thead>
      <tr>
        <th>Block</th>
        <th>Description</th>
        <th>Animated?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>core/post-template</code></td>
        <td>Repeats post content in Query Loop</td>
        <td>✅</td>
      </tr>
      <tr>
        <td><code>core/post-title</code></td>
        <td>Outputs post title</td>
        <td>❌</td>
      </tr>
      <tr>
        <td><code>core/post-date</code></td>
        <td>Displays the publish date</td>
        <td>❌</td>
      </tr>
      <tr>
        <td><code>core/post-excerpt</code></td>
        <td>Shows the excerpt</td>
        <td>❌</td>
      </tr>
      <tr>
        <td><code>core/post-featured-image</code></td>
        <td>Outputs the featured image</td>
        <td>❌</td>
      </tr>
      <tr>
        <td><code>core/post-terms</code></td>
        <td>Displays taxonomy terms</td>
        <td>❌</td>
      </tr>
      <tr>
        <td><code>core/comments</code> (group)</td>
        <td>Entire comments area</td>
        <td>❌</td>
      </tr>
    </tbody>
  </table>

  <p><em>Note: These will be updated in future versions of the extension.</em></p>

  <hr />

  <h2>Frontend Animation (<code>frontend.js</code>)</h2>
  <p><strong>File:</strong> <code>src/extensions/animation-controls/frontend.js</code></p>

  <h3>1. Triggers Animation via <code>inView</code></h3>
  <p>All <code>[data-animation=\"true\"]</code> blocks are targeted and animated on scroll into view using Motion One’s <code>inView()</code>.</p>

  <h3>2. Handles Animation Types</h3>
  <ul>
    <li>fade-in, slide-in (any direction), clip-path reveals</li>
    <li>Controlled by <code>data-animation-type</code> and associated attributes</li>
  </ul>

  <h3>3. Supports Staggered Children</h3>
  <p>If <code>data-animate-children=\"true\"</code> is set:</p>
  <ul>
    <li>Child selector <code>parent > *</code> is targeted</li>
    <li><code>stagger()</code> from Motion One is applied to delay child animations</li>
  </ul>

  <h3>4. Custom Selector Support</h3>
  <p>If a block sets <code>animation-trigger=\"custom\"</code>, its provided selector is used to watch for scroll triggers.</p>

  <h3>5. Nesting Protection</h3>
  <p>Prevents nested elements from being animated twice:</p>
  <pre><code>if (element.closest('[data-animation=\"true\"]') !== element) return;</code></pre>

  <hr />

  <h2>Testing Notes</h2>
  <ul>
    <li>Test deeply nested layouts (e.g. Service Cards in Groups)</li>
    <li>Check <code>post-template</code> and repeatable inner blocks</li>
    <li>Confirm scroll triggers work across all breakpoints</li>
  </ul>

  <hr />

  <h2>Summary</h2>
  <ul>
    <li><strong>Edit screen:</strong> Adds full Inspector UI for animation configuration</li>
    <li><strong>PHP:</strong> Outputs clean and scoped <code>data-*</code> attributes only when needed</li>
    <li><strong>Frontend:</strong> Uses performant inView + Motion One setup with optional staggered children</li>
  </ul>
