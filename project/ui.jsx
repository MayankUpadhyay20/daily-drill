// UI primitives + small components — shared across the app
// Exposes: TeX, Icon, Badge, ChipButton, OptionButton, Collapse, formatDuration

/* global React */

const { useRef, useEffect, useState } = React;

// --- KaTeX-rendered text. Accepts a string with $..$ and $$..$$ delimiters. ---
function TeX({ children, as = "span", className = "", block = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.renderMathInElement) return;
    try {
      window.renderMathInElement(ref.current, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
        trust: false,
      });
    } catch (e) {
      /* swallow */
    }
  }, [children]);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`tex ${block ? "tex--block" : ""} ${className}`}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}

// --- Inline SVG icons. Minimal set, 1.5 stroke, 20×20 viewBox by default. ---
const ICONS = {
  flame: (
    <path
      d="M10 17.5c2.8 0 5-2.1 5-4.7 0-2-1.2-3.2-2.2-4.6-1-1.4-1.8-2.7-1.8-4.7-1.5 1-3.5 2.6-3.5 5 0 1.2.4 2 .7 2.6-1.5-.4-2.4-1.7-2.4-3.2-1 1-1.8 2.5-1.8 4.4 0 2.7 2.3 5.2 6 5.2Z"
      strokeLinejoin="round"
    />
  ),
  bookmark: <path d="M5 3v14l5-3 5 3V3H5Z" strokeLinejoin="round" />,
  bookmarkFilled: (
    <path
      d="M5 3v14l5-3 5 3V3H5Z"
      strokeLinejoin="round"
      fill="currentColor"
    />
  ),
  share: (
    <g strokeLinecap="round" strokeLinejoin="round">
      <circle cx="15" cy="4.5" r="2" />
      <circle cx="5" cy="10" r="2" />
      <circle cx="15" cy="15.5" r="2" />
      <path d="m6.8 9.1 6.5-3.5M6.8 10.9l6.5 3.5" />
    </g>
  ),
  sun: (
    <g strokeLinecap="round">
      <circle cx="10" cy="10" r="3.2" />
      <path d="M10 2v1.5M10 16.5V18M3.5 3.5l1 1M15.5 15.5l1 1M2 10h1.5M16.5 10H18M3.5 16.5l1-1M15.5 4.5l1-1" />
    </g>
  ),
  moon: (
    <path
      d="M16 11.5A6.5 6.5 0 1 1 8.5 4a5.5 5.5 0 0 0 7.5 7.5Z"
      strokeLinejoin="round"
    />
  ),
  sliders: (
    <g strokeLinecap="round">
      <path d="M3 5h8M14 5h3M3 10h3M9 10h8M3 15h11M17 15h0.01" />
      <circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="7" cy="10" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.4" fill="currentColor" stroke="none" />
    </g>
  ),
  archive: (
    <g strokeLinejoin="round">
      <rect x="3" y="4" width="14" height="3" rx="0.5" />
      <path d="M4 7v9h12V7M8 10h4" />
    </g>
  ),
  close: <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />,
  check: <path d="m4 10 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />,
  cross: <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />,
  lightbulb: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M7 13a4 4 0 1 1 6 0c-.5.5-.8 1-.8 1.6V15H7.8v-.4c0-.6-.3-1.1-.8-1.6Z" />
      <path d="M8.5 17h3" />
    </g>
  ),
  chevron: (
    <path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  play: <path d="M6 4v12l9-6-9-6Z" strokeLinejoin="round" />,
  pause: <path d="M6 4h3v12H6zM11 4h3v12h-3z" />,
  reset: (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 10a6.5 6.5 0 1 0 1.9-4.6" />
      <path d="M3.5 4v3.5H7" />
    </g>
  ),
};

function Icon({ name, size = 18, className = "", strokeWidth = 1.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={`icon ${className}`}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

// --- Difficulty pill ---
function DifficultyBadge({ value }) {
  const map = {
    Easy: { dots: 1, tone: "easy" },
    Medium: { dots: 2, tone: "med" },
    Hard: { dots: 3, tone: "hard" },
  };
  const { dots, tone } = map[value] || map.Medium;
  return (
    <span className={`diff diff--${tone}`}>
      <span className="diff__dots">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`diff__dot ${i <= dots ? "is-on" : ""}`}
          />
        ))}
      </span>
      <span className="diff__label">{value}</span>
    </span>
  );
}

// --- Tag chip (chapter, class, etc.) ---
function Tag({ children, className = "" }) {
  return <span className={`tag ${className}`}>{children}</span>;
}

// --- MCQ option button ---
function OptionButton({ label, content, state, onClick, disabled }) {
  // state: 'idle' | 'selected' | 'correct' | 'wrong' | 'revealed'
  return (
    <button
      className={`opt opt--${state}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <span className="opt__label">{label}</span>
      <TeX className="opt__content">{content}</TeX>
      <span className="opt__mark" aria-hidden="true">
        {state === "correct" && <Icon name="check" size={16} />}
        {state === "wrong" && <Icon name="cross" size={16} />}
      </span>
    </button>
  );
}

// --- Collapse with smooth animation using max-height ---
function Collapse({ open, children, className = "" }) {
  const ref = useRef(null);
  const [h, setH] = useState(open ? "none" : 0);

  useEffect(() => {
    if (!ref.current) return;
    if (open) {
      const next = ref.current.scrollHeight;
      setH(next);
      const t = setTimeout(() => setH("none"), 320);
      return () => clearTimeout(t);
    } else {
      // fix to current height then animate to 0
      const cur = ref.current.scrollHeight;
      setH(cur);
      // force reflow
      void ref.current.offsetHeight;
      requestAnimationFrame(() => setH(0));
    }
  }, [open]);

  return (
    <div
      ref={ref}
      className={`collapse ${className}`}
      style={{
        maxHeight: h === "none" ? "none" : `${h}px`,
        overflow: h === "none" ? "visible" : "hidden",
      }}
      aria-hidden={!open}
    >
      {children}
    </div>
  );
}

// --- Format seconds as M:SS ---
function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// --- Hook: persistent state via localStorage ---
function usePersistedState(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return initial;
      return JSON.parse(raw);
    } catch (e) {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }, [key, val]);
  return [val, setVal];
}

// --- Toast (very small) ---
function Toast({ message, visible }) {
  return (
    <div className={`toast ${visible ? "is-visible" : ""}`} role="status">
      {message}
    </div>
  );
}

Object.assign(window, {
  TeX,
  Icon,
  DifficultyBadge,
  Tag,
  OptionButton,
  Collapse,
  Toast,
  formatDuration,
  usePersistedState,
});
