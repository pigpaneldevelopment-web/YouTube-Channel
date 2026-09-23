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

## Follow-up: column-mapped CSV import
The simple one-name-per-line import doesn't cover a real wedding guest list, which usually comes from a spreadsheet with multiple columns (table, meal choice, dietary restrictions, RSVP status, etc.). Added a second import mode: paste a CSV (or a table copied straight out of a spreadsheet), and map each column to a field — First/Last/Full Name, Table #, Meal Preference, Dietary Restrictions, RSVP Status, Plus One, Party/Group, Notes. Columns are auto-guessed from their header text (e.g. a column named "Entree" maps to Meal Preference automatically) and adjustable before import.

Behavior on import: a name with a Table # that matches an existing table gets seated directly in the next open seat there; everything else — no table given, or the table doesn't match anything real — lands in the unassigned pool like before, never silently dropped. Extra fields (meal, dietary, etc.) are stored per guest and now show in the Guest Roster panel next to their name.

**Verified the same way as before, real end-to-end test, not eyeballed:** parsed a 3-row CSV (two valid table numbers, one invalid), confirmed the auto-guessed column mapping was correct, confirmed the two valid rows landed in the right seats with their meal/dietary info attached and visible in the roster, confirmed the invalid-table row fell through to the pool instead of being lost, checked the actual saved data, zero console errors. Same lesson as the first build: verify the actual behavior, not just that the UI renders.
