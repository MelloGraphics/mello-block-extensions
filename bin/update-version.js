/**
 * This script updates the version number in the main plugin file
 * to match the version in package.json
 */
const fs = require('fs');
const path = require('path');

// Get the version from package.json
const packageJson = require('../package.json');
const newVersion = packageJson.version;

// Path to the main plugin file
const pluginFilePath = path.join(__dirname, '..', 'mello-block-extensions.php');

// Read the plugin file
fs.readFile(pluginFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading plugin file: ${err}`);
        process.exit(1);
    }

    // Replace the version in the plugin header
    const updatedData = data.replace(
        /Version:\s*[0-9.]+/,
        `Version: ${newVersion}`
    );

    // Write the updated content back to the file
    fs.writeFile(pluginFilePath, updatedData, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error(`Error writing to plugin file: ${writeErr}`);
            process.exit(1);
        }

        console.log(`✅ Updated plugin version to ${newVersion}`);
    });
});

// You could also update other version references here if needed
// For example, constant definitions in the plugin file:

// Update a VERSION constant if it exists
fs.readFile(pluginFilePath, 'utf8', (err, data) => {
    if (err) return; // Already logged above if there's an error

    // Check if there's a VERSION constant
    if (data.includes('define') && data.includes('VERSION')) {
        const updatedData = data.replace(
            /define\(\s*['"](?:MELLO_BLOCK_EXTENSIONS_)?VERSION['"],\s*['"][0-9.]+['"]\s*\)/,
            `define('MELLO_BLOCK_EXTENSIONS_VERSION', '${newVersion}')`
        );

        fs.writeFile(pluginFilePath, updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(`Error updating VERSION constant: ${writeErr}`);
            } else {
                console.log(`✅ Updated VERSION constant to ${newVersion}`);
            }
        });
    }
});