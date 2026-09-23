# Wedding Seating Chart

Interactive drag-and-drop wedding seating chart: tables (round/rect/head table), draggable venue elements (bar, dance floor, cake table, etc.), click-to-assign guest seats, auto-saving layout, and a guest roster with filtering. Installable as a PWA, works offline, persists locally on-device.

Guest list import, two modes:
- **Simple list** — paste names, one per line, they land in an unassigned pool to place manually.
- **CSV / spreadsheet** — paste a CSV with a header row, map each column to a field (First/Last/Full Name, Table #, Meal Preference, Dietary Restrictions, RSVP Status, Plus One, Party/Group, Notes — auto-guessed from header text, adjustable). A valid Table # seats the guest directly; anything else falls to the pool instead of being lost.

See `BUILD_LOG.md` for the real build/verification record behind both.

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

## Video

Week 1 (`strategy/scripts/week-01-full-app-day.md`) uses the honest-recap format: Claude built the RSVP-import and CSV column-mapping features autonomously, stated plainly on camera, narrated over real footage and `BUILD_LOG.md` rather than presented as live capture. See `strategy/PRODUCTION_WORKFLOW.md` for what that format is and when to use it.

`footage/` has:
- `rsvp-import-demo.webm` — real capture of the simple-list import flow
- `csv-import-demo.webm` — real capture of the CSV column-mapping flow
- `week01-rough-cut.webm` (51s, silent) — both clips assembled with title/caption cards styled to match the app, timed to the script's beats. A real starting skeleton, not a finished video — narration and final editing polish are still needed.
