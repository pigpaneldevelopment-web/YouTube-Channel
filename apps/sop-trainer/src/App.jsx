import { useState } from "react";
import { sop } from "./sopData.js";

const COLORS = {
  bg: "#12161f",
  panel: "#1b212e",
  border: "rgba(255,255,255,0.08)",
  accent: "#5E9EA8",
  accentSoft: "rgba(94,158,168,0.15)",
  warn: "#C46A5E",
  warnSoft: "rgba(196,106,94,0.15)",
  good: "#7EA87E",
  goodSoft: "rgba(126,168,126,0.15)",
  text: "#E8E4DC",
  textDim: "rgba(232,228,220,0.55)",
};

// Flatten the SOP + quiz into a single linear list of "screens" to step through.
function buildScreens() {
  const screens = [{ type: "intro" }];
  sop.sections.forEach((s) => screens.push({ type: "section", data: s }));
  screens.push({ type: "quizIntro" });
  sop.quiz.forEach((q) => screens.push({ type: "quiz", data: q }));
  screens.push({ type: "results" });
  return screens;
}
const SCREENS = buildScreens();

function SectionBody({ section }) {
  if (section.kind === "text") {
    return <p style={{ lineHeight: 1.7, color: COLORS.text, fontSize: 16 }}>{section.body}</p>;
  }
  if (section.kind === "steps") {
    return (
      <ol style={{ display: "flex", flexDirection: "column", gap: 12, paddingLeft: 0, listStyle: "none", counterReset: "step" }}>
        {section.steps.map((s, i) => (
          <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: COLORS.accentSoft, color: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
            <span style={{ lineHeight: 1.6, color: COLORS.text }}>{s}</span>
          </li>
        ))}
      </ol>
    );
  }
  if (section.kind === "cases") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {section.items.map((it, i) => (
          <div key={i} style={{ background: COLORS.warnSoft, border: `1px solid ${COLORS.warn}44`, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontWeight: 700, color: COLORS.warn, marginBottom: 4, fontSize: 14 }}>{it.label}</div>
            <div style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.6 }}>{it.body}</div>
          </div>
        ))}
      </div>
    );
  }
  if (section.kind === "list") {
    return (
      <ul style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 20, margin: 0 }}>
        {section.items.map((it, i) => (
          <li key={i} style={{ color: COLORS.text, lineHeight: 1.6 }}>{it}</li>
        ))}
      </ul>
    );
  }
  return null;
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // quiz question index -> selected option index
  const [revealed, setRevealed] = useState({}); // quiz question index -> bool

  const screen = SCREENS[index];
  const progressPct = Math.round((index / (SCREENS.length - 1)) * 100);

  const next = () => setIndex((i) => Math.min(i + 1, SCREENS.length - 1));
  const back = () => setIndex((i) => Math.max(i - 1, 0));
  const restart = () => { setIndex(0); setAnswers({}); setRevealed({}); };

  const quizIndexOf = (screenIdx) => SCREENS.slice(0, screenIdx).filter((s) => s.type === "quiz").length;

  const selectAnswer = (qIdx, optIdx) => {
    if (revealed[qIdx]) return;
    setAnswers((a) => ({ ...a, [qIdx]: optIdx }));
    setRevealed((r) => ({ ...r, [qIdx]: true }));
  };

  const quizScore = () => {
    let correct = 0;
    sop.quiz.forEach((q, i) => { if (answers[i] === q.correct) correct++; });
    return correct;
  };

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 16px" }}>
      <div style={{ width: "100%", maxWidth: 640 }}>
        {/* Progress bar */}
        <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 28, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: COLORS.accent, transition: "width .25s" }} />
        </div>

        {screen.type === "intro" && (
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textDim, marginBottom: 8 }}>New Hire Training</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.3 }}>{sop.title}</h1>
            <p style={{ color: COLORS.textDim, lineHeight: 1.7, fontSize: 15 }}>{sop.applies}</p>
            <button onClick={next} style={btnPrimary}>Start Training →</button>
          </div>
        )}

        {screen.type === "section" && (
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textDim, marginBottom: 8 }}>
              Step {SCREENS.slice(0, index).filter(s => s.type === "section").length + 1} of {sop.sections.length}
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 18px" }}>{screen.data.title}</h2>
            <SectionBody section={screen.data} />
            <NavRow onBack={back} onNext={next} />
          </div>
        )}

        {screen.type === "quizIntro" && (
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textDim, marginBottom: 8 }}>Knowledge Check</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 14px" }}>Quick check before you're done</h2>
            <p style={{ color: COLORS.textDim, lineHeight: 1.7 }}>{sop.quiz.length} questions covering the parts of this SOP that matter most — the ones with real compliance consequences if they're missed.</p>
            <NavRow onBack={back} onNext={next} nextLabel="Start Quiz →" />
          </div>
        )}

        {screen.type === "quiz" && (() => {
          const qIdx = quizIndexOf(index);
          const q = screen.data;
          const sel = answers[qIdx];
          const isRevealed = !!revealed[qIdx];
          return (
            <div>
              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textDim, marginBottom: 8 }}>Question {qIdx + 1} of {sop.quiz.length}</div>
              <h2 style={{ fontSize: 19, fontWeight: 700, margin: "0 0 18px", lineHeight: 1.4 }}>{q.q}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.correct;
                  const isSelected = oi === sel;
                  let bg = COLORS.panel, border = COLORS.border, color = COLORS.text;
                  if (isRevealed && isCorrect) { bg = COLORS.goodSoft; border = COLORS.good; color = COLORS.good; }
                  else if (isRevealed && isSelected && !isCorrect) { bg = COLORS.warnSoft; border = COLORS.warn; color = COLORS.warn; }
                  return (
                    <button key={oi} onClick={() => selectAnswer(qIdx, oi)}
                      style={{ textAlign: "left", padding: "12px 16px", borderRadius: 8, background: bg, border: `1px solid ${border}`, color, cursor: isRevealed ? "default" : "pointer", fontSize: 14, lineHeight: 1.5, fontFamily: "inherit" }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {isRevealed && (
                <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 8, background: "rgba(255,255,255,0.04)", fontSize: 13, color: COLORS.textDim, lineHeight: 1.6 }}>
                  {q.explain}
                </div>
              )}
              <NavRow onBack={back} onNext={next} nextDisabled={!isRevealed} />
            </div>
          );
        })()}

        {screen.type === "results" && (
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textDim, marginBottom: 8 }}>Complete</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 10px" }}>{quizScore()} / {sop.quiz.length} correct</h2>
            <p style={{ color: COLORS.textDim, lineHeight: 1.7, marginBottom: 24 }}>
              {quizScore() === sop.quiz.length
                ? "All correct — you've got the critical points down."
                : "Worth reviewing the sections tied to any missed questions before your first shift on register."}
            </p>
            <button onClick={restart} style={btnPrimary}>Restart Training</button>
          </div>
        )}
      </div>
    </div>
  );
}

function NavRow({ onBack, onNext, nextLabel = "Next →", nextDisabled = false }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
      <button onClick={onBack} style={btnSecondary}>← Back</button>
      <button onClick={onNext} disabled={nextDisabled} style={{ ...btnPrimary, opacity: nextDisabled ? 0.4 : 1, cursor: nextDisabled ? "not-allowed" : "pointer" }}>{nextLabel}</button>
    </div>
  );
}

const btnPrimary = {
  marginTop: 24,
  padding: "11px 22px",
  borderRadius: 8,
  border: "none",
  background: COLORS.accent,
  color: "#0d1319",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "inherit",
};
const btnSecondary = {
  padding: "11px 22px",
  borderRadius: 8,
  border: `1px solid ${COLORS.border}`,
  background: "transparent",
  color: COLORS.textDim,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "inherit",
};
