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

**No fabricated "watch this happen" footage.** If a video's premise is that the viewer is watching something occur in real time (a prompting session, a live build), the footage has to be of that thing actually happening — not a recreation staged to look spontaneous, even if the end result (the app) is genuinely real. Faking the process while the product is real is still telling the audience something happened that didn't. This applies regardless of who's shown doing it: real footage of an autonomous AI build presented *as if* it were the creator's own live hands-on-keyboard session is the same violation — the prompts being real doesn't fix a claim about who's driving being false. Use the honest-recap format (below) instead when that's the situation.

- If a first take is messy, do a second take. A rough real take beats a smooth staged one.
- Dry-run prompts off-camera first if you want to de-risk a segment, then record the actual take.
- If mouse movement or pacing looks jittery, fix it with real deliberate movement on the next take and speed-ramping in the edit (CapCut/Descript) — not by faking the interaction itself.
- Automating a browser to *actually* run the real tool (e.g., a scripted Playwright pass that really executes real prompts) is a legitimate way to get clean, repeatable capture for either format below — the line is real interaction vs. invented interaction, not manual vs. automated.

**Two legitimate video formats:**
1. **Live-capture** — the default. The creator is the one directing/prompting in real time (or a genuine dry-run/take of that), and the footage is presented as such.
2. **Honest recap** — used when a live-capture session isn't available or isn't realistic (e.g. the thing was already built before filming was possible, or there's genuinely no time to record a live session that week). Claude builds autonomously, and the video is explicit, stated up front on camera, that this is what happened — narrated afterward over real footage and a real build log, not presented as live capture. The dividing line from fabrication: the video *says* what it is. See `strategy/scripts/week-01-full-app-day.md` for a worked example, and `apps/wedding-seating-chart/BUILD_LOG.md` for what a real build log backing one looks like.

**Automation/recording pipeline — actually available in this repo's cloud sessions.** Contrary to an earlier (wrong) note here: this environment has a real Chromium browser (via Playwright, pre-installed at `/opt/pw-browsers`), a bundled ffmpeg, and Xvfb — genuine screen-capture and video recording is possible directly in a Claude Code cloud session, not just a local one. What still requires you personally: your own on-camera narration/face, and directing what gets built if you want live-capture rather than honest-recap.

## Video build checklist
- [ ] Outline drafted from build notes
- [ ] Voiceover + intro recorded
- [ ] Screen capture is of a real take (no staged/faked segments)
- [ ] If honest-recap format: the framing is stated plainly on camera near the top, not buried or omitted
- [ ] Edited, first 10 seconds show the finished app
- [ ] One real failure-and-fix moment included
- [ ] One AI-workflow lesson called out (real, specific to this build — see pillar 5 in `STRATEGY.md`)
- [ ] Title + thumbnail set
- [ ] 2–3 Shorts cut
- [ ] Affiliate links added (hosting/DB/AI tools used in this build)
- [ ] Published, end screen points to next build
