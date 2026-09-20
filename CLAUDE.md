# CLAUDE.md — taydenwhite.github.io

Personal portfolio site for **Tayden White**, published at https://taydenwhite.github.io.
Improvement work and the decisions behind it are tracked in [Agent Context/CHECKLIST.md](Agent%20Context/CHECKLIST.md), a local-only, gitignored file. Read it before starting work, and follow its **Decisions log** instead of re-asking settled questions.

## Purpose & audience

- **Audience:** technical recruiters, hiring managers, and engineers screening a CS candidate. Assume a 30–90 second skim, often on a phone.
- **Positioning:** software engineering + ML/AI engineering + research. Tayden graduates in May 2027 and is open to full-time roles starting summer 2027.
- **Quality bar:** every reachable page has real content. No placeholders, "coming soon" text, empty sections, typos, or facts that contradict the resume. Unfinished pages get `draft: true`.

## Source of truth: the resume

The canonical resume is **`Agent Context/Tayden White - Resume 7_27_26 (5).pdf`**, published as `static/resume.pdf`. Its facts are encoded in **`data/profile.yaml`**, **`data/experience.yaml`**, and **`data/skills.yaml`**, which feed every template. When the resume changes, update the PDF, those data files, and any write-up that quotes a number. Never invent metrics, dates, titles, links, or claims. If something isn't in the resume, on the site, or in Tayden's public GitHub, ask.

