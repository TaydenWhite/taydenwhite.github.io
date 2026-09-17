# CLAUDE.md — taydenwhite.github.io

Personal portfolio site for **Tayden White**, published at https://taydenwhite.github.io.
Improvement work is tracked in [Agent Context/CHECKLIST.md](Agent%20Context/CHECKLIST.md). Read it before starting work and tick items off as they ship.

## Purpose & audience

- **Audience:** technical recruiters, hiring managers, and engineers screening a CS candidate. Assume a 30–90 second skim, often on a phone.
- **Goal:** show strong SWE / ML / research ability fast. The site must look finished and modern, with no placeholder pages, empty sections, filler text, typos, or facts that contradict the resume.
- **Quality bar:** every page a recruiter can reach must have real content. If a section isn't ready, keep it out of the build (`draft: true` or delete it). Never ship "coming soon".

## Source of truth: the resume

The canonical résumé is **`Agent Context/Tayden White - Resume 7_27_26 (5).pdf`**. When site content disagrees with it, the resume wins. Never invent metrics, dates, titles, or claims. If a detail isn't in the resume or already on the site, ask Tayden.

Canonical facts as of the 7/27/26 resume:

- **Contact:** tayden.white@gmail.com · linkedin.com/in/tayden-white/ · github.com/TaydenWhite · taydenwhite.github.io
- **Education:** Purdue University, West Lafayette, IN, Aug 2023 – May 2027. Dual degrees in **Computer Science & Mathematical Economics**. **GPA 3.85**, Dean's List & Semester Honors (**6x**). Relevant coursework: Data Structures & Algorithms, Data Mining & Machine Learning, Game Theory, Econometrics. (As of fall 2026 he is a **senior**, class of 2027.)
- **Research: Communication and Cognition Lab @ Purdue** (Mar 2026 – Current)
  - Full-stack Python/Streamlit web app for an experiment where one human and 2–3 LLMs deliberate over three Hidden Profile Paradigm (HPP) group decision-making tasks
  - LLM extraction pipeline (OpenAI API) that classifies information-sharing events across ~2000 HPP discussions; hand-coding comparative accuracy went from 60% to 99%
  - Contributions appearing in three forthcoming papers and a book chapter
- **Research: Department of Mathematics @ Purdue** (May 2025 – Aug 2025 | May 2026 – Current). Advisor on site: Professor Colleen Delaney.
  - Diagnosed and resolved edge cases in a fusion algorithm for "permutation defects" (quasiparticles that can encode qubits in topological quantum computing), producing revised rules for a future publication
  - Contributed core fusion-ring operations (Deligne product, defect fusion) to an open-source Julia package implementing Fusion Rings
- **Johnson & Johnson – Innovative Medicine**, Raritan, NJ
  - *Software Engineer Co-op* (Aug 2025 – Dec 2025): optimized an FDA compliance analytics pipeline to support 60k+ records in static Hugo dashboards (build ~30 min → ~5 min); designed an agentic text-to-SQL workflow that decomposes natural-language questions into parallel queries across Delta tables backing Hugo sites
  - *Data Science Intern* (May 2024 – Aug 2024): refactored an internal "generic" ML R package into modular components (removed 200+ lines of duplicated logic, so downstream teams can extend it without forking); led an intern initiative to build and deploy Hugo + GitHub Pages sites, with tutorial docs that taught 20+ coworkers
- **Projects**
  - *The Future of AI at Purdue* (Python, pandas, matplotlib): surveyed Purdue administrators on classroom AI policy and benchmarked sentiment against peer institutions; authored a paper; presented to 60+ faculty and students at Purdue's Undergraduate Research Exposition
  - *Multithreaded Client-Server Marketplace App* (Java, Swing, TCP sockets): custom TCP protocol, thread-per-client, 1,000-line Swing GUI (auth, storefronts, search, cart, order history); 5-person team, 150+ commits, 15+ scenario E2E test plan
  - *Unix Shell* (C/C++, Lex, Yacc, Linux): parses commands into an executable AST; fork/exec, pipes, fd redirection, signal handling, subshells, wildcard expansion
