# Wedding Seating Chart

Imported from the Claude conversation "wedding seating chart dashboard." Interactive drag-and-drop seating chart: tables (round/rect/head table), draggable venue elements (bar, dance floor, cake table, etc.), click-to-assign guest seats, auto-saving layout, and a guest roster with filtering.

## Runtime dependency — read before trying to run this anywhere

`SeatingChart.jsx` calls `window.storage.get`/`window.storage.set` for persistence. That's the Claude Artifacts runtime API — it only exists inside a Claude.ai artifact page, not in a plain browser or a standalone React app (Vite, Next.js, CRA, etc.). Dropped into a normal project as-is, every save/load call will throw.

To run this outside Claude Artifacts, swap `saveAll`/`loadAll` for something else — `localStorage`, IndexedDB, or a real backend — depending on what you need (single-device vs. shared/multi-device access). Not done yet; flagging it so nobody loses time debugging a silent failure.

## Video planning note — read before treating this as the Week 1 build

The Week 1 script (`strategy/scripts/week-01-full-app-day.md`) is written as "watch me build this in a day." But this app was **already built** in a prior Claude chat before this repo existed — there's no way to film that original build after the fact without either (a) real screen recordings from when it actually happened, or (b) staging a recreation, which the standing no-fabricated-footage rule in `PRODUCTION_WORKFLOW.md` rules out.

Two honest ways forward, pick one before recording:
1. **You have real recordings/screenshots from the original build session** — if so, that footage is fair game and the script stands as-is.
2. **You don't** — reframe Week 1 around something that can genuinely happen on camera now: e.g., a real new feature added to this existing app (RSVP import, PDF export, a print view, conflict-checking between families), filmed live. The video's claim shifts from "I built this whole app in a day" to something like "I added X to my wedding app in a day" — still honest, still shows real AI-assisted building, just scoped to what can actually be captured going forward.

Let me know which applies and I'll update the script to match.
