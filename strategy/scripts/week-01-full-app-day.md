# Week 1 Script: "I Built a Full App With AI in One Day (No Coding Background)"

Target length: 10–13 min. Source build: the **wedding seating chart app** (real usage, real footage — cleared for the channel; the ski house app is off-limits, see `STRATEGY.md`).

Everything in `[brackets]` is a placeholder — fill it with what actually happened. Per the standing rule in `PRODUCTION_WORKFLOW.md`, every screen-capture segment referenced here has to be footage of the real build, not a recreation. If a beat below doesn't match what actually happened on your build, rewrite the beat — don't stage footage to match the script.

## 0:00–0:10 — Hook
Open on the **finished app already running** — the seating chart actually being arranged/used. Voiceover, direct and low-key (no hype-YouTuber energy — that's off-positioning):
> "[Wedding X] had [Y] guests, [Z] families who couldn't sit near each other, and a spreadsheet that fell apart every time someone RSVP'd late. So I built this instead — in a day, without writing code by hand."

Cut to title card.

## 0:10–0:45 — Name the problem
- What was actually broken before: [the specific pain — e.g., dragging names around a spreadsheet, tracking plus-ones, conflicting family requests]
- Why a spreadsheet/Google Sheet wasn't enough: [specific failure mode you saw]
- The stakes for you personally: you're not a developer, day job doesn't leave much time — this has to work in a day or not at all. (Real build time was closer to an evening/afternoon, broken across a day — say it exactly as it happened rather than rounding up.)

## 0:45–[X] — Milestone 1: [first visible thing built]
Real screen capture of the actual first working piece — likely the guest list + table layout shell. Show:
- What you prompted for (on screen or narrated, but real — see production rule)
- What came back
- The first "oh, that actually works" moment

## [X]–[Y] — Milestone 2: [second visible thing]
Likely: drag-and-drop seat assignment, or handling conflicting requests (keep these two families apart). Show the real moment you tested it against a real guest list.

## [Y]–[Z] — The break (required beat)
This is not optional — retention framework says show one real thing breaking and getting fixed. Use whatever actually broke: [drag-and-drop bug / a table-count edge case / a layout that broke on mobile / whatever really happened]. Show:
- What broke, on screen, as it happened
- How you diagnosed it (the actual prompt/fix, not a cleaned-up version)
- The moment it worked

If nothing broke during the real build, don't invent a break — cut this beat and lean harder into milestone pacing. A truthful video without a break beats a staged one with a fake break.

## ~30 sec — Lesson callout (pillar 5, see `STRATEGY.md`)
One specific AI-workflow lesson from this actual build — not generic advice, something you genuinely ran into. Candidates, pick whichever actually happened: [started a fresh chat once the seating-chart logic was working instead of letting one thread carry the whole build / gave Claude the guest-list data structure up front instead of describing it in prose / kept the instructions file scoped to just this app]. Deliver it as a quick aside, not a lecture — 20-30 seconds, then back to the build. This is also a Shorts candidate on its own and a future entry for the AI-workflow deep-dive series in `VIDEO_IDEAS.md` Tier 5.

## [Z]–[end-2min] — Milestone 3/4: polish + real usage
Show the app actually being used to seat a real wedding (with names/faces blurred or consent obtained from whoever's wedding it was). This is the proof-of-real-users beat that differentiates the channel from demo-only competitors.

## Last 60–90 sec — Wrap + next build pointer
- Quick recap: what it does now, roughly what it cost to run (ties to the "What It Actually Costs" video later in the calendar — don't over-explain costs here, just tease)
- CTA: subscribe if you want to see the next build
- End screen points to Week 2 (the dedicated wedding seating chart deep-dive)

## Shorts to cut from this footage (2–3)
1. The "break and fix" moment alone, ~30–45 sec, captioned for silent viewing
2. The before/after (spreadsheet chaos → working seating chart), ~20–30 sec
3. The lesson callout on its own — these tend to cut cleanly into Shorts since they're already short and self-contained

## Before recording
- [ ] Confirm you have consent/blurring plan for anyone shown in guest-list screenshots
- [ ] Dry-run the prompts you plan to show off-camera if you want a rehearsal, then record the real take (per `PRODUCTION_WORKFLOW.md`)
- [ ] Keep Oracle/day-job references out entirely, and no ski house footage/mentions anywhere in this video or its Shorts
