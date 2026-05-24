// Main app — header, tabs, archive drawer, tweaks wiring
/* global React, ReactDOM, QuestionCard, TeX, Icon, DifficultyBadge, Tag, Toast, usePersistedState,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle */

const { useState, useEffect, useMemo, useRef } = React;

const SUBJECTS = [
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "math", label: "Mathematics" },
];

// Days since epoch — used as a deterministic daily seed.
function daysSinceEpoch(d = new Date()) {
  const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor(utc / 86400000);
}
function ymd(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}
function prettyDate(d = new Date()) {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Streak management — increments on a fresh day, breaks if a day is skipped.
function useStreak() {
  const [data, setData] = usePersistedState("daily:streak", {
    streak: 0,
    last: null,
  });

  useEffect(() => {
    const today = ymd();
    if (data.last === today) return;
    const yesterday = ymd(new Date(Date.now() - 86400000));
    const next =
      data.last === yesterday ? (data.streak || 0) + 1 : 1; // missed days → reset to 1
    setData({ streak: next, last: today });
    // eslint-disable-next-line
  }, []);

  return data.streak || 1;
}

// ─── AI question generation via Anthropic API ────────────────────────────────
async function generateQuestion(apiKey, subject, difficulty) {
  const subjectMap = { physics: "Physics", chemistry: "Chemistry", math: "Mathematics" };
  const subjectFull = subjectMap[subject];
  const ts = Date.now();

  const prompt = `You are a CBSE Class 11 & 12 exam question setter for ${subjectFull}.

Generate ONE original ${difficulty}-level multiple-choice question from the CBSE syllabus.

Respond with ONLY a valid JSON object — no markdown fences, no extra text:

{"id":"gen-${subject}-${ts}","cls":"XI or XII","chapter":"chapter name from CBSE syllabus","difficulty":"${difficulty}","question":"question with $..$ inline LaTeX and $$..$$ display LaTeX","options":["option A","option B","option C","option D"],"correct":0,"hints":["hint 1","hint 2","hint 3"],"solution":"step-by-step solution with LaTeX","concept":"one paragraph explaining the underlying concept"}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  const raw = data.content[0].text.trim().replace(/^```json?\n?/, "").replace(/\n?```$/, "");
  return JSON.parse(raw);
}

// ─── Difficulty picker ───────────────────────────────────────────────────────
const DIFF_LEVELS = [
  { id: "Easy",   color: "oklch(0.62 0.13 145)" },
  { id: "Medium", color: "oklch(0.65 0.14 72)"  },
  { id: "Hard",   color: "oklch(0.6 0.18 25)"   },
];

function DifficultyPicker({ value, onChange }) {
  return (
    <div className="diff-picker" role="group" aria-label="Select difficulty">
      <span className="diff-picker__label">Difficulty</span>
      {DIFF_LEVELS.map((l) => (
        <button
          key={l.id}
          className={`diff-pick-btn ${value === l.id ? "is-on" : ""}`}
          style={{ "--pick-clr": l.color }}
          onClick={() => onChange(value === l.id ? null : l.id)}
          type="button"
        >
          {l.id}
        </button>
      ))}
    </div>
  );
}

// ─── Settings drawer ────────────────────────────────────────────────────────
function SettingsDrawer({ open, onClose, theme, variant, onTheme, onVariant, apiKey, onApiKey }) {
  return (
    <div className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={onClose} />
      <aside className="drawer__panel settings-drawer__panel" role="dialog" aria-label="Settings">
        <header className="drawer__head">
          <h2 className="drawer__title">Settings</h2>
          <button className="iconbtn iconbtn--ghost" onClick={onClose} type="button" aria-label="Close">
            <Icon name="close" size={16} />
          </button>
        </header>
        <div className="drawer__body settings-drawer__body">

          <div className="settings-section">
            <div className="settings-section__title">Appearance</div>
            <div className="settings-row">
              <span className="settings-row__label">Theme</span>
              <div className="settings-seg">
                {["light", "dark"].map((v) => (
                  <button key={v} className={`settings-seg__btn ${theme === v ? "is-on" : ""}`}
                    onClick={() => onTheme(v)} type="button">
                    {v === "light" ? "Light" : "Dark"}
                  </button>
                ))}
              </div>
            </div>
            <div className="settings-row">
              <span className="settings-row__label">Style</span>
              <div className="settings-seg">
                {["calm", "editorial"].map((v) => (
                  <button key={v} className={`settings-seg__btn ${variant === v ? "is-on" : ""}`}
                    onClick={() => onVariant(v)} type="button">
                    {v[0].toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section__title">AI Questions</div>
            <p className="settings-section__desc">
              Paste an Anthropic API key to unlock AI-generated questions. Pick a difficulty below the subject tabs and a fresh question is generated and cached for the day.
            </p>
            <div className="settings-row settings-row--col">
              <span className="settings-row__label">Anthropic API key</span>
              <input
                type="password"
                className="settings-input"
                placeholder="sk-ant-…"
                value={apiKey}
                onChange={(e) => onApiKey(e.target.value)}
                autoComplete="off"
                spellCheck={false}
              />
              {apiKey
                ? <span className="settings-hint settings-hint--ok">Key saved — select Easy / Medium / Hard to generate.</span>
                : <span className="settings-hint">Get a free key at <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a></span>
              }
            </div>
          </div>

        </div>
      </aside>
    </div>
  );
}

function Header({ streak, date, onArchiveOpen, onLeaderboardOpen, onSettingsOpen }) {
  return (
    <header className="app__header">
      <div className="brand">
        <div className="brand__mark" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10 4.5v5.5l3.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <div className="brand__text">
          <div className="brand__title">Daily Drill</div>
          <div className="brand__sub">CBSE · Class XI &amp; XII</div>
        </div>
      </div>
      <div className="app__date">{date}</div>
      <div className="app__actions">
        <div className="streak" title={`${streak} day streak`}>
          <Icon name="flame" size={14} />
          <span className="streak__num">{streak}</span>
          <span className="streak__lbl">day streak</span>
        </div>
        <button className="iconbtn iconbtn--ghost" onClick={onLeaderboardOpen} type="button" aria-label="Leaderboard">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M6 9h2v8H6zM9 5h2v12H9zM12 12h2v5h-2z" /><path d="M3 17h14" strokeLinecap="round" />
          </svg>
        </button>
        <button className="iconbtn iconbtn--ghost" onClick={onArchiveOpen} type="button" aria-label="Past questions">
          <Icon name="archive" size={16} />
        </button>
        <button className="iconbtn iconbtn--ghost" onClick={onSettingsOpen} type="button" aria-label="Settings">
          <Icon name="sliders" size={16} />
        </button>
      </div>
    </header>
  );
}

function SubjectTabs({ active, onChange }) {
  return (
    <nav className="tabs" aria-label="Subject">
      {SUBJECTS.map((s) => (
        <button
          key={s.id}
          className={`tab ${active === s.id ? "is-active" : ""}`}
          onClick={() => onChange(s.id)}
          type="button"
          data-subject={s.id}
        >
          <span className="tab__dot" aria-hidden="true" />
          <span className="tab__label">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}

function ArchiveDrawer({ open, onClose, bank, onPick, bookmarks }) {
  // Build entries for the last N days. We only have N questions per subject, but cycle.
  const days = 21;
  const entries = useMemo(() => {
    if (!open) return [];
    const today = daysSinceEpoch();
    const list = [];
    for (let i = 0; i < days; i++) {
      const seed = today - i;
      const dateObj = new Date(Date.now() - i * 86400000);
      list.push({
        seed,
        date: dateObj,
        physics: bank.physics[seed % bank.physics.length],
        chemistry: bank.chemistry[seed % bank.chemistry.length],
        math: bank.math[seed % bank.math.length],
      });
    }
    return list;
  }, [open, bank]);

  const [filter, setFilter] = useState("all");

  const isBookmarked = (subj, id) =>
    (bookmarks || []).some((b) => b.subject === subj && b.id === id);

  return (
    <div className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={onClose} />
      <aside className="drawer__panel" role="dialog" aria-label="Archive">
        <header className="drawer__head">
          <h2 className="drawer__title">Archive</h2>
          <button
            className="iconbtn iconbtn--ghost"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <Icon name="close" size={16} />
          </button>
        </header>
        <div className="drawer__filters">
          {["all", "bookmarked", "physics", "chemistry", "math"].map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? "is-on" : ""}`}
              onClick={() => setFilter(f)}
              type="button"
            >
              {f === "all" ? "All" : f === "bookmarked" ? "Bookmarked" : f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="drawer__body">
          {entries.map((e) => {
            const items = ["physics", "chemistry", "math"]
              .filter((s) => filter === "all" || filter === "bookmarked" || filter === s)
              .map((s) => ({ subject: s, q: e[s] }))
              .filter(({ subject, q }) =>
                filter === "bookmarked" ? isBookmarked(subject, q.id) : true
              );
            if (items.length === 0) return null;
            return (
              <div className="arc-day" key={e.seed}>
                <div className="arc-day__date">
                  {e.date.toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="arc-day__rows">
                  {items.map(({ subject, q }) => (
                    <button
                      key={subject}
                      className="arc-row"
                      data-subject={subject}
                      onClick={() => onPick(subject, e.seed)}
                      type="button"
                    >
                      <span className="arc-row__subj">
                        <span className="arc-row__dot" />
                        {subject[0].toUpperCase() + subject.slice(1)}
                      </span>
                      <span className="arc-row__chapter">{q.chapter}</span>
                      <span className="arc-row__diff">
                        <DifficultyBadge value={q.difficulty} />
                      </span>
                      {isBookmarked(subject, q.id) && (
                        <Icon name="bookmarkFilled" size={14} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

// --- Tweaks defaults block. MUST be a valid JSON literal between the markers. ---
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "variant": "calm"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [stats, recordStat] = useStats();

  // Apply theme + variant as attrs on <html>
  useEffect(() => {
    document.documentElement.dataset.theme = t.theme;
    document.documentElement.dataset.variant = t.variant;
  }, [t.theme, t.variant]);

  const bank = window.QUESTION_BANK;
  const todaySeed = daysSinceEpoch();
  const [seedOffset, setSeedOffset] = useState(0); // archive → past days
  const seed = todaySeed - seedOffset;
  const isToday = seedOffset === 0;

  const [active, setActive] = useState("physics");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [practiceSubject, setPracticeSubject] = useState(null);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [pyqPayload, setPyqPayload] = useState(null);
  const [toast, setToast] = useState({ msg: "", visible: false });
  const toastT = useRef(null);

  // AI question generation
  const [difficulty, setDifficulty] = usePersistedState("daily:difficulty", null);
  const [apiKey, setApiKey] = usePersistedState("daily:apikey", "");
  const [genQ, setGenQ] = useState(null);
  const [genState, setGenState] = useState("idle"); // idle | loading | error

  const streak = useStreak();

  const showToast = (msg) => {
    clearTimeout(toastT.current);
    setToast({ msg, visible: true });
    toastT.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      2200
    );
  };

  // Bookmarks: list of { subject, id }
  const [bookmarks, setBookmarks] = usePersistedState("daily:bookmarks", []);
  const isBookmarked = (subj, id) =>
    bookmarks.some((b) => b.subject === subj && b.id === id);
  const toggleBookmark = (subj, id) => {
    setBookmarks((bm) => {
      if (bm.some((b) => b.subject === subj && b.id === id)) {
        showToast("Bookmark removed");
        return bm.filter((b) => !(b.subject === subj && b.id === id));
      } else {
        showToast("Bookmarked");
        return [...bm, { subject: subj, id }];
      }
    });
  };

  // Static bank question — filtered by difficulty when no API key
  const bankQ = useMemo(() => {
    const qs = bank[active];
    if (difficulty && !apiKey) {
      const filtered = qs.filter((q) => q.difficulty === difficulty);
      if (filtered.length) return filtered[seed % filtered.length];
    }
    return qs[seed % qs.length];
  }, [active, seed, difficulty, apiKey]);

  // AI generation — cache per day+subject+difficulty, skip in archive mode
  const genCacheKey = `gen:${ymd()}:${active}:${difficulty}`;
  useEffect(() => {
    if (!difficulty || !apiKey || !isToday) {
      setGenQ(null);
      setGenState("idle");
      return;
    }
    try {
      const cached = localStorage.getItem(genCacheKey);
      if (cached) { setGenQ(JSON.parse(cached)); setGenState("idle"); return; }
    } catch {}
    setGenQ(null);
    setGenState("loading");
    let cancelled = false;
    generateQuestion(apiKey, active, difficulty)
      .then((q) => {
        if (cancelled) return;
        setGenQ(q);
        setGenState("idle");
        try { localStorage.setItem(genCacheKey, JSON.stringify(q)); } catch {}
      })
      .catch(() => { if (!cancelled) setGenState("error"); });
    return () => { cancelled = true; };
  }, [active, difficulty, apiKey, isToday, genCacheKey]);

  const q = isToday && genQ ? genQ : bankQ;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: "Daily Drill — today's question",
          text: `${q.chapter}: try today's CBSE question`,
          url,
        })
        .catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => showToast("Link copied"));
    } else {
      showToast(url);
    }
  };

  // Storage key isolates per-day per-question session state
  const storageKey = `q:${ymd(new Date(Date.now() - seedOffset * 86400000))}:${active}:${q.id}`;

  return (
    <div className="app">
      <Header
        streak={streak}
        date={prettyDate(new Date(Date.now() - seedOffset * 86400000))}
        onArchiveOpen={() => setArchiveOpen(true)}
        onLeaderboardOpen={() => setLeaderboardOpen(true)}
        onSettingsOpen={() => setSettingsOpen(true)}
      />

      <main className="app__main">
        {!isToday && (
          <div className="banner">
            <span>You're viewing a question from the archive.</span>
            <button
              className="banner__btn"
              onClick={() => setSeedOffset(0)}
              type="button"
            >
              Back to today
            </button>
          </div>
        )}

        <SubjectTabs active={active} onChange={setActive} />

        <DifficultyPicker value={difficulty} onChange={setDifficulty} />

        {genState === "loading" && (
          <div className="gen-banner gen-banner--loading">
            <span className="gen-spinner" aria-hidden="true" />
            <span>Generating your {difficulty?.toLowerCase()} {active} question…</span>
          </div>
        )}
        {genState === "error" && (
          <div className="gen-banner gen-banner--error">
            <Icon name="cross" size={14} />
            <span>Couldn't generate — check your API key in Tweaks. Showing a question from the bank.</span>
          </div>
        )}

        <QuestionCard
          key={`${active}:${q.id}:${seedOffset}`}
          subject={active}
          q={q}
          bookmarked={isBookmarked(active, q.id)}
          onToggleBookmark={() => toggleBookmark(active, q.id)}
          onShare={handleShare}
          onAnswer={recordStat}
          onOpenPYQ={(payload) => setPyqPayload(payload)}
          storageKey={storageKey}
        />

        <SolveMore onPick={(subj) => setPracticeSubject(subj)} />

        <div className="hint-tip">
          New questions appear every day. Come back tomorrow to keep your streak alive.
        </div>
      </main>

      <ArchiveDrawer
        open={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        bank={bank}
        bookmarks={bookmarks}
        onPick={(subj, s) => {
          setActive(subj);
          setSeedOffset(todaySeed - s);
          setArchiveOpen(false);
        }}
      />

      <PracticeDrawer
        open={!!practiceSubject}
        subject={practiceSubject}
        bank={bank}
        onAnswer={recordStat}
        onClose={() => setPracticeSubject(null)}
      />

      <PYQDrawer
        open={!!pyqPayload}
        payload={pyqPayload}
        onClose={() => setPyqPayload(null)}
      />

      <LeaderboardDrawer
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
        stats={stats}
        streak={streak}
        dayKey={ymd()}
      />

      <Toast message={toast.msg} visible={toast.visible} />

      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={t.theme}
        variant={t.variant}
        onTheme={(v) => setTweak("theme", v)}
        onVariant={(v) => setTweak("variant", v)}
        apiKey={apiKey}
        onApiKey={setApiKey}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
