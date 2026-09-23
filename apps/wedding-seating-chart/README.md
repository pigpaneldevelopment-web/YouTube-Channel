# Wedding Seating Chart

Interactive drag-and-drop wedding seating chart: tables (round/rect/head table), draggable venue elements (bar, dance floor, cake table, etc.), click-to-assign guest seats, auto-saving layout, and a guest roster with filtering. Installable as a PWA, works offline, persists locally on-device.

## Structure

- **`SeatingChart.jsx`** (repo root of this folder) — the original file as pasted from the Claude conversation ("wedding seating chart dashboard"), kept as a reference copy. Depends on `window.storage`, the Claude Artifacts persistence API, so it only runs inside a Claude.ai artifact page, not standalone.
- **`src/SeatingChart.jsx`** — the adapted version actually used by this build. Same app, with `window.storage` swapped for `localStorage`, so it runs as a normal standalone web app / installable PWA. Persistence is per-device (each phone/browser has its own local copy); there's no cross-device sync. If you need the couple to edit from two devices and see the same data, that needs a real backend instead — not built here, ask if you want it added.

## Run locally

```
cd apps/wedding-seating-chart
npm install
npm run dev
```

## Build + preview

```
npm run build
npm run preview
```

Verified working: builds clean, renders correctly in a real browser (all 16 tables, head table, cake, dance floor render correctly), and localStorage persistence survives a reload (tested by assigning a guest, reloading, confirming the assignment is still there).

## Deploy

`.github/workflows/deploy-wedding-app.yml` builds and publishes this app to GitHub Pages automatically on every push to `main` that touches this folder. Once merged and the workflow runs, it'll be live at:

**https://pigpaneldevelopment-web.github.io/YouTube-Channel/**

Requires GitHub Pages enabled on the repo (Settings → Pages → Source: GitHub Actions) — one-time setup, not something this workflow can do for itself.

To install it on a phone: open that URL in mobile Safari/Chrome, then "Add to Home Screen." It'll behave like a native app (own icon, no browser chrome) and work offline after the first load.

## Video planning note — read before treating this as the Week 1 build

The Week 1 script (`strategy/scripts/week-01-full-app-day.md`) was written as "watch me build this in a day." This app was already built in a prior Claude chat before this repo existed, with no original footage available — resolved in conversation: Week 1 will be reframed around a live feature build (something real, added and filmed today) instead of the original build. Script not yet updated to match — pending on deciding what gets built live and how it's filmed (see conversation for the live-session vs. honest-recap framing options).
