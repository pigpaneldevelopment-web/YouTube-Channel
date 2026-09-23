# SOP Trainer

An interactive new-hire training app: turns a written SOP into a step-by-step walkthrough plus a knowledge check, in the browser. Built as the foundation for the animated-training-video idea — same structured step data either way, video generation is a later phase on top of this, not built yet.

**First scenario:** convenience store / gas station front register — standard checkout plus age-restricted sales (tobacco, alcohol, lottery). Picked for market fit: every gas station/convenience store needs this, it's compliance-critical (real legal/liability consequences for getting it wrong), high employee turnover drives constant re-training demand, and multi-location/franchise operators need consistency across stores.

## Structure

- `content/register-checkout-and-age-restricted-sales.md` — the actual SOP, human-readable, written like a real corporate SOP (purpose, procedure, edge cases, escalation, compliance note).
- `src/sopData.js` — the same SOP as structured data (sections + a knowledge-check quiz) that the app renders. Currently kept in sync with the markdown by hand; parsing it directly from the `.md` is a reasonable next step once there's more than one SOP to manage.
- `src/App.jsx` — the trainee-facing app: intro → walks through each SOP section (procedures render as numbered steps, edge cases as flagged cards, escalation as a list) → a 4-question knowledge check with immediate right/wrong feedback and an explanation → results screen with score and a restart option.

## Run locally

```
cd apps/sop-trainer
npm install
npm run dev
```

## Build + preview

```
npm run build
npm run preview
```

**Verified working**, real end-to-end test with a headless Chromium: clicked through the full flow (intro → 5 sections → quiz intro → all 4 quiz questions, answering deliberately wrong to test the feedback path → results screen), confirmed the section count matched the SOP (5), confirmed each quiz question showed correct/incorrect feedback with an explanation, confirmed the results screen showed the right score (0/4 for all-wrong answers), zero console errors.

## What's not built yet

- **Deploy/hosting** — not wired up. This app isn't on GitHub Pages (that slot is already used by the wedding seating chart at the repo's Pages URL); if/when this needs to be live, it needs its own hosting decision.
- **Animated video generation** — the original idea ("turn this into a training video"). This app produces the structured step data a video generator would consume, but the actual animation/rendering pipeline is a separate, later phase, not started.
- **Parsing SOPs automatically** — `sopData.js` is hand-written from the markdown right now. Worth automating once there's a second or third SOP to manage.
