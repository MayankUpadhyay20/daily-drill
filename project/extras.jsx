// Practice drawer (Solve more like this) + Leaderboard drawer + Stats hook
/* global React, TeX, Icon, DifficultyBadge, Tag, OptionButton, Collapse, formatDuration, usePersistedState */

const { useState, useEffect, useMemo, useRef: _useRef } = React;

// ─── Stats hook ────────────────────────────────────────────────────────────
// Tracks total attempts, total correct, per-subject correct, longest streak.
function useStats() {
  const [stats, setStats] = usePersistedState("daily:stats", {
    attempted: 0,
    correct: 0,
    bySubject: { physics: 0, chemistry: 0, math: 0 },
    correctSet: [], // ["physics:p-emi-01"] — to dedupe count per question
  });

  const record = (subject, qid, isCorrect) => {
    setStats((s) => {
      const key = `${subject}:${qid}`;
      const alreadyCorrect = s.correctSet.includes(key);
      const next = {
        ...s,
        attempted: s.attempted + 1,
        correct: isCorrect && !alreadyCorrect ? s.correct + 1 : s.correct,
        bySubject: {
          ...s.bySubject,
          [subject]:
            isCorrect && !alreadyCorrect
              ? (s.bySubject[subject] || 0) + 1
              : s.bySubject[subject] || 0,
        },
        correctSet:
          isCorrect && !alreadyCorrect
            ? [...s.correctSet, key]
            : s.correctSet,
      };
      return next;
    });
  };

  return [stats, record];
}

// ─── Practice drawer ───────────────────────────────────────────────────────
function PracticeQuestion({ q, subject, onAnswer }) {
  const [picked, setPicked] = useState(null);
  const [hintIdx, setHintIdx] = useState(0);
  const [solOpen, setSolOpen] = useState(false);

  // Reset on question change
  useEffect(() => {
    setPicked(null);
    setHintIdx(0);
    setSolOpen(false);
  }, [q.id]);

  const optState = (i) => {
    if (picked === null) return "idle";
    if (i === q.correct) return "correct";
    if (i === picked) return "wrong";
    return "revealed";
  };

  return (
    <div className="practice-q" data-subject={subject}>
      <div className="practice-q__meta">
        <Tag className="tag--chapter">{q.chapter}</Tag>
        <Tag className="tag--cls">Class {q.cls}</Tag>
        <DifficultyBadge value={q.difficulty} />
      </div>

      <TeX as="div" className="practice-q__question" block>
        {q.question}
      </TeX>

      <div className="practice-q__options">
        {q.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={String.fromCharCode(65 + i)}
            content={opt}
            state={optState(i)}
            onClick={() => {
              if (picked !== null) return;
              setPicked(i);
              onAnswer(i === q.correct);
            }}
            disabled={picked !== null}
          />
        ))}
      </div>

      <div className="practice-q__tools">
        <button
          className="practice-q__hint"
          type="button"
          disabled={hintIdx >= q.hints.length}
          onClick={() => setHintIdx((n) => Math.min(n + 1, q.hints.length))}
        >
          <Icon name="lightbulb" size={14} />
          <span>
            {hintIdx === 0
              ? "Need a hint?"
              : hintIdx < q.hints.length
              ? `Next hint (${hintIdx}/${q.hints.length})`
              : `All hints shown (${q.hints.length}/${q.hints.length})`}
          </span>
        </button>
        <button
          className="practice-q__sol-btn"
          type="button"
          onClick={() => setSolOpen((v) => !v)}
        >
          <span>{solOpen ? "Hide solution" : "Show solution"}</span>
          <Icon name="chevron" size={12} className={solOpen ? "is-open" : ""} />
        </button>
      </div>

      {hintIdx > 0 && (
        <div className="practice-q__hints">
          {q.hints.slice(0, hintIdx).map((h, i) => (
            <div className="practice-q__hint-card" key={i}>
              <span className="practice-q__hint-num">Hint {i + 1}</span>
              <TeX className="practice-q__hint-body" as="div" block>
                {h}
              </TeX>
            </div>
          ))}
        </div>
      )}

      <Collapse open={solOpen}>
        <div className="practice-q__sol">
          <TeX as="div" block>
            {q.solution}
          </TeX>
        </div>
      </Collapse>
    </div>
  );
}

