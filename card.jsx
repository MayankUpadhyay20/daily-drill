// Question card — renders one question with hints, MCQ, solution, concept
/* global React, TeX, Icon, DifficultyBadge, Tag, OptionButton, Collapse, formatDuration, usePersistedState */

const { useState, useEffect, useRef, useMemo } = React;

function HintCard({ index, text, revealed, onReveal }) {
  return (
    <div className={`hint ${revealed ? "is-revealed" : ""}`}>
      <div className="hint__head">
        <span className="hint__num">Hint {index + 1}</span>
        {!revealed && (
          <button className="hint__btn" onClick={onReveal} type="button">
            Reveal
          </button>
        )}
      </div>
      <Collapse open={revealed}>
        <TeX className="hint__body" as="div" block>
          {text}
        </TeX>
      </Collapse>
    </div>
  );
}

function Timer({ seconds, running, onToggle, onReset }) {
  const urgency = seconds < 300 ? "green" : "amber";
  return (
    <div className="timer" data-urgency={urgency} role="timer" aria-label="solving time">
      <button
        className="timer__btn"
        onClick={onToggle}
        type="button"
        aria-label={running ? "Pause" : "Play"}
      >
        <Icon name={running ? "pause" : "play"} size={12} />
      </button>
      <span className="timer__val">{formatDuration(seconds)}</span>
      <button
        className="timer__btn timer__btn--ghost"
        onClick={onReset}
        type="button"
        aria-label="Reset"
      >
        <Icon name="reset" size={12} />
      </button>
    </div>
  );
}

function QuestionCard({
  subject,
  q,
  bookmarked,
  onToggleBookmark,
  onShare,
  onAnswer,
  onOpenPYQ,
  storageKey,
}) {
  // Per-question session state, persisted by date+id so reloads keep progress
  const [picked, setPicked] = usePersistedState(`${storageKey}:picked`, null);
  const [revealedHints, setRevealedHints] = usePersistedState(
    `${storageKey}:hints`,
    0
  );
  const [solutionOpen, setSolutionOpen] = usePersistedState(
    `${storageKey}:sol`,
    false
  );
  const [conceptOpen, setConceptOpen] = usePersistedState(
    `${storageKey}:concept`,
    false
  );
  const [secs, setSecs] = usePersistedState(`${storageKey}:secs`, 0);
  const [running, setRunning] = useState(picked === null && !solutionOpen);

  // Ticker
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  // Auto-stop on solution reveal or correct pick
  useEffect(() => {
    if (solutionOpen) setRunning(false);
  }, [solutionOpen]);
  useEffect(() => {
    if (picked === q.correct) setRunning(false);
  }, [picked, q.correct]);

  // When question changes (subject switch), keys change → state resets naturally.
  // But running state needs an explicit reset:
  useEffect(() => {
    setRunning(picked === null && !solutionOpen);
    // eslint-disable-next-line
  }, [q.id]);

  // Fire onAnswer only once per question (first pick), not on every retry.
  const lastReportedRef = useRef(picked !== null ? q.id : null);
  useEffect(() => {
    if (picked === null) return;
    if (lastReportedRef.current === q.id) return;
    lastReportedRef.current = q.id;
    onAnswer && onAnswer(subject, q.id, picked === q.correct);
  }, [picked, q.id, q.correct, subject]);

  // Reset report tracker on question change
  useEffect(() => {
    lastReportedRef.current = null;
  }, [q.id]);

  const correctlyAnswered = picked === q.correct;

  const optionState = (i) => {
    if (picked === null) return "idle";
    if (correctlyAnswered) {
      if (i === q.correct) return "correct";
      return "revealed";
    }
    // Wrong pick — only mark the chosen option, don't reveal the correct one
    if (i === picked) return "wrong";
    return "idle";
  };

  const revealNextHint = () =>
    setRevealedHints((n) => Math.min(n + 1, q.hints.length));

  return (
    <article
      className="qcard"
      data-subject={subject}
      data-screen-label={`${subject} question`}
    >
      <header className="qcard__top">
        <div className="qcard__meta">
          <Tag className="tag--chapter">{q.chapter}</Tag>
          <Tag className="tag--cls">Class {q.cls}</Tag>
          <DifficultyBadge value={q.difficulty} />
        </div>
        <Timer
          seconds={secs}
          running={running}
          onToggle={() => setRunning((r) => !r)}
          onReset={() => {
            setSecs(0);
            setRunning(true);
          }}
        />
      </header>

      <TeX as="div" className="qcard__question" block>
        {q.question}
      </TeX>

      <div className="qcard__options">
        {q.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={String.fromCharCode(65 + i)}
            content={opt}
            state={optionState(i)}
            onClick={() => !correctlyAnswered && setPicked(i)}
            disabled={correctlyAnswered}
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
              ? "Correct. Nice work."
              : "Not quite — try a different option."}
          </span>
        </div>
      )}

      <section className="qcard__hints">
        <h3 className="qcard__sectitle">
          <Icon name="lightbulb" size={14} />
          <span>Hints</span>
          <span className="qcard__sectitle-count">
            {revealedHints}/{q.hints.length}
          </span>
        </h3>
        <div className="hints">
          {q.hints.map((h, i) => (
            <HintCard
              key={i}
              index={i}
              text={h}
              revealed={i < revealedHints}
              onReveal={revealNextHint}
            />
          ))}
        </div>
      </section>

      <section className="qcard__solution">
        <button
          className="qcard__reveal"
          type="button"
          onClick={() => setSolutionOpen((v) => !v)}
        >
          <span>{solutionOpen ? "Hide solution" : "Reveal solution"}</span>
          <Icon
            name="chevron"
            size={14}
            className={solutionOpen ? "is-open" : ""}
          />
        </button>
        <Collapse open={solutionOpen}>
          <TeX as="div" className="qcard__solution-body" block>
            {q.solution}
          </TeX>
        </Collapse>
      </section>

      <section className="qcard__concept">
        <button
          className="qcard__reveal qcard__reveal--quiet"
          type="button"
          onClick={() => setConceptOpen((v) => !v)}
        >
          <span>{conceptOpen ? "Hide concept" : "About this concept"}</span>
          <Icon
            name="chevron"
            size={14}
            className={conceptOpen ? "is-open" : ""}
          />
        </button>
        <Collapse open={conceptOpen}>
          <TeX as="div" className="qcard__concept-body" block>
            {q.concept}
          </TeX>
        </Collapse>
      </section>

      <PYQSection
        pyqs={window.PYQ_BANK?.[q.id] || []}
        storageKey={storageKey}
        subject={subject}
        parentQ={q}
        onOpen={onOpenPYQ}
      />

      <NotesSection storageKey={storageKey} />

      <footer className="qcard__foot">
        <button
          className={`iconbtn ${bookmarked ? "is-on" : ""}`}
          onClick={onToggleBookmark}
          type="button"
          aria-pressed={bookmarked}
        >
          <Icon name={bookmarked ? "bookmarkFilled" : "bookmark"} size={16} />
          <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
        </button>
        <button className="iconbtn" onClick={onShare} type="button">
          <Icon name="share" size={16} />
          <span>Share</span>
        </button>
      </footer>
    </article>
  );
}

