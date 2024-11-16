# Firefox

## Testing

1. Firefox Address bar -> about:debugging
2. "Load Temporary Add-on..."
3. Select manifest.json

## Release

1. Compress your extension files into a .zip file with no extra files like `.git` etc.
2. https://addons.mozilla.org/developers/
3. "Submit a New Add-on"
4. Upload .zip


# Chrome

## Testing

1. Chrome Address bar -> chrome://extensions
2. Enable Developer Mode.
3. Click Load unpacked and select the folder where your plugin is stored.

## Release

1. Chrome Address bar -> chrome://extensions
2. Enable Developer Mode.
3. Click Pack Extension, select your extension’s root directory, and pack it. This will generate a `.crx` file and a `.pem` file (keep the `.pem` file safe for future updates).
4. Go to [Chrome Web Store Developer Dashboard.](https://chrome.google.com/webstore/devconsole/)
5. Add a New Item.
6. Upload the `.crx` file (or the `.zip` if prompted)

