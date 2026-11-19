# CREW

Find people to go to music festivals with. Mobile-first web app. Plain HTML, CSS and JavaScript, no build step.

## Features
- **Discover**: swipe through groups and people going to the same festival, ranked by music match
- **My Crews**: crew chats, meet-up vote, polls, shared playlist, join requests
- **Festival Hub**: lineup & plan with clash check, map, food ordering, Ask CREW, safety (SOS, check-in), info
- **Missions**: points, levels, invite code, feed
- **Profile**: verification, music taste, privacy settings

State is saved in the browser (`localStorage`, key `crew-v3`). All data is demo data.

## Project structure
```
index.html            page shell, loads the CSS and scripts in order
css/styles.css        all styles
js/data.js            festivals, lineups, artists, demo groups/people, food, missions
js/state.js           app state (saved in localStorage) + small helpers, match score
js/icons.js           SVG icons
js/utils.js           toast, scroll helper
js/render.js          main render(), bottom nav
js/tabs/discover.js   Discover tab (swipe cards)
js/tabs/crews.js      My Crews tab
js/tabs/hub.js        Festival Hub tab
js/tabs/missions.js   Missions + Feed tab
js/tabs/profile.js    Profile tab
js/screens.js         full screens: chat, lineup, map, food, Ask CREW, safety, info
js/sheets.js          bottom sheets: festival picker, filters, new crew, polls, verify...
js/onboarding.js      3-step onboarding
js/actions.js         all click handlers and logic (bind())
js/main.js            starts the app
```
Scripts are plain `<script>` tags, not modules, so they share global variables. Load order in `index.html` matters: `data.js` first, `main.js` last. A new file needs its own `<script>` tag.

## Working together
1. Clone: `git clone https://github.com/Wyziix/CREW.git`
2. Before starting: `git pull`
3. Make a branch for your change: `git checkout -b my-change`
4. Commit, push, open a pull request, the other person reviews and merges
5. Try to split work by file (e.g. one on `tabs/hub.js`, one on `screens.js`) to avoid conflicts

## Run locally
Open `index.html` in a browser (double-click works), or run a local server:

```bash
npx serve .
```

## Deploy
Static site. On Vercel: import this repo, framework preset "Other", no build command, output directory `.`.