function PracticeDrawer({ open, subject, onClose, bank, onAnswer }) {
  const subjQuestions = useMemo(
    () => (subject && bank[subject] ? bank[subject] : []),
    [subject, bank]
  );

  // Start at a random spot so it's not always the same first question
  const [idx, setIdx] = useState(0);
  const [seen, setSeen] = useState(0);
  const [correct, setCorrect] = useState(0);

  // When subject changes or drawer opens, reset.
  useEffect(() => {
    if (!open) return;
    setIdx(Math.floor(Math.random() * subjQuestions.length));
    setSeen(0);
    setCorrect(0);
  }, [open, subject]);

  if (!subject) return null;

  const q = subjQuestions[idx];
  const label =
    { physics: "Physics", chemistry: "Chemistry", math: "Mathematics" }[
      subject
    ] || "Practice";

  return (
    <div className={`drawer practice-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={onClose} />
      <aside className="drawer__panel practice-drawer__panel" data-subject={subject} role="dialog" aria-label="Practice">
        <header className="drawer__head">
          <div>
            <div className="practice-drawer__eyebrow">
              <span className="practice-drawer__dot" /> Practice mode
            </div>
            <h2 className="drawer__title">More {label} problems</h2>
          </div>
          <button
            className="iconbtn iconbtn--ghost"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <Icon name="close" size={16} />
          </button>
        </header>

        <div className="practice-drawer__strip">
          <div className="practice-drawer__stat">
            <span className="practice-drawer__stat-val">{seen}</span>
            <span className="practice-drawer__stat-lbl">attempted</span>
          </div>
          <div className="practice-drawer__stat">
            <span className="practice-drawer__stat-val">{correct}</span>
            <span className="practice-drawer__stat-lbl">correct</span>
          </div>
          <div className="practice-drawer__stat">
            <span className="practice-drawer__stat-val">
              {seen ? Math.round((correct / seen) * 100) : 0}%
            </span>
            <span className="practice-drawer__stat-lbl">accuracy</span>
          </div>
        </div>

        <div className="drawer__body practice-drawer__body">
          {q && (
            <PracticeQuestion
              q={q}
              subject={subject}
              onAnswer={(isCorrect) => {
                setSeen((n) => n + 1);
                if (isCorrect) setCorrect((n) => n + 1);
                onAnswer && onAnswer(subject, q.id, isCorrect);
              }}
            />
          )}
        </div>

        <footer className="practice-drawer__foot">
          <button
            className="practice-drawer__skip"
            type="button"
            onClick={() => setIdx((i) => (i + 1) % subjQuestions.length)}
          >
            Skip
          </button>
          <button
            className="practice-drawer__next"
            type="button"
            onClick={() => setIdx((i) => (i + 1) % subjQuestions.length)}
          >
            <span>Next question</span>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m8 5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </footer>
      </aside>
    </div>
  );
}

// ─── Leaderboard drawer ────────────────────────────────────────────────────
// Mock peer scoreboard — generates deterministic-but-believable scores keyed
// off the day so the standings shift over time. The current user slots in
// with their real local stats.
const MOCK_PEERS = [
  { handle: "aanya_k", region: "Lucknow" },
  { handle: "rohit12", region: "Pune" },
  { handle: "sneha.m", region: "Hyderabad" },
  { handle: "iqbal_r", region: "Srinagar" },
  { handle: "tara_v", region: "Chennai" },
  { handle: "kabir_p", region: "Delhi" },
  { handle: "meera_s", region: "Kochi" },
  { handle: "arjun_d", region: "Jaipur" },
  { handle: "lakshmi.t", region: "Bengaluru" },
  { handle: "yusuf_a", region: "Bhopal" },
  { handle: "anushka", region: "Mumbai" },
  { handle: "param_g", region: "Patna" },
];

// Tiny deterministic hash → number in [0, 1)
function hash01(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return (h % 100000) / 100000;
}

function LeaderboardDrawer({ open, onClose, stats, streak, dayKey }) {
  const [scope, setScope] = useState("all"); // all-time | weekly

  const me = {
    handle: "you",
    region: "You",
    isMe: true,
    streak,
    solved: stats.correct || 0,
    attempted: stats.attempted || 0,
    accuracy: stats.attempted ? Math.round((stats.correct / stats.attempted) * 100) : 0,
  };

  const peers = useMemo(() => {
    const seed = scope === "weekly" ? dayKey.slice(0, 7) : "all";
    return MOCK_PEERS.map((p) => {
      const r1 = hash01(p.handle + seed + "s");
      const r2 = hash01(p.handle + seed + "v");
      const r3 = hash01(p.handle + seed + "a");
      const solved = Math.floor(40 + r1 * 220);
      const streakP = 1 + Math.floor(r2 * 60);
      const accuracy = Math.floor(60 + r3 * 38);
      return { ...p, solved, streak: streakP, accuracy };
    });
  }, [scope, dayKey]);

  const ranked = useMemo(() => {
    const all = [...peers, me].sort((a, b) => {
      // Composite score: solved + streak * 2 + accuracy bonus
      const sa = a.solved + a.streak * 2 + a.accuracy / 5;
      const sb = b.solved + b.streak * 2 + b.accuracy / 5;
      return sb - sa;
    });
    return all.map((u, i) => ({ ...u, rank: i + 1 }));
  }, [peers, me]);

  const myRank = ranked.find((u) => u.isMe)?.rank;

  return (
    <div className={`drawer lb-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={onClose} />
      <aside className="drawer__panel lb-drawer__panel" role="dialog" aria-label="Leaderboard">
        <header className="drawer__head">
          <h2 className="drawer__title">Leaderboard</h2>
          <button
            className="iconbtn iconbtn--ghost"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <Icon name="close" size={16} />
          </button>
        </header>

        <div className="lb-drawer__filters">
          {[
            { id: "all", label: "All-time" },
            { id: "weekly", label: "This week" },
          ].map((s) => (
            <button
              key={s.id}
              className={`chip ${scope === s.id ? "is-on" : ""}`}
              onClick={() => setScope(s.id)}
              type="button"
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="lb-drawer__me">
          <div className="lb-drawer__me-rank">#{myRank || "—"}</div>
          <div className="lb-drawer__me-info">
            <div className="lb-drawer__me-name">You</div>
            <div className="lb-drawer__me-sub">
              {me.solved} solved · {me.streak}-day streak · {me.accuracy}% accuracy
            </div>
          </div>
          <Icon name="flame" size={16} className="lb-drawer__me-flame" />
        </div>

        <div className="drawer__body lb-drawer__body">
          {ranked.map((u) => (
            <div
              key={u.handle}
              className={`lb-row ${u.isMe ? "is-me" : ""} ${u.rank <= 3 ? `is-top is-top-${u.rank}` : ""}`}
            >
              <div className="lb-row__rank">{u.rank}</div>
              <div className="lb-row__avatar" aria-hidden="true">
                <span>{u.handle[0].toUpperCase()}</span>
              </div>
              <div className="lb-row__id">
                <div className="lb-row__handle">
                  {u.isMe ? "you" : u.handle}
                </div>
                <div className="lb-row__region">{u.region}</div>
              </div>
              <div className="lb-row__metrics">
                <div className="lb-row__metric">
                  <span className="lb-row__num">{u.solved}</span>
                  <span className="lb-row__lbl">solved</span>
                </div>
                <div className="lb-row__metric">
                  <span className="lb-row__num">
                    <Icon name="flame" size={12} /> {u.streak}
                  </span>
                  <span className="lb-row__lbl">streak</span>
                </div>
                <div className="lb-row__metric">
                  <span className="lb-row__num">{u.accuracy}%</span>
                  <span className="lb-row__lbl">acc</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="lb-drawer__foot">
          Standings are based on questions solved, streak length, and accuracy.
          Peer data is illustrative.
        </footer>
      </aside>
    </div>
  );
}

// ─── Solve-more CTA row (3 subject buttons below main card) ─────────────────
function SolveMore({ onPick }) {
  const items = [
    {
      id: "physics",
      label: "Physics",
      glyph: "Ph",
      topics: ["Mechanics", "EM", "Optics", "Modern"],
      count: 412,
    },
    {
      id: "chemistry",
      label: "Chemistry",
      glyph: "Ch",
      topics: ["Physical", "Inorganic", "Organic"],
      count: 386,
    },
    {
      id: "math",
      label: "Mathematics",
      glyph: "Ma",
      topics: ["Calculus", "Algebra", "Vectors"],
      count: 524,
    },
  ];
  return (
    <section className="solve-more" aria-label="Practice more">
      <header className="solve-more__head">
        <h3 className="solve-more__title">Want to solve more?</h3>
        <p className="solve-more__sub">
          Drill problems from the same subject as long as you like — your daily
          streak stays exactly as it is.
        </p>
      </header>
      <div className="solve-more__grid">
        {items.map((it) => (
          <button
            key={it.id}
            className="solve-more__card"
            data-subject={it.id}
            onClick={() => onPick(it.id)}
            type="button"
          >
            <span className="solve-more__glyph" aria-hidden="true">
              {it.glyph}
            </span>
            <span className="solve-more__meta">{it.count} questions</span>
            <span className="solve-more__label">{it.label}</span>
            <span className="solve-more__chips">
              {it.topics.map((t) => (
                <span key={t} className="solve-more__chip">
                  {t}
                </span>
              ))}
            </span>
            <span className="solve-more__cta">
              <span>Start practice</span>
              <span className="solve-more__cta-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 10h12m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── PYQ Drawer ────────────────────────────────────────────────────────────
// Full-page MCQ view for a JEE Main past-year question. Opens via the
// "Attempt this PYQ" cards inside the question. Supports navigating between
// the 1–2 PYQs attached to the parent question via prev/next arrows.
function PYQDrawer({ open, payload, onClose }) {
  const subject = payload?.subject;
  const all = payload?.allPyqs || [];
  const [idx, setIdx] = useState(payload?.pyqIndex || 0);
  const [picked, setPicked] = useState(null);
  const [showExplain, setShowExplain] = useState(false);

  // Reset when payload changes
  useEffect(() => {
    if (!open) return;
    setIdx(payload?.pyqIndex || 0);
    setPicked(null);
    setShowExplain(false);
  }, [open, payload?.parentQ?.id, payload?.pyqIndex]);

  // Reset MCQ state when navigating between PYQs
  useEffect(() => {
    setPicked(null);
    setShowExplain(false);
  }, [idx]);

  if (!open || !payload) return null;
  const pyq = all[idx];
  if (!pyq) return null;

  const correctlyAnswered = picked === pyq.correct;
  const wrongAnswered = picked !== null && picked !== pyq.correct;

  const optState = (i) => {
    if (picked === null) return "idle";
    if (i === pyq.correct) return "correct";
    if (i === picked) return "wrong";
    return "revealed";
  };

  return (
    <div className={`drawer pyq-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={onClose} />
      <aside
        className="drawer__panel pyq-drawer__panel"
        data-subject={subject}
        role="dialog"
        aria-label="JEE Main PYQ"
      >
        <header className="pyq-drawer__head">
          <div className="pyq-drawer__head-info">
            <div className="pyq-drawer__eyebrow">
              <span className="pyq-drawer__badge">JEE Main {pyq.year}</span>
              {pyq.session && (
                <span className="pyq-drawer__sess">{pyq.session} attempt</span>
              )}
            </div>
            <h2 className="pyq-drawer__title">
              {payload.parentQ?.chapter} · Past-year question
            </h2>
            <p className="pyq-drawer__sub">
              Related to today's {subject} question
            </p>
          </div>
          <button
            className="iconbtn iconbtn--ghost"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <Icon name="close" size={16} />
          </button>
        </header>

        {all.length > 1 && (
          <nav className="pyq-drawer__pager">
            <button
              className="pyq-drawer__pager-btn"
              type="button"
              disabled={idx === 0}
              onClick={() => setIdx((n) => Math.max(0, n - 1))}
              aria-label="Previous PYQ"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m12 5-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="pyq-drawer__pager-info">
              <span className="pyq-drawer__pager-num">{idx + 1}</span>
              <span className="pyq-drawer__pager-total"> of {all.length}</span>
            </span>
            <button
              className="pyq-drawer__pager-btn"
              type="button"
              disabled={idx === all.length - 1}
              onClick={() => setIdx((n) => Math.min(all.length - 1, n + 1))}
              aria-label="Next PYQ"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m8 5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </nav>
        )}

        <div className="drawer__body pyq-drawer__body">
          <TeX as="div" className="pyq-drawer__q" block>
            {pyq.question}
          </TeX>

          <div className="pyq-drawer__options">
            {(pyq.options || []).map((opt, i) => (
              <OptionButton
                key={i}
                label={String.fromCharCode(65 + i)}
                content={opt}
                state={optState(i)}
                onClick={() => picked === null && setPicked(i)}
                disabled={picked !== null}
              />
            ))}
          </div>

          {picked !== null && (
            <div
              className={`feedback ${correctlyAnswered ? "is-correct" : "is-wrong"}`}
            >
              <Icon name={correctlyAnswered ? "check" : "cross"} size={14} />
              <span>
                {correctlyAnswered
                  ? "Correct. That's exactly the JEE Main answer."
                  : "Not quite — review the explanation below."}
              </span>
              {wrongAnswered && (
                <button
                  className="feedback__retry"
                  type="button"
                  onClick={() => {
                    setPicked(null);
                    setShowExplain(false);
                  }}
                >
                  Try again
                </button>
              )}
            </div>
          )}

          <button
            className="qcard__reveal qcard__reveal--quiet pyq-drawer__exp-btn"
            type="button"
            onClick={() => setShowExplain((v) => !v)}
          >
            <span>{showExplain ? "Hide explanation" : "Show explanation"}</span>
            <Icon
              name="chevron"
              size={14}
              className={showExplain ? "is-open" : ""}
            />
          </button>
          <Collapse open={showExplain || picked !== null}>
            <div className="pyq-drawer__explain">
              <div className="pyq-drawer__ans">
                <span className="pyq-drawer__ans-lbl">Answer</span>
                <TeX className="pyq-drawer__ans-val">
                  {`${String.fromCharCode(65 + pyq.correct)}. ${pyq.options?.[pyq.correct] || ""}`}
                </TeX>
              </div>
              <TeX as="div" className="pyq-drawer__explain-body" block>
                {pyq.explain}
              </TeX>
            </div>
          </Collapse>
        </div>

        <footer className="pyq-drawer__foot">
          <button
            className="practice-drawer__skip"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
          {idx < all.length - 1 && (
            <button
              className="practice-drawer__next"
              type="button"
              onClick={() => setIdx((n) => n + 1)}
            >
              <span>Next PYQ</span>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m8 5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </footer>
      </aside>
    </div>
  );
}

Object.assign(window, {
  useStats,
  PracticeDrawer,
  PYQDrawer,
  LeaderboardDrawer,
  SolveMore,
});
