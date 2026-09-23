# Weekly Production System (~4.5 hrs/week)

Screen-record every build you're already doing — that footage is free.

| Task | Time |
|---|---|
| Outline the video from build notes | 45 min |
| Record voiceover + face intro | 60 min |
| Edit (Descript recommended) | 90 min |
| Title + thumbnail | 30 min |
| Cut 2–3 Shorts from the long video | 30 min |
| Publish + reply to comments | 15 min |
| **Total** | **270 min (4.5 hrs)** |

Output: one long video (8–15 min) + 2–3 Shorts per week. Shorts drive discovery; long videos drive watch hours.

## Standing production rules

**No fabricated "watch this happen" footage.** If a video's premise is that the viewer is watching something occur in real time (a prompting session, a live build), the footage has to be of that thing actually happening — not a recreation staged to look spontaneous, even if the end result (the app) is genuinely real. Faking the process while the product is real is still telling the audience something happened that didn't.

- If a first take is messy, do a second take. A rough real take beats a smooth staged one.
- Dry-run prompts off-camera first if you want to de-risk a segment, then record the actual take.
- If mouse movement or pacing looks jittery, fix it with real deliberate movement on the next take and speed-ramping in the edit (CapCut/Descript) — not by faking the interaction itself.
- Automating a browser to *actually* run the real tool (e.g., a scripted Playwright pass that really executes real prompts) is a legitimate way to get clean, repeatable capture — the line is real interaction vs. invented interaction, not manual vs. automated.

**Where that automation pipeline can and can't be built:**
- This repo's Claude Code sessions (web/cloud) run in a sandboxed container — no access to your local screen, no general internet, no way to record real capture here.
- A browser-automation + ffmpeg render pipeline (Playwright/Puppeteer driving a real browser, scripted easing on mouse movement) requires a **local** Claude Code session — the desktop app, or the CLI running directly on your machine — where there's real network access and a real filesystem to render into. If/when you want that pipeline built, do it in a local session.

## Video build checklist
- [ ] Outline drafted from build notes
- [ ] Voiceover + intro recorded
- [ ] Screen capture is of a real take (no staged/faked segments)
- [ ] Edited, first 10 seconds show the finished app
- [ ] One real failure-and-fix moment included
- [ ] Title + thumbnail set
- [ ] 2–3 Shorts cut
- [ ] Affiliate links added (hosting/DB/AI tools used in this build)
- [ ] Published, end screen points to next build
