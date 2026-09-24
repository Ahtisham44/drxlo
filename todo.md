# SEO Fix Todos — drxlo.com

Audit of the Vite + React SPA landing page. Ordered by priority.

---

## 🔴 High Priority

### 1. Fix broken image paths (bug)
- [x] In `src/lib/assets.js`, fix 7 entries using wrong paths (`/public/assets/...` or missing leading `/`)
- [x] Affected: all 5 Work case-study images (`IMG_WORK_1`–`IMG_WORK_5`) and 2 testimonial images (`IMG_TEST_SMALL`, `IMG_TEST_MID_A`)
- [x] Correct form: `/assets/DT.jpeg`, `/assets/DS.png`, etc. (Vite serves `public/` at root)
- [x] Verify all images load in production build (`npm run build` + preview)

### 2. Add `<h1>` and fix heading hierarchy
- [x] Add a single `<h1>` in the hero section (`src/App.jsx` ~line 281) — currently plain `<p>` tags
- [x] Convert section titles from `<p>` to `<h2>`:
  - [x] "We help you decide" — `src/components/Services.jsx:115`
  - [x] "Frequently asked questions" — `src/components/FAQ.jsx:91-92`
  - [x] "Stories from our partners" — `src/App.jsx:396-397`
  - [x] "Trusted by / 28 partners" — `src/App.jsx:327-328`
  - [x] Work section title — `src/components/Work.jsx`
  - [x] Problems section title — `src/components/Problems.jsx`
- [x] Remove duplicate `<h2>` text in `src/components/DrxloBento.jsx:72` (duplicates line 29)
- [x] Ensure order: one `h1` → `h2` sections → `h3` subsections
- [x] Make footer column headings headings (`src/components/Footer.jsx`) instead of `<p>`

### 3. Create `robots.txt`
- [x] Create `public/robots.txt`:
  ```
  User-agent: *
  Allow: /

  Sitemap: https://drxlo.com/sitemap.xml
  ```
- [x] Confirm it appears at `https://drxlo.com/robots.txt` after deploy

### 4. Create `sitemap.xml`
- [x] Create `public/sitemap.xml` with single URL `https://drxlo.com/` (lastmod optional)
- [x] Confirm it appears at `https://drxlo.com/sitemap.xml` after deploy

### 5. Add JSON-LD structured data
- [ ] Add `<script type="application/ld+json">` blocks in `index.html`:
  - [ ] `Organization` (name: Drxlo, url, logo, email `hello@drxlo.com`, socials from `Footer.jsx`)
  - [ ] `WebSite` (name, url, canonical)
  - [ ] `FAQPage` — mirror the 9 Q&As from `src/components/FAQ.jsx`
- [ ] Validate with Google Rich Results Test / Schema Markup Validator

---

## 🟡 Medium Priority

### 6. Fix image alt text
- [ ] `src/components/Work.jsx:80` — replace `alt=""` on all 5 case-study images with descriptive text (project name + type)
- [ ] `src/App.jsx:268` — replace generic `alt={Card ${i + 1}}` on hero cards with meaningful alts
- [ ] `src/components/Services.jsx:136` — add descriptive alt
- [ ] `src/components/StoriesCollage.jsx:144` — add descriptive alt
- [ ] Decorative icons keep `alt=""` (WhatsApp icon at `App.jsx:304` is fine)

### 7. Add `width`/`height` to images (prevent CLS)
- [ ] Add explicit `width` and `height` attributes to all `<img>` tags:
  - [ ] `src/App.jsx` (hero cards, partner logos)
  - [ ] `src/components/Work.jsx`
  - [ ] `src/components/Services.jsx`
  - [ ] `src/components/StoriesCollage.jsx`
  - [ ] `src/components/DrxloBento.jsx`
- [ ] Measure actual intrinsic dimensions of assets first

### 8. Add custom 404 page
- [ ] Create `public/404.html` (branded, links back to `https://drxlo.com/`)
- [ ] Note: GitHub Pages serves this automatically for unknown paths

### 9. Image optimization
- [ ] Rename files with spaces/special chars in `public/assets/` (e.g. `Screenshot 2026-08-19 at 5.49 Background Removed.13 PM.png` → kebab-case)
- [ ] Compress `public/assets` (currently 6.3 MB → target smaller)
- [ ] Convert large PNGs/JPEGs to WebP where sensible
- [ ] Consider adding a Vite image optimization plugin (e.g. `vite-plugin-image-optimizer`)

### 10. Font optimization
- [ ] Delete unused `public/fonts/Mont-Regular.otf` (~172 KB)
- [ ] Convert remaining Mont `.otf` files to WOFF2
- [ ] Add `<link rel="preload">` for critical fonts in `index.html`

---

## 🟢 Structural / Nice-to-have

### 11. Make content indexable without JS (biggest structural win)
- [ ] Option A: add `vite-plugin-ssg` / prerender plugin to snapshot DOM into `dist/index.html` at build time
- [ ] Option B: post-build script that renders React to static HTML and injects into `index.html`
- [ ] Option C (minimum): add meaningful `<noscript>` fallback content with key copy, headings, and links
- [ ] Ensure FAQ, services, and hero copy exist as text in shipped HTML

### 12. Reduce JS bundle (492 KB entry)
- [ ] Audit heavy deps: `gsap`, `lenis`, `motion`, `ogl` — remove unused ones
- [ ] Confirm `React.lazy` sections still code-split correctly after changes

### 13. Meta / head polish
- [ ] Add `<meta name="robots" content="index, follow">` (explicit default)
- [ ] Add `<meta name="theme-color">` matching brand
- [ ] Add Google Search Verification meta (when Search Console is set up)
- [ ] Add `twitter:site` handle if Drxlo has an X account

### 14. Footer / link hygiene
- [ ] Replace placeholder footer anchors with real destinations or remove:
  - [ ] `Careers` → currently `#contact`
  - [ ] `Press & Media` → currently `#stories`
  - [ ] `About Us` → currently `#home`
  - [ ] Service/industry links pointing to generic anchors
- [ ] Add `id` attributes to Problems and RequestSolution sections (currently not linkable)

### 15. Post-launch verification
- [ ] Test with Google Rich Results Test (structured data)
- [ ] Test with Google PageSpeed Insights (CLS, LCP, bundle)
- [ ] Submit sitemap in Google Search Console
- [ ] Test social previews (Facebook Sharing Debugger, Twitter Card Validator)
- [ ] Crawl with Screaming Frog / Ahrefs free crawler to confirm headings, alts, meta

---

## Out of scope (noted)
- RSS feed — not meaningful for a single landing page
- Multi-page routes / real internal linking — requires product decision (separate Work/Services pages would substantially improve SEO)