- **Skills**
  - Languages: Python, C/C++, Java, JavaScript/TypeScript, SQL (PostgreSQL), R, Julia, x86-64 Assembly, Bash
  - ML & Data: PyTorch, scikit-learn, pandas, NumPy, PySpark, matplotlib, OpenAI API, Databricks/Delta Lake
  - Frameworks & Tools: Streamlit, Django, React, WebSockets, Hugo, Git, GitHub Actions, Docker, AWS, Linux, LaTeX

Sensitivity notes:
- The Marketplace app and Unix Shell are most likely Purdue course projects (CS 180 / CS 252 style). Purdue academic-integrity policy usually forbids public source code. Present them as write-ups and demos, and don't link public repos without Tayden's confirmation.
- J&J work is internal. Describe it at the resume's level of detail. No internal names, screenshots, or data beyond what is already public on the site or resume.

## Tech stack

- **Generator:** Hugo (extended), content in Markdown/HTML
- **Theme:** Google **Docsy v0.10.0**, imported as a Hugo Module (`go.mod`, `hugo.yaml` → `module.imports`). Docsy is a *documentation* theme, which is why pages have a left sidebar, breadcrumbs, and a docs feel.
- **Styling:** Docsy's Bootstrap 5 SCSS pipeline plus PostCSS/autoprefixer. The only project override that's loaded is `assets/scss/_variables_project.scss` (pink `$primary: #f095d1`, Georgia font). Most real styling is **inline `<style>` blocks and inline `style=""` attributes inside content Markdown files**.
- **Deploy:** GitHub Actions, `.github/workflows/hugo.yaml`, on push to `main`. The workflow pins Hugo **0.127.0**, runs `npm install --save-dev docsy`, then `hugo --gc --minify --baseURL <pages url>`, and deploys to GitHub Pages.
- **Remotes:** `origin` = TaydenWhite/taydenwhite.github.io. `upstream` = AaryaDani/aaryadani.github.io (the site was originally forked from a coworker's Docsy site).

### Local development

```bash
npm install          # required: provides postcss/autoprefixer. Without it the build fails with
                     # "POSTCSS: failed to transform scss/main.css ... binary with name postcss not found"
hugo server          # http://localhost:1313
```

- Local Hugo is **0.150.0** (Homebrew), CI is **0.127.0**, and `package.json` pins `hugo-extended` 0.129.0. Versions are inconsistent, so verify changes build in CI, or pin one version everywhere.
- Hugo's first build needs network access to fetch the Docsy module (cached in `~/Library/Caches/hugo_cache`).
- Before calling a change done, run a full `hugo` build to a scratch destination (`hugo --destination <tmp>`) and check for errors.

## Configuration files: what's live and what's dead

| File | Status |
|---|---|
| `hugo.yaml` | **Live config.** Hugo reads `hugo.*` before `config.*`. |
| `config.toml` | Dead. Stale default ("My New Hugo Site", audio/MP3 menu, `customCSS`). Ignored. |
| `config.yaml` | Dead. Docsy's "test config", with invalid TOML appended to YAML. Ignored. |
| `hugo-disabled.toml` | Dead. Original Docsy example config (Norwegian/Farsi languages, example links). |
| `assets/css/custom.css`, `static/css/custom.css` | **Not loaded anywhere.** Identical duplicates. Their classes (`.btn-social`, `.home-section--blue`, …) have no effect. |
| `assets/scss/variables project after bs.scss` | Dead. Filename doesn't match Docsy's hook (`_styles_project.scss`). |
| `layouts/_default/single.html` | Empty file (Hugo reports it unused). |
| `assets/icons/logo.svg` | Navbar logo: currently a **soccer ball** graphic. `old.svg`, `old2.svg`, `old3.svg` unused. |
| `static/favicons/` | Missing, so the site serves **Docsy's default favicons**. |
| `netlify.toml`, `Dockerfile`, `docker-compose.yaml`, `docsy.work*`, `CONTRIBUTING.md`, `LICENSE`, `README.md` | Unmodified Docsy-example boilerplate. The README still describes "Docsy Example". |
| `package.json` / `go.mod` | Still named `docsy-example-site` / `github.com/google/docsy-example`. The `postcss` script points at a Windows path. |
| `.github/dependabot.yml` | Includes a `bundler` ecosystem, but the repo has no Gemfile. |
| `INTEGRATION_GUIDE.md`, `REACT_INTEGRATION_INSTRUCTIONS.md` | Notes for the Rubik's listener React bundle. Belong in docs, not the repo root. |
| `hugo-server.log`, `.DS_Store` files | Committed junk. |
| `Agent Context/` | Untracked and **not** gitignored. Holds the resume, this project's checklist, and an empty `CLAUDE.md` (unused; this root file is canonical). |

Key `hugo.yaml` values: `baseURL: https://example.docsy.dev` (overridden in CI); site `title: Home` (so the browser tab and `og:site_name` read "Home"); `description: Tayden White's Website!`; `showLightDarkModeMenu: true` (the dark-mode toggle is live); `params.main_menu.hide: ["blogs"]`; `privacy_policy` points to Google's privacy policy (footer link); `copyright.from_year: 2024`; `offlineSearch: false`; `enableGitInfo: true`.

## Custom layouts & shortcodes

- `layouts/shortcodes/embed-pdf.html`: `{{< embed-pdf file="x.pdf" height="880" >}}` renders a PDF **page resource** in an iframe plus an "Open PDF in new tab" link. Falls back to "PDF coming soon." if the file is missing.
- `layouts/shortcodes/embed-video.html`: `{{< embed-video file="x.mp4" poster="..." >}}` renders a 16:9 `<video>` for a **page resource**. Falls back to "Video coming soon."
- `layouts/shortcodes/searchable-table.html`: loads a published Google Sheets CSV with PapaParse and Tabulator (from jsDelivr/unpkg) into a paginated, filterable table. Known issues: invalid inline CSS (`height: 600; width: 900;` without units), a 404 stylesheet reference (`css/tabulator-custom-style.css`), and a leftover `console.log`.
- `layouts/shortcodes/rubiks-listener.html`: mounts a prebuilt React bundle (`static/js/rubiks-listener.{js,css}`, 232 KB) that opens a Socket.io connection to `apiUrl` (https://rubiks-cube-listener.onrender.com). The backend returned **HTTP 503** on 2026-09-17, and it streams "tweets", so it depends on the X/Twitter API.
- `layouts/_default/_markup/render-heading.html`: headings with self-link anchors.
- `layouts/404.html`: still contains Hugo's tutorial sentence ("You can learn how to make a 404 page like this…").
- `static/pong.html`, `static/js/pong.js`, `static/css/pong.css`: a standalone Pong game at `/pong.html`. Not linked from anywhere.

## Content model (`content/en/`)

Hugo turns directory names into URL slugs: lowercase, spaces → `-`, `&` and `'` dropped. For example `J&J Internship Wrap-up` → `/projects/jj-internship-wrap-up/` and `Build & Deploy Tutorial.md` → `/projects/website/build--deploy-tutorial/`. Folders with `index.md` or `_index.md` are **page bundles**: PDFs and MP4s placed next to them are page resources, which the embed shortcodes rely on. Almost every section sets `cascade: type: docs`, so everything renders with Docsy's docs layout (sidebar + breadcrumbs).

**Navbar:** About Me (weight 20), Projects (weight 50), light/dark toggle. Resume, Blogs, and contact are **not** in the navbar.
**Footer:** "© 2024–2025 Tayden White All Rights Reserved · Privacy Policy" (the Google link). No social or contact links.

Status key: ✅ real content · ⚠️ content exists but outdated or flawed · ❌ placeholder or empty

### Home: `/` → `_index.md` ⚠️
- Docsy `blocks/cover` hero with the background image `content/en/home-background.jpg`. Title "Tayden White". The lead paragraph explains the site was built during the J&J internship (it's not a value proposition). LinkedIn and GitHub round buttons. No email, resume, or CTA.
- Includes a `<head><style>` block inside the Markdown body (invalid HTML), with YouTube-red `.btn-social` defaults.
- Four alternating cards with inline styles, `onmouseover` JS, and background images `section-grey.png` / `section-blue.png`:
  1. **About Me**: `about_me.jpg`. Says "Junior", "Computer Science and Economics". **Outdated.**
  2. **Undergraduate Research**: `braiding_anyons.png`. Permutation-defect work. The "Purdue's Summer Undergraduate Research Exposition" link points back to the project page.
  3. **Johnson & Johnson**: `jnj.png`. Says "reducing … by over 1,000 lines", a web-form automation script, and "I work part-time as a full stack developer" (**stale**; the co-op ended Dec 2025, and the resume says 200+ lines).
  4. **Personal Projects**: `future_ai.jpg` (3.4 MB, 4032×3024). The Future of AI study. Links to `/projects/`, which has **no Future of AI page**. Typos: "other other", "environement".
- All links are hardcoded absolute `https://taydenwhite.github.io/...` URLs, so they leave localhost during dev.

### About Me: `/about-me/` → `About Me/_index.md` ⚠️
- A fully inline-styled dark "contact module" (hardcoded `#2d3748`, which clashes with the light theme) with photo, email, phone, and LinkedIn. **Typo: a stray "docu" after the email.**
- Education block: **GPA 3.9, honors 3x, coursework includes "Systems Programming"**, all out of date vs. the resume.
- "Work Experience" grid with 3 cards:
  - J&J Software Engineer, **"Aug 2025 – Present"**, describes Jenkins/AWS and "one million documents into GenAI" (doesn't match the resume)
  - Undergraduate Research Assistant, May–Aug 2025 (omits the 2026 return, the Julia package, and the lab)
  - J&J **"Software Engineering Intern"** 2024 (resume: *Data Science Intern*), "Decreased the size of the R package by 25%", web-form automation script
- Missing: Communication & Cognition Lab, Skills, Projects summary, bio narrative.
- **Resume** `/about-me/resume/` → `About Me/Resume/index.md` ⚠️: embeds `TW - Resume 11_20_25.pdf` (**outdated**; the newest is 7/27/26). An older `Tayden White Resume 10_28_25.pdf` also sits in the bundle unused.
- **Lifetime Lists** `/about-me/lifetime-lists/` ✅/⚠️: Books, Movies, Shows. Each is a `searchable-table` fed by Google Sheets CSVs. The section index has no body, a placeholder date (2017-01-05), and the description "Tracking my lifetime counts (starting at 19)". Personal and non-professional; tables depend on third-party CDNs.

### Projects: `/projects/` → `Projects/_index.md` ⚠️
Index body is empty. Docsy auto-lists children. Description: "Throughout my time at Purdue, J&J, and even highschool…". Sidebar order and status:

| Page | URL | Status | Notes |
|---|---|---|---|
| An Efficient Algorithm for the Fusion of Permutation Defects | `/projects/fusion-of-permutation-defects/` | ✅/⚠️ | Intro text + a **91 MB** self-hosted MP4 (research-expo video). Front matter date 2024-01-01 is wrong (the work was 2025). Typo "Dr. Delaneys". Sub-pages each embed a PDF: Intro to Permutation Defects (report-1), Modeling Fusion with Rings (report-2), Fusion Ring Operations (report-3), Fusion Rules in n = 4, Fusion Example. No mention of the 2026 return or the Julia package. |
| Hugo Optimization | `/projects/hugo-optimization/` | ❌ | Literal placeholder text ("Temporary content…", "this placeholder keeps the section visible"). Probably meant to cover the J&J 30→5 min build work. |
| Purdue Pickup | `/projects/purdue-pickup/` | ❌ | Literal placeholder ("Placeholder overview…"). Not on the resume; scope unknown. |
| Rubik's Cubing | `/projects/rubiks-cubing/` | ❌ | Placeholder copy ("Draft landing page…", "this filler") + live stream widget whose backend returns 503. |
| Website Tutorials | `/projects/website/` | ✅/⚠️ | Leadership evidence from the 2024 internship. Children: Build & Deploy Tutorial (YouTube + steps + YAML; "Step 1/2" in bold but "Step 3" as H2; `hugo server` not in a code block), Hugo, Docsy, & GitHub (a single YouTube embed, no text), Simple Markdown (Markdown cheat sheet; typo "Nexted"), Content Customization (2 YouTube embeds). Fixed-width 560px iframes aren't responsive. Placeholder dates of 2017-01-05. |
| Tic-Tac-Toe | `/projects/tic-tac-toe/` | ⚠️ | Index has a description only. **In One Line!**: a one-line Python lambda game (mentions "CS/DS classes at Stanford"; needs `win.txt`, which isn't shown). **Using Game Trees**: ❌ **empty body**. |
| J&J Internship Wrap-up | `/projects/jj-internship-wrap-up/` | ✅/⚠️ | **78 MB** self-hosted wrap-up video + one sentence. |

Not represented anywhere on the site: **Communication & Cognition Lab (LLM pipeline, Streamlit app), Julia Fusion Rings package, J&J text-to-SQL agent, Multithreaded Marketplace, Unix Shell, a Future of AI project page, and Skills.**

### Blogs: `/blogs/` → `Blogs/_index.md` ❌ (hidden from the navbar but built, reachable, and in the sitemap)
- Description: "I love to talk about myself, here are some of my blog series:"
- **My Time at Johnson & Jonhson** (typo in title): *Agile Project Management* is ❌ a single line ("Agile Project Management, what is it?"). *Eisenhower Method* is ✅ a short generic explainer with an image and empty `resources` front matter.
- **Fitness Journey**: ❌ empty ("Follow my journey towards a 225 bench max…").
- **Thoughts on Stuff**: ❌ empty.

### Taxonomies
`/tags/` and `/categories/` are generated but empty. No page sets tags or categories.

## Static assets (`static/`)

- Images in use: `about_me.jpg` (724×874), `braiding_anyons.png`, `jnj.png` (1.2 MB), `future_ai.jpg` (**3.4 MB**), `home-background.jpg`, `section-blue.png`, `section-grey.png`, `section-white.png` (CSS only, unloaded), `Eisenhower-Matrix.png`
- Unused: `Carvykti.png`, `Graph1.png`, `Graph2.png`, `videos/my-video.mp4` (**62 MB**), `videos/Adding Content Pages.mp4` (11 MB), `pong.html`
- The `.git` directory is **~302 MB**, mostly committed videos. GitHub warns on files over 50 MB and rejects files over 100 MB; the 91 MB research video is close to that limit.

## Live-site observations (checked 2026-09-17)

- `<title>` on the home page is "Home", and other pages are "<Page> | Home". `og:site_name` is "Home". There's no `og:image`. `og:description` is the raw home-page text dump.
- `robots.txt` contains only `User-agent: *`, with no sitemap line. `sitemap.xml` exists.
- Favicons are Docsy defaults. The custom 404 renders with tutorial text.
- Dark mode can be toggled, but inline hardcoded colors on Home and About don't adapt.
- The Rubik's listener backend at `rubiks-cube-listener.onrender.com` returned 503.

## Working rules for Claude in this repo

1. **Resume parity first.** Every fact must match the canonical resume above. When the resume changes, update this file's facts section and the site together, and replace the PDF under the Resume bundle.
2. **No placeholders ship.** Don't add "coming soon", lorem ipsum, TODO text, empty pages, or broken widgets. Use `draft: true` for unfinished work.
3. **Don't invent.** No fabricated metrics, links, repos, dates, testimonials, or publications. Ask Tayden when information is missing (repo URLs, demo links, screenshots, paper titles).
4. **Styles belong in stylesheets.** Put new CSS in `assets/scss/_styles_project.scss` (Docsy hook) or the site's own SCSS if Docsy is replaced. Don't add inline `<style>` blocks or `style=""` in content files. Use theme variables/CSS custom properties so light and dark modes both work.
5. **Relative links.** Use `relref`/`relURL` or root-relative paths, not hardcoded `https://taydenwhite.github.io/...`.
6. **Media hygiene.** Don't commit videos. Host them on YouTube (unlisted is fine) and embed them responsively. Resize and compress images (WebP/AVIF, ≤ ~300 KB for photos) or use Hugo image processing.
7. **Verify.** Run a full Hugo build after changes. Check the page in light mode, dark mode, and at 375px width.
8. **Tone.** Professional first person, confident, concise, and results-focused (lead with impact and numbers). Keep personality pieces (cubing, lists, fitness) in a clearly secondary "Beyond Code" area.
9. **Sensitive content.** Follow the course-project and J&J confidentiality notes above. Think twice before publishing the phone number.
