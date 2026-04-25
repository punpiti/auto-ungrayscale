# Auto Un-Grayscale

Automatically restores colors on webpages that apply heavy grayscale or desaturation filters, improving visual clarity and readability.

## Repository Role

This is now the single main project folder.
It contains both the publishable GitHub repo files and the local development assets used to maintain the extension.

Main areas:

- `extension/` Chrome extension files that are loaded and published
- `assets/` source images and reference materials
- `scripts/` helper scripts such as icon generation
- `dist/` local export packages
- `index.html` and `privacy.html` public website files
- `DEVELOPMENT.md` local development workflow notes

## Purpose
This extension focuses on visual comfort and accessibility by detecting excessive color filters and restoring normal colors.

## Privacy
No user data is collected, stored, or transmitted.
All processing happens locally in the browser.

## Permissions
The extension requires access to webpages you visit in order to detect and override color filters. It does not inspect content for analytics or tracking purposes.
