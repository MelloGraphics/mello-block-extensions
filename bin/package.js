#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create temporary directory for packaging
const TMP_DIR = 'tmp-package';

// Files and directories to include
const INCLUDE = [
    'mello-block-extensions.php',
    'build/extensions',
    'build/blocks',
    'inc',
    'languages',
    'assets',
    'plugin-update-checker'
];

// Files and patterns to exclude
const EXCLUDE = [
    '**/.DS_Store',
    '**/plugin-update-checker/examples/**',
    '**/plugin-update-checker/build/**',
    '**/plugin-update-checker/.editorconfig',
    '**/plugin-update-checker/.gitattributes',
    '**/plugin-update-checker/.gitignore',
    '**/plugin-update-checker/README.md',
    '**/plugin-update-checker/composer.json',
    '**/plugin-update-checker/phpcs.xml',
    '**/*.LICENSE.txt',
    '**/*.map'
];

// Clean up and create temp directory
console.log('🧹 Cleaning up...');
if (fs.existsSync(TMP_DIR)) {
    execSync(`rm -rf ${TMP_DIR}`);
}
fs.mkdirSync(TMP_DIR);

// Copy files to temp directory, excluding unwanted files
console.log('📦 Copying files...');
INCLUDE.forEach(item => {
    const sourcePath = path.resolve(item);
    const destPath = path.join(TMP_DIR, item);

    // Create parent directories if needed
    const parentDir = path.dirname(destPath);
    if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
    }

    // Copy file or directory
    if (fs.lstatSync(sourcePath).isDirectory()) {
        execSync(`cp -R "${sourcePath}" "${path.dirname(destPath)}"`);

        // Remove excluded files
        EXCLUDE.forEach(pattern => {
            const excludePattern = path.join(TMP_DIR, pattern);
            const findCmd = `find ${TMP_DIR} -path "${excludePattern}" -type f`;
            try {
                const filesToRemove = execSync(findCmd).toString().trim();
                if (filesToRemove) {
                    filesToRemove.split('\n').forEach(file => {
                        console.log(`  🗑️  Removing ${file.replace(TMP_DIR + '/', '')}`);
                        fs.unlinkSync(file);
                    });
                }
            } catch (e) {
                // No matches found, continuing
            }
        });
    } else {
        execSync(`cp "${sourcePath}" "${destPath}"`);
    }
});

// Create the zip file
console.log('🔒 Creating zip file...');
execSync(`cd ${TMP_DIR} && zip -r ../mello-block-extensions.zip ./*`);

// Clean up temp directory
console.log('🧹 Cleaning up temporary files...');
execSync(`rm -rf ${TMP_DIR}`);

console.log('✅ Package created: mello-block-extensions.zip');