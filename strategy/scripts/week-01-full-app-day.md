# Week 1 Script: "I Let Claude Build a Feature for My Wedding App"

Target length: 8–11 min. Format: **honest recap**, not live-capture — see `PRODUCTION_WORKFLOW.md`. This video is explicit that Claude did the technical build autonomously; you narrate over real footage and a real build log rather than presenting it as you typing live. That's not a lesser version of the original premise — it's a different, equally legitimate one, and it's the one this video actually uses.

Source: `apps/wedding-seating-chart/BUILD_LOG.md` and `apps/wedding-seating-chart/footage/rsvp-import-demo.webm` — both are real, from an actual build. Quote/use them directly; don't embellish.

## 0:00–0:15 — Hook + honest framing, stated up front
Open on the finished seating chart app, then the import flow working (real footage).
> "This is my wedding seating chart app — real app, 16 tables, 180 seats. This week I tried something different: instead of me typing every prompt on camera, I asked Claude to build a feature on its own, and I'm going to show you exactly what it did — the real prompts, the real result, nothing staged."

Say this plainly, don't bury it in fine print. It's the premise of the video, not a disclaimer.

## 0:15–0:45 — Name the problem
- 180 seats, no way to add a guest except clicking one at a time and typing a name.
- For an actual wedding guest list, that's 180 individual clicks — a real, boring, avoidable problem.

## 0:45–3:30 — The ask + the build (use BUILD_LOG.md directly)
Show the real ask on screen (quote from "The ask" section of the build log). Then walk through "What got built" from the log — the import modal, the unassigned pool, why it doesn't auto-place people (the deliberate design call is a good beat, shows real thinking not just code output).

Cut to real footage from `rsvp-import-demo.webm`: the modal opening, names being pasted, the pool appearing.

## 3:30–5:30 — AI-workflow lesson callout (this one's real, not generic)
This is the pillar-5 callout, and this build actually has a good one — use the real one from the build log:
> "Here's the thing I want to flag: it's easy to see a build finish, see the UI looks right, and call it done. That's not verification. The actual test here was having Claude drive a real browser through the whole flow — import guests, select one, click a seat, confirm it saved, reload the page, confirm it's still there. All of that passed. That's the difference between 'the code compiled' and 'the feature works.'"

Show the verification steps happening — the pool count changing, seat updating, reload — from the real footage.

## 5:30–7:00 — Result
- Show the finished feature working end to end on the real app.
- Mention the app itself: installable PWA, works offline, real persistence (ties to earlier build work already in the repo).

## Last 60–90 sec — Wrap + next build pointer
- Be honest about the tradeoff: this format means faster turnaround for you, and it's a genuinely different (not lesser) way to show AI-assisted building.
- CTA: subscribe if you want to see what's next.
- End screen points to Week 2 (dedicated wedding seating chart deep-dive).

## Shorts to cut from this footage (2–3)
1. The verification lesson callout alone (3:30–5:30 beat) — strongest standalone clip
2. The import → pool → seat-assignment flow, sped up, ~20–30 sec
3. The honest-framing hook (0:00–0:15) as its own short, since the premise itself is a hook

## Before recording
- [ ] Narration is the only thing you need to record — the build footage already exists (`footage/rsvp-import-demo.webm`)
- [ ] Read `BUILD_LOG.md` before recording narration so the on-camera claims match what's actually documented — don't improvise details about the build that aren't in the log
- [ ] Keep Oracle/day-job references and ski house mentions out entirely
