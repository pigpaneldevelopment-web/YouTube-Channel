# Build Log: Guest List Import

Real record of what was actually asked for and built, for use as on-screen material in the honest-recap video — not a script, a log. Quote from this directly rather than paraphrasing, so the video's claims stay tied to what actually happened.

## The ask
The seating chart had 180 seats across 16 tables, and no way to add a guest except clicking one seat at a time and typing a name. For a real wedding guest list, that's 180 individual clicks. The ask: a way to paste in a guest list and place people faster than one-by-one.

## What got built
- **Import Guests modal** — paste a list of names (one per line), submit, they land in a new "unassigned pool" instead of being force-placed into seats automatically. Deliberate choice: auto-assigning to random open seats would be faster but useless in practice — seating a wedding is about *who sits with whom*, so the human still has to make that call. The import just removes the typing, not the decision.
- **Pool UI** — chips below the header showing everyone not yet seated, with a count. Click a chip to select it, click any open seat to place them there; the chip disappears from the pool and the name appears in the seat, same as manual entry.
- **Persistence** — the pool is part of the same auto-saving state as everything else (tables, seat assignments, layout), so a partially-imported guest list survives a reload same as anything else in the app.

## How it was verified — the AI-workflow lesson for this video
Instead of eyeballing the UI and calling it done, the whole flow was tested with a real headless browser (Playwright): import 3 names → confirm the pool shows the right count → select a name → click an open seat → confirm the seat updated and the pool count dropped → check the actual saved data in localStorage → reload the page → confirm everything survived the reload. All of it passed, zero console errors.

That's the lesson worth calling out on camera: **don't trust that a build works just because the code compiles or the page loads — have the AI actually exercise the feature end-to-end before calling it done.** A screenshot of a nice-looking UI proves nothing about whether clicking things actually works.

## Real footage
`footage/rsvp-import-demo.webm` — actual screen recording from that verification pass: opening the import modal, pasting names, the pool appearing, selecting a guest, clicking a seat, the assignment landing. This is genuine screen capture of the feature actually running, not a recreation — usable directly as B-roll.