// ─── PYQ Section ─────────────────────────────────────────────────────────
function PYQSection({ pyqs, storageKey, onOpen, subject, parentQ }) {
  const [open, setOpen] = usePersistedState(`${storageKey}:pyq`, false);
  if (!pyqs || pyqs.length === 0) return null;
  return (
    <section className="qcard__pyq">
      <button
        className="qcard__reveal qcard__reveal--quiet"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          {open ? "Hide PYQs" : `Want to attempt PYQs? · ${pyqs.length}`}
        </span>
        <Icon name="chevron" size={14} className={open ? "is-open" : ""} />
      </button>
      <Collapse open={open}>
        <div className="pyq-list">
          {pyqs.map((p, i) => (
            <button
              key={i}
              type="button"
              className="pyq-card"
              onClick={() =>
                onOpen && onOpen({ subject, parentQ, pyq: p, pyqIndex: i, allPyqs: pyqs })
              }
            >
              <div className="pyq-card__head">
                <span className="pyq-card__year">JEE Main {p.year}</span>
                {p.session && (
                  <span className="pyq-card__sess">{p.session} attempt</span>
                )}
                <span className="pyq-card__chev" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m8 5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <TeX as="div" className="pyq-card__q" block>
                {p.question}
              </TeX>
              <div className="pyq-card__foot">
                <span className="pyq-card__count">
                  {p.options?.length || 4} options
                </span>
                <span className="pyq-card__cta">Attempt this PYQ →</span>
              </div>
            </button>
          ))}
        </div>
      </Collapse>
    </section>
  );
}

// ─── Notes Section ───────────────────────────────────────────────────────
function NotesSection({ storageKey }) {
  const [notes, setNotes] = usePersistedState(`${storageKey}:notes`, "");
  const [open, setOpen] = usePersistedState(`${storageKey}:notes-open`, false);
  const taRef = useRef(null);

  useEffect(() => {
    if (open && taRef.current) {
      taRef.current.style.height = "auto";
      taRef.current.style.height = Math.max(taRef.current.scrollHeight, 80) + "px";
    }
  }, [notes, open]);

  return (
    <section className="qcard__notes">
      <button
        className="qcard__reveal qcard__reveal--quiet"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          {open ? "Hide notes" : notes ? "Your notes" : "Add a note"}
          {notes && !open && (
            <span className="qcard__notes-preview"> · {notes.slice(0, 40)}{notes.length > 40 ? "…" : ""}</span>
          )}
        </span>
        <Icon name="chevron" size={14} className={open ? "is-open" : ""} />
      </button>
      <Collapse open={open}>
        <div className="notes">
          <textarea
            ref={taRef}
            className="notes__ta"
            placeholder="Jot down what you noticed, where you got stuck, or the formula you want to remember…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="notes__foot">
            <span>{notes.length} characters · saved automatically</span>
            {notes && (
              <button
                type="button"
                className="notes__clear"
                onClick={() => {
                  if (confirm("Clear your note for this question?")) setNotes("");
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </Collapse>
    </section>
  );
}

Object.assign(window, { QuestionCard, PYQSection, NotesSection });
