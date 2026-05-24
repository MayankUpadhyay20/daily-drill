# Daily STEM Questions

_Started 2026-05-24 06:04 UTC_

---

## User

Create a website where everyday there will be a random question from physics, Chemistry and mathematics. The questions will be from syllabus of 11 and 12 std CBSE board. There will be hints againts the points. The questions shall also have a full explaination of the concept on which it is bases

## Assistant

_[tool: questions_v2]_

## User

Questions answered:
- audience: Both 11 & 12
- vibe: Modern & clean (minimal, sans, calm colors)
- flow: Tabs for subjects
- hints: Progressive — reveal hint 1, then 2, then 3
- answer_input: Decide for me
- explanation_depth: Decide for me
- extras: Streak counter (daily visits), Bookmark / save question, Difficulty badge (Easy/Med/Hard), Chapter tag, Past questions archive, Share button, Timer for solving
- variations: 2 variations via Tweaks
- tweaks: Theme (light/dark)
- math_rendering: Use LaTeX (MathJax/KaTeX) for proper equations

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: write_file]_

Setting the system: **modern & clean, calm**. Font pairing: **Geist** (sans) + **Instrument Serif** (used in variant B). Palette: warm off-white `#faf9f6` / near-black `#0d0d0e`, with three subject accents at matching oklch chroma — Physics `oklch(0.62 0.13 245)`, Chemistry `oklch(0.62 0.13 155)`, Math `oklch(0.62 0.13 35)`. KaTeX for math. Two tweakable variants: **Calm** (default, sans-only) and **Editorial** (serif headlines, lined paper feel).

Let me build the question bank first.

_[tool: write_file]_

Now the main app. I'll structure it with three files: shell HTML, ui primitives, and the main app.

_[tool: write_file]_

_[tool: write_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

I need to fix the tweaks API usage in app.jsx — `useTweaks` returns an array `[values, setTweak]`, and `TweaksPanel` manages its own open state via the host protocol.

_[tool: write_file]_

Now styles. This is where the visual design lives.

_[tool: write_file]_

_[tool: show_html]_

_[tool: done]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: fork_verifier_agent]_

Looks clean. Let me fork the verifier for a thorough check across themes and variants.Built **Daily Drill** — a daily CBSE Class XI/XII question site with three subjects, progressive hints, full concept explainers, and KaTeX-rendered math.

**What's in it:**
- Date-seeded daily picks per subject from a bank of 18 questions (Physics, Chemistry, Math)
- Progressive hint reveal (3 per question), MCQ with feedback, separate "Reveal solution" and "About this concept" sections
- Streak counter (persisted, auto-increments on consecutive days), bookmarks, share, per-question timer with pause/reset
- Archive drawer showing the last 21 days, filterable by subject or bookmarks
- Tweaks panel: light/dark theme + Calm (sans) vs Editorial (Instrument Serif + lined-paper feel) variants

**System:** Geist + Instrument Serif, warm off-white/near-black palette, three matched-chroma oklch accents — blue for physics, green for chemistry, warm coral for math. Subject color flows through the card's top rule, chapter tag, hint reveal links, and bookmark active state.

**Files:** `index.html`, `app.jsx`, `card.jsx`, `ui.jsx`, `questions.js`, `styles.css`, `tweaks-panel.jsx`.

Possible next steps if you want them: more questions per subject so the archive has real depth (currently 6 per subject, cycling); an "attempt history" view; a typed-answer mode for numeric questions; or a daily reminder email/push.

## User

Keep a notes section
There should be a button to solve more such problems in the bottom end for all three subjects
There should also be related pass year PYQs from Jee Mains for the concept
There should be a leaderboard

## Assistant

_[tool: update_todos]_

Good additions. Let me plan and build them all.

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: write_file]_

Now Practice drawer and Leaderboard — splitting into a separate file to keep app.jsx manageable.

_[tool: str_replace_edit]_

Now wire extras into app.jsx — header leaderboard button, SolveMore CTA, both drawers, stats hook.

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

Now styles for the new sections.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

Some text in buttons is wrapping when it shouldn't. Let me check.

_[tool: str_replace_edit]_

CTAs are wrapping. Fix.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: str_replace_edit]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: grep]_

_[tool: grep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

Leaderboard looks great. Just need to nowrap the filter chips so "All-time" doesn't break.

_[tool: done]_

_[tool: fork_verifier_agent]_

Added all four:

- **Notes section** on every question — collapsible textarea, autosaves per-question, with character count, preview when collapsed, and a Clear option.
- **"Want to solve more?" CTAs** below the daily card — three subject-coloured buttons opening a **Practice drawer** that cycles through more questions from that subject (with progressive hints + show-solution, plus a running attempted/correct/accuracy strip).
- **Related JEE Main PYQs** section inside each question — 1–2 short, era-tagged past-year questions with answer + one-line explanation, kept tightly scoped to the same concept.
- **Leaderboard drawer** (trophy icon in the header) — All-time / This week filters, your row pinned at top with rank, peer rows show solved + streak + accuracy. Standings update from your real local stats.

Stats (correct answers, attempts) are tracked from both the daily card and practice mode and feed into the leaderboard.

## User

PYQs shall open as a new page having the MCQs as well

## Assistant

_[tool: update_todos]_

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: save_screenshot]_

_[tool: eval_js]_

_[tool: get_webview_logs]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: get_webview_logs]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: str_replace_edit]_

That's a real bug — when you switch subject tabs, the previous subject's "picked" answer gets re-attributed to the new subject. The component needs to remount per (subject, question) pair so its per-question state initialises freshly from storage.

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: get_webview_logs]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Fixes shipped:

**Bug fix** — switching tabs no longer attributes a previous subject's pick as an attempt on the new one. The question card now remounts on every (subject, question, date) change, and the answer-tracking ref initialises from the hydrated `picked` value so page reloads don't double-count stored attempts.

**PYQs as a full page** — every PYQ in the bank now has 4 MCQ options and a correct index. Clicking a PYQ summary card under the question opens a dedicated drawer:
- Year badge in the subject accent, session attempt label
- Question rendered with KaTeX
- 4 MCQ options with correct / wrong feedback
- "Show explanation" reveals the answer letter, the option text, and a one-line working
- ← / → pager between the 1–2 PYQs attached to the parent question
- Close + Next PYQ buttons at the bottom

Your existing stats may carry a couple of phantom attempts from before the fix — those will be diluted as you keep solving. Let me know if you'd like a "Reset stats" control surfaced somewhere.

## User

Verifier agent check completed

## Assistant

Verifier confirmed: PYQ drawer opens cleanly with year badge, KaTeX question, lettered MCQ options, and the explanation reveal — and the cross-tab attempt bug is gone. You're good to go.

