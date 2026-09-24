# Todos

## Fix horizontal centering — last 2 Problems slides

- [x] **Root cause:** In `src/components/Problems.jsx`, the `soundFamiliar` and `cta` slides rendered a full-width `<p>` inside the AnimatedSlide parent layer. Only the text inside was centered (`text-align`); the text *group* box itself was not centered with its parent layer (unlike pair slides, which use a centered flex group).
- [x] **Fix:** Wrap both slides' `<p>` in `<div className="flex w-full justify-center">` so the group is a shrink-wrapped flex item centered against the parent (`motion.div`) layer.
- [x] Left pair/syneLines slides, animation, and all other sections untouched.
- [x] Run `npm run lint`.
- [x] Verify slides 5–6 visually (desktop) — group centered with parent.

## Fix heading hierarchy — add `<h1>` and section `<h2>`s

- [x] **Outline now:** one `h1` → `h2` sections → `h3` subsections, no skipped levels (verified by DOM walk).
- [x] **Hero `<h1>`** (`src/App.jsx:280`): headline container is now the `h1`; inner `<div>`/`<p>` became `<span>` (headings only accept phrasing content). `TextSwap` root/`motion.p` → `span`.
- [x] **Section titles `<p>` → `<h2>`** (second line converted to `<span>` inside the same `h2`, never two `h2`s per title):
  - [x] "We help you decide" — `src/components/Services.jsx:115`
  - [x] "Frequently asked questions" — `src/components/FAQ.jsx:90`
  - [x] "Stories from our partners" — `src/App.jsx:395`
  - [x] "Trusted by / 28 partners" — `src/App.jsx:326` (wrapper gained `flex flex-col` so lines still stack)
  - [x] "What makes Drxlo Unique" — `src/components/DrxloBento.jsx:20`
  - [x] "Not find what you are looking for?" — `src/components/RequestSolution.jsx:33`
  - [x] Footer column headings — `src/components/Footer.jsx:90` (`h2`, inherits `text-paper-light`)
  - [x] Form title was already `<h2>` — untouched.
- [x] **Missing titles → `sr-only <h2>`:** "Selected work" (`src/components/Work.jsx:108`), "Problems we solve" (`src/components/Problems.jsx:165`) — absolute 1px, zero layout/scroll impact.
- [x] **`<h3>` subsections:** Services card titles, Work card titles, all 6 bento cells. FAQ questions already sit in Radix's `<h3>` header.
- [x] **Removed duplicate bento copy:** `DrxloBento.jsx:72` no longer repeats cell 01's "You'll work directly…" — center cell now reads "One partner for strategy, design and build— zero handoffs, full ownership". `<article>` kept so `.drxlo-cell:nth-child()` border rules still hold.
- [x] **FAQ alignment safeguard:** question `<p>` → `<span>` required narrowing `FAQ.jsx:65` from `[&>span]:ml-auto` to `[&>[data-slot=accordion-trigger-icon]]:ml-auto`, otherwise the question text would have been right-aligned too.
- [x] Run `npm run lint` and `npm run build` — clean.
- [x] Headless-Chrome verification: 34/34 geometry/style assertions (h1/h2 sizes & colors, FAQ q-left/icon-right, bento grid borders, centered request title, footer color, Problems height `600vh`, no heading overflow, no console errors).

## Add `robots.txt` + `sitemap.xml`

- [x] **`public/robots.txt`:** `Allow: /` for all agents + `Sitemap: https://drxlo.com/sitemap.xml`.
- [x] **`public/sitemap.xml`:** single `<url>` — `https://drxlo.com/` (`lastmod` 2026-09-25, `changefreq` monthly, `priority` 1.0). Anchor URLs (`#work`, `#faq`, …) excluded — same document, Google ignores fragments.
- [x] **Zero visual impact:** no edits to `index.html`, `src/`, or `vite.config.js` — only two inert static files, copied verbatim by Vite into `dist/`.
- [x] **Build diff proof:** rebuild file-list diff shows exactly 2 additions (`robots.txt`, `sitemap.xml`); `dist/assets/*.js|css` md5 hashes **identical** before/after.
- [x] **`npm run lint`:** no new warnings (3 pre-existing in `LenisContext.jsx`, `ui/button.jsx`, `DrxloBento.jsx`, untouched).
- [x] **`npm run preview` + curl:** `/robots.txt` → 200 `text/plain`, `/sitemap.xml` → 200 `text/xml`, `/` → 200; XML well-formed (`minidom`).
- [ ] **Post-deploy (Netlify):** `https://drxlo.com/robots.txt` and `https://drxlo.com/sitemap.xml` return 200; submit sitemap in Google Search Console.
