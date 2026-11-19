# CREW – notes for Claude Code

Mobile-first festival app. Plain HTML/CSS/JS, no build step, no framework, no npm dependencies. Deployed as a static site on Vercel.

## Structure
See README.md for the file map. Key points:
- Scripts are classic `<script>` tags (not ES modules) and share globals. Load order in `index.html` matters: `js/data.js` first, `js/main.js` last. New files need a `<script>` tag in the right spot.
- All UI is rendered as HTML strings by `render()` in `js/render.js`; click handlers are wired in `bind()` in `js/actions.js` via `data-*` attributes.
- State lives in the global `S` (`js/state.js`), saved to localStorage under `crew-v3`. Call `save()` after changing it, then `render()`.
- Always escape user text with `esc()` when putting it into HTML.

## Git workflow (two people work on this repo)
- `main` = stable, what goes live on Vercel. Don't commit to `main` directly.
- Each person works on their own branch (`gleb`, `partner`) or a feature branch made from `main`.
- Start every session with `git fetch origin && git merge origin/main` on your branch so you have the other person's latest work.
- When a change is done: push the branch and open a pull request into `main`.
- Keep changes focused to a few files to avoid merge conflicts.

## Checking changes
Run `npx serve .` (or `python3 -m http.server`) and open the page; check the browser console for errors. Test at phone width (~400px).
