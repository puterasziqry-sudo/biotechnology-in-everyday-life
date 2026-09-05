# Biotechnology for Everyday Life — V2.1
## GitHub Pages
1. Create/open your GitHub repository.
2. Delete the old website files.
3. Upload every file and folder from this package.
4. Keep the `assets` folder structure unchanged.
5. In GitHub: Settings → Pages → Deploy from branch → `main` → `/root`.
6. Open the generated GitHub Pages address.

### Notes
- All three team portraits and social screenshots are stored locally in `assets/`.
- Each topic also has a local SVG visual fallback in `assets/`, while several pages use real Wikimedia Commons photos when online.
- The image fallback means the website still displays a relevant local visual if an external photo cannot load.
- The visitor counter is a browser-local counter, not a true global analytics counter.
- Educational content should be checked against current scientific and regulatory guidance before formal submission.


## GitHub Pages
Upload the contents of this folder to the repository root so that `index.html`, `style.css`, `script.js`, and the `assets/` folder are at the same level. Enable GitHub Pages from Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

## Live visitor counter
The site uses CounterAPI's current v2 browser library for a shared site-visit counter. The counter is configured for the public workspace `biotechnology-for-everyday-life` and increments once per browser session. If the external counter service is unavailable, the interface falls back to a local browser count instead of showing a blank value.


## GitHub browser upload
This version intentionally keeps all image assets in the same folder as the HTML files.
You can upload all files together through GitHub's **Add file → Upload files** without
creating an `assets` folder. Do not create an `assets/assets` folder.