Key facts (July 2026 resume):
- Purdue University, Aug 2023 – May 2027. Dual degrees in CS & Mathematical Economics. GPA 3.85, Dean's List & Semester Honors (6x). Coursework: DS&A, Data Mining & ML, Game Theory, Econometrics.
- **Communication and Cognition Lab @ Purdue** (Mar 2026 – present, lab site https://web.ics.purdue.edu/~treimer/): Streamlit app where 1 human + 2–3 LLMs deliberate over three Hidden Profile Paradigm tasks; OpenAI-API extraction pipeline over ~2000 HPP discussions, hand-coding comparative accuracy 60% → 99%; contributions in three forthcoming papers and a book chapter.
- **Dept. of Mathematics @ Purdue** (May–Aug 2025, May 2026 – present, with Prof. Colleen Delaney): resolved edge cases in the permutation-defect fusion algorithm (revised rules for a future publication); contributed Deligne product and defect fusion to an open-source Julia fusion-rings package. No verified repo link yet, so don't link one.
- **J&J Innovative Medicine** Software Engineer Co-op (Aug–Dec 2025): FDA compliance analytics pipeline supporting 60k+ records in static Hugo dashboards, builds ~30 → ~5 min; agentic text-to-SQL decomposing questions into parallel queries across Delta tables.
- **J&J** Data Science Intern (May–Aug 2024): refactored an internal ML R package into modules (200+ lines of duplicated logic removed); led an intern Hugo + GitHub Pages initiative, with tutorials that taught 20+ coworkers.
- Projects: The Future of AI at Purdue (Fall 2023; survey + paper; presented to 60+ at Purdue's Undergraduate Research Exposition); Multithreaded Client-Server Marketplace (Java/Swing/TCP, 5-person team, 150+ commits, 15+ E2E scenarios); Unix Shell (C/C++, Lex/Yacc).
- The Unix Shell and Marketplace are **Purdue course projects**: write-ups only, never link or publish source.
- J&J work is internal: keep it at the resume's level of detail.
- The phone number is intentionally **not** on the site (it stays on the PDF).

## Tech stack

- **Hugo 0.150.0 extended** (CI and local), custom theme in `layouts/`, no Hugo modules, no Node.js. The new template layout (≥ 0.146) uses `_partials/`, `_shortcodes/`, `_markup/`, `home.html`, `section.html`, and `page.html`.
- **CSS:** `assets/css/main.css` (design tokens + components) and `assets/css/syntax.css` (generated Chroma light/dark styles), concatenated, minified, and fingerprinted in `_partials/head.html`. Fonts are Inter and JetBrains Mono from Google Fonts.
- **JS:** `assets/js/main.js` (theme toggle, mobile nav, card filters, YouTube click-to-load) and `assets/js/pong.js`, bundled with `js.Build`.
- **Deploy:** `.github/workflows/hugo.yaml` builds, runs **htmltest** (`.htmltest.yml`, internal links only), and deploys to GitHub Pages on push to `main`. Pull requests build and check without deploying.
- **Git:** pushing to `main` deploys the live site, so do larger changes on a branch and merge only with Tayden's OK. The `site-overhaul` redesign was merged on 2026-09-17.

```bash
hugo server                      # http://localhost:1313
hugo --gc --minify && htmltest   # production build + link check (go install github.com/wjdp/htmltest@v0.17.0)
```

## Design system

- Palette (chosen by Tayden): **brand green `#768e6f`** with **pink `#f095d1` accents**. Text-sized colors use AA-safe variants: `--brand-strong` `#4d6746` (light) / `#a3bb9b` (dark), buttons `#5a7552` with white text (light) / `#8fa888` with dark text (dark), and `--pink-strong` `#a8387a` for small pink text. All colors are CSS custom properties with light values on `:root`, dark values under `prefers-color-scheme` and `[data-theme="dark"]`.
- The **soccer-ball logo** (`assets/icons/logo.svg`) stays as-is by Tayden's choice. Favicons in `static/favicons/` and `static/favicon.ico` are generated from it.
- Components: `.card`, `.chip` / `.chip--tag`, `.timeline` / `.xp`, `.panel`, `.metrics`, `.flow` (process diagram), `.callout`, `.media` (16:9 embeds), `.pdf`, `.cta`, `.btn--primary|secondary|ghost`.
- **No inline styles** in content or templates. Add classes to `main.css` and use tokens so both themes work.

## Content model (`content/`)

| Path | URL | Notes |
|---|---|---|
| `_index.md` | `/` | Rendered by `layouts/home.html` entirely from `data/` + pages with `featured:` |
| `projects/` | `/projects/` | Card grid with topic filters (`filters: true`). Pages: `terminal-chef` (playable embed), `jnj-compliance-dashboards`, `unix-shell`, `multithreaded-marketplace`, `hugo-website-tutorials/` (section with 4 tutorial pages), `rubiks-cube-listener` (**draft**) |
| `research/` | `/research/` | `llm-transcript-coding`, `permutation-defects/` (section with 5 PDF report pages + expo video), `future-of-ai-at-purdue` |
| `experience/index.md` | `/experience/` | `type: experience`, timeline from `data/experience.yaml`; holds the J&J wrap-up video resource |
| `about/index.md` | `/about/` | `type: about`, bio + education + skills + `beyond:` cards (speedcubing, lists, playground) |
| `resume/index.md` | `/resume/` | `type: resume`, embeds `/resume.pdf` with download buttons |
| `playground/` | `/playground/` | Fun projects: one-line tic-tac-toe, Pong (linked from About only) |
| `lists/` | `/lists/` | Books / Movies / Shows tables from published Google Sheets CSVs (linked from About only) |
| `blogs/` | — | **All drafts.** Returns as "Writing" once there are 2+ real posts |

**Case-study front matter** (any page with `summary:` renders via `_partials/case-study.html`): `title, summary, description, org | kicker, orgUrl, role, dates, date, weight, featured, team, stack[], tags[], metrics[{value,label}], links[{label,url}], cover, coverAlt, coverCaption, childrenTitle, note, aliases[]`. Simple pages use `title, description, weight, wide`.

**Terminal Chef embed:** `assets/games/terminal-chef/terminal_chef/` is vendored unmodified from [TaydenWhite/terminal-chef](https://github.com/TaydenWhite/terminal-chef) by `scripts/update-terminal-chef.sh`, which pins the commit in `data/terminal_chef.yaml`. `browser_main.py` (written for this site) reproduces the game's blocking menu loop as a state machine, and `assets/js/terminal-chef.js` loads Pyodide + xterm.js on click, writes the package into Pyodide's filesystem, and feeds it keypresses. Never edit the vendored `terminal_chef/` files here; change them upstream and re-run the script. Hugo's `.Name` on an asset resource has a leading slash, which the shortcode trims when building the file manifest.

**Shortcodes:** `embed-pdf file= title=`, `embed-video file=` (both fail the build if the file is missing), `youtube id= title=` (click-to-load), `flow "step" "step" …` (positional only; Markdown allowed), `callout` (block), `pong`, `terminal-chef` (playable Python game), `searchable-table id= csvFile=` (Tabulator + PapaParse from jsDelivr with SRI), `rubiks-listener apiUrl=`.

**Taxonomy:** a single `tags` taxonomy (Data, Leadership, Machine Learning, Mathematics, Research, Systems, Web). Keep the vocabulary small.

**Old URLs:** every pre-redesign URL (`/about-me/…`, `/projects/fusion-of-permutation-defects/…`, `/projects/website/…`, etc.) has an `aliases:` redirect. Keep them.

## Known gaps (waiting on Tayden)

- **Deferred; remind Tayden every session until done:** YouTube links for `research/permutation-defects/research-expo-video.mp4` (91 MB) and `experience/internship-wrap-up.mp4` (78 MB) → swap to `youtube` embeds (`video.youtube:` in `data/experience.yaml`), delete the MP4s, then purge them from git history (force-push needs explicit confirmation).
- **Deferred; remind Tayden every session until done:** GoatCounter site code → `params.goatcounter` in `hugo.yaml`.
- Future of AI paper/poster → embed on `research/future-of-ai-at-purdue/`. `Agent Context/` holds `Research Poster Bigger Font.key` and `White, T. Evidence-Based Argumentative Essay (1).pdf`; confirm with Tayden before publishing either.
- Julia fusion-rings contribution link (no commits by TaydenWhite found in `anyonwiki/FusionRings`).
- GitHub profile has no pinned repos.

## Working rules for Claude in this repo

1. **Resume parity first.** Facts come from `data/*.yaml`, which must match the resume PDF.
2. **No placeholders ship.** Use `draft: true` for anything unfinished.
3. **Don't invent.** No fabricated numbers, links, dates, motivations, or technical details beyond what the resume, the site, the research PDFs, or Tayden's public repos support.
4. **Styles belong in `assets/css/main.css`** with design tokens. Test light mode, dark mode, and a 390px viewport. Headless Chrome clamps narrow windows, so screenshot mobile inside a 390px iframe.
5. **Links:** use `relURL` / root-relative paths in templates, and add `aliases` when moving pages.
6. **Media:** no new videos in git. Put images in page bundles or `assets/images/` and render them through `_partials/image.html` (WebP srcset).
7. **Verify** with `hugo --gc --minify` and `htmltest` before committing.
8. **Tone:** professional first person, concise, impact-first. Personal content stays in About → Beyond code.
