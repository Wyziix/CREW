# CREW

Find people to go to music festivals with. Mobile-first web app (single `index.html`, no build step).

## Features
- **Discover**: swipe through groups and people going to the same festival, ranked by music match
- **My Crews**: crew chats, meet-up vote, polls, shared playlist, join requests
- **Festival Hub**: lineup & plan with clash check, map, food ordering, Ask CREW, safety (SOS, check-in), info
- **Missions**: points, levels, invite code, feed
- **Profile**: verification, music taste, privacy settings

State is saved in the browser (`localStorage`, key `crew-v3`). All data is demo data.

## Run locally
Open `index.html` in a browser, or:

```bash
npx serve .
```

## Deploy
Static site. On Vercel: import this repo, framework preset "Other", no build command, output directory `.`.
