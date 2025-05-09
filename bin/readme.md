Automated Version Management for WordPress Plugins
What This Does
This versioning system automatically:

Updates your plugin version in both package.json AND the WordPress plugin header file
Creates a new git commit with the version change
Creates a git tag for the release
Builds your plugin assets
Creates the release zip file
How It Works
The implementation consists of three main components:

1. New NPM Scripts
Added to your package.json:

json
"version": "node ./bin/update-version.js && git add .",
"preversion": "npm run build",
"postversion": "npm run package",
"release": "npm version patch && git push && git push --tags"
version: Runs automatically when you use npm version - updates your plugin file version to match package.json
preversion: Runs before the version is bumped - builds your assets
postversion: Runs after the version is bumped - packages your plugin into a zip file
release: A convenience command that bumps version, pushes commits and tags to GitHub
2. The Version Update Script
A Node.js script (./bin/update-version.js) that:

Reads the version from package.json
Updates the version in your main plugin file header
Optionally updates any VERSION constants in your code
3. The Release Workflow
When you're ready to release a new version:

Make your code changes
Run: npm run release
Go to GitHub and create a new release using the tag that was just pushed
Upload the generated zip file as a release asset
Version Types
You can specify the type of version increment:

Patch (1.2.3 → 1.2.4): npm version patch
Minor (1.2.3 → 1.3.0): npm version minor
Major (1.2.3 → 2.0.0): npm version major
Setup Instructions
Update your package.json with the new scripts
Create the bin directory if it doesn't exist: mkdir -p bin
Create the update script: bin/update-version.js
Make the script executable: chmod +x bin/update-version.js
Test with a patch version: npm version patch --no-git-tag-version (first time only, to see if it works without creating commits)
For actual releases, use: npm run release
Example GitHub Release Workflow
Run: npm run release
Go to GitHub → Releases → "Create a new release"
Select the tag that was just pushed
Upload the zip file that was just created
Publish the release
The WordPress update system will now detect and use this new version.

