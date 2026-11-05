# Code review: portfolio-new

**Date:** 5 November 2026  
**Scope:** Full repository (application code, tests, CI, docs, config).  
**Constraint:** This document records findings and remediations only. No application code was changed.

The site is a React 19 + TypeScript + Vite personal portfolio: file-based TanStack Router, TanStack Query for Credly badges, cookie consent + GTM, Sentry, and a GitHub Actions deploy to S3. About 4k lines of `src` TypeScript. Quality of component structure, accessibility intent, and test coverage is high for a personal site. The issues below are ordered so the first remediations unblock CI, privacy, and production hosting.

---

## Summary

| Severity | Count |
| --- | --- |
| High | 6 |
| Medium | 14 |
| Low | 12 |

**Currently failing:** `yarn test:run` — 1 of 72 tests fails (`Header` CV filename assertion). That step is in the deploy workflow, so a push to `main` will not deploy until it is fixed.

---

## What is in good shape

- Strict TypeScript, ESLint (including jsx-a11y, React Hooks, TanStack plugins) with `--max-warnings 0`, Prettier in CI.
- Content is data-driven (`src/content/*`) and mostly well typed (e.g. `Job` is a discriminated union).
- Accessibility is clearly designed in: labelled sections, visually hidden heading text for the typewriter, `prefers-reduced-motion` on scroll/canvas/animations, focus-visible styles, resume menu keyboard support, cookie banner equal-weight accept/reject.
- Credly fetch is deferred until the certifications section nears the viewport; dates are parsed without timezone shift; errors surface with `role="alert"`.
- Sentry source maps are hidden, uploaded only when `SENTRY_AUTH_TOKEN` is set, then deleted from `dist`.
- Theme storage is try/caught for private mode; system preference is respected until the user toggles.
- Planetary background animation stops off-screen and when reduced motion is on; pixel ratio is capped.

---

## High

### H1. Deploy pipeline is currently red

**Where:** `src/components/Header/Header.test.tsx` (~L99), `src/content/navigation.ts`, `src/assets/IoanaTatu_FrontendEngineer_*.pdf`  
**Finding:** The CV files were renamed to `IoanaTatu_FrontendEngineer_ATS.pdf` / `IoanaTatu_FrontendEngineer_Human.pdf`. The Header test still expects `/IoanaTatu_ATS_resume.*\.pdf$/`. Vitest result: 1 failed, 71 passed.  
**Remediate:** Update the regexes to the current filenames (or assert `href` ends with `.pdf` and contains `ATS` / `Human`). Re-run `yarn test:run`. Do not merge until green.

### H2. Long-lived AWS keys in GitHub Actions

**Where:** `.github/workflows/deploy.yml` (L45–53)  
**Finding:** Deploy uses `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`. Static keys in GitHub secrets are a common breach path (leaked logs, fork PRs, compromised Actions).  
**Remediate:** Switch to OIDC (`aws-actions/configure-aws-credentials` with `role-to-assume`). Restrict the IAM role to `s3:PutObject` / `DeleteObject` / `ListBucket` on this bucket, plus CloudFront invalidation if you add it. Delete the old access key after cutover.

### H3. Session Replay runs without cookie consent

**Where:** `src/instrument.ts` (replay sample rates + idle load), `src/consent/cookieConsent.ts` (Sentry locked under “necessary”)  
**Finding:** Sentry init is not gated on consent. Replay is loaded on `window.load` for 10% of sessions (`replaysSessionSampleRate: 0.1`) and 100% of error sessions. The banner tells visitors Sentry “cannot be disabled.” Session replay is not strictly necessary for site health under GDPR/ePrivacy, even with `maskAllText` / `blockAllMedia`.  
**Remediate:**

1. Keep error reporting if you argue legitimate interest, and document it.
2. Set `replaysSessionSampleRate` to `0` until analytics/monitoring consent is granted; load replay only in `onConsent` / `onChange` when that category is accepted.
3. Split “error tracking” from “session replay” in the preferences copy.
4. Optionally move Sentry out of `necessary` and disable `Sentry.init` / client reports until opt-in (or use a dedicated “monitoring” category).

### H4. GTM always loads, including the noscript iframe

**Where:** `index.html` (L21–82)  
**Finding:** Google Tag Manager is injected on every visit after `load` / idle, and a noscript iframe hits `googletagmanager.com` with no JS consent path. Consent Mode defaults are denied (good), but GTM itself is a third-party request and cookie surface. Categories `marketing` and `preferences` are declared in `cookieConsent.ts` with no UI sections and no mapped Google signals, so “Accept all” grants unused buckets.  
**Remediate:** Load `gtm.js` only after analytics is granted (or keep Consent Mode but drop the noscript iframe). Remove unused `marketing` / `preferences` categories, or add preference sections and map them in `CATEGORY_SIGNALS`. Align `wait_for_update` with when `initializeConsent()` actually runs.

### H5. Client-side routes will 404 on S3 unless CloudFront is rewritten

**Where:** `src/routes/design-archive.tsx`, `.github/workflows/deploy.yml`  
**Finding:** `/design-archive` is a real route. Direct loads, refreshes, and shared URLs hit S3 object keys that do not exist unless the distribution maps 403/404 to `index.html`. The workflow only `aws s3 sync`; it does not configure or verify that rewrite, and does not invalidate CloudFront.  
**Remediate:** Confirm CloudFront custom error responses (403 and 404 → `/index.html`, 200). Add an invalidation of `/*` or at least `/index.html` and `/design-archive` after sync. Add a smoke check (curl the origin URL and `/design-archive`).

### H6. Entire `dist/` is uploaded with `Cache-Control: no-cache`

**Where:** `.github/workflows/deploy.yml` (L52–53)  
**Finding:** `aws s3 sync ./dist … --cache-control no-cache --delete` applies to hashed JS/CSS/fonts/images as well as `index.html`. That throws away the main benefit of content-hashed Vite assets, increases TTFB/cost, and `--delete` can remove objects if a partial `dist` is synced.  
**Remediate:** Two-step sync: hashed `/assets/**` with long `max-age` + `immutable`; `index.html` (and any unhashed files) with `no-cache` or a short max-age. Keep `--delete` only after a successful full build, or delete with an exclude for the previous asset generation if you roll back often.

---

## Medium

### M1. `<details open={false}>` is controlled and will collapse on re-render

**Where:** `src/components/ExperienceItem/ExperienceItem.tsx` (L12–16)  
**Finding:** `open={defaultOpen}` with default `false` makes `open` a controlled React prop. Native toggle works until the parent re-renders (theme toggle wraps the tree in `ThemeProvider`). Then every job snaps shut. Tests pass because they do not re-render after expand.  
**Remediate:** Omit `open` for uncontrolled behaviour, or store open ids in React state. If the first job should start open, use state initialized from `defaultOpen`, not a constant `open={false}`.

### M2. Logo click swallows modifier and middle-click

**Where:** `src/components/Brand/Brand.tsx` (L13–17)  
**Finding:** On `/`, every click `preventDefault()`s and scrolls. `SectionLink` correctly ignores modified clicks; Brand does not. Cmd/Ctrl-click and some auxiliary clicks will not open a new tab.  
**Remediate:** Reuse the `isPlainLeftClick` guard from `SectionLink`. Respect `prefers-reduced-motion` for `behavior: 'smooth'` (BackToTop already does this).

### M3. Credly response is trusted without a schema; `isPending` is true while disabled

**Where:** `src/hooks/useCredlyBadges.ts`, `src/components/CertificationsSection/CertificationsSection.tsx`  
**Finding:** `response.json()` is asserted as `CredlyResponse`. Missing `data` or `badge_template` throws; `image_url` is used as `img src` with no allowlist. Query defaults retry three times (tests disable retry). `enabled` is false until in view; in Query v5 `isPending` stays true while disabled, so skeletons show before fetch and forever if `IntersectionObserver` never fires.  
**Remediate:** Validate with a narrow type guard (array, string id, `YYYY-MM-DD`, `https:` image host). Use `isLoading` (`isPending && isFetching`) for skeletons. Set `retry: 1`, `throwOnError: false`. Restrict `badge` to `https://images.credly.com/` (or your CDN). If the observer never intersects, show the local fallback / error, not infinite skeletons.

### M4. Cookie and privacy copy does not match behaviour

**Where:** `src/consent/cookieConsent.ts`, `README.md`, `src/instrument.ts`  
**Finding:** Copy says analytics is anonymous and Sentry is essential. Replay + tracing (`tracesSampleRate` 0.2 in prod) are more than crash logs. README claims “mandatory Sentry” and GA only after opt-in.  
**Remediate:** Rewrite the necessary/analytics sections to name Google Analytics, GTM, Sentry errors, tracing, and replay separately. Keep README in sync.

### M5. Theme flash on first paint

**Where:** `index.html`, `src/ThemeContext/ThemeProvider.tsx`  
**Finding:** `data-theme` is set in `useEffect` after paint. Stored dark preference or `prefers-color-scheme: dark` still first-paints light `:root` tokens.  
**Remediate:** Tiny inline script in `<head>` that reads `localStorage.it-theme` / `matchMedia` and sets `data-theme` before CSS. Keep the React provider in sync. Use `useLayoutEffect` as a lesser fallback.

### M6. Mobile menu is not a dialog

**Where:** `src/components/MobileMenu/MobileMenu.tsx`, `src/components/Header/Header.tsx`  
**Finding:** Escape and outside click work; there is no focus trap, no `role="dialog"`, no `aria-modal`, and the rest of the page stays tabbable. The menu button icon stays a hamburger while `aria-label` becomes “Close menu”.  
**Remediate:** Trap focus while open (or use a native/html dialog). Restore focus is already done. Optionally swap the icon to an X. Add `aria-modal="true"` if it behaves as a modal.

### M7. No skip link, no route error UI, unknown URLs silently become home

**Where:** `index.html`, `src/routes/__root.tsx`, `src/main.tsx`  
**Finding:** Keyboard users must tab through the header every time. `notFoundComponent` is `<Navigate to="/" replace />`, so `/projects` and typos look like a successful home render (tests encode that). There is no `Sentry.ErrorBoundary` / router `errorComponent`. `createRoot(document.getElementById('root')!)` assumes `#root` exists.  
**Remediate:** Add a visually hidden “Skip to content” link to `#top` or `<main>`. Use a small 404 page instead of a silent redirect (keep a dedicated redirect for `/projects` if you still share that URL). Add `errorComponent` on the root route and `Sentry.ErrorBoundary`. Guard missing `#root`.

### M8. Install is not reproducible; CI only runs on `main`

**Where:** `.github/workflows/deploy.yml`, `package.json`  
**Finding:** `yarn install` without `--immutable` can mutate the lockfile in CI. No `pull_request` workflow, so review branches are untested until merge. `engines.node` is `>=24`; README mentions `.nvmrc`, which is not in the repo.  
**Remediate:** `yarn install --immutable`. Add a `pull_request` job with lint, format, test (deploy only on `main`). Add `.nvmrc` with `24` or stop documenting it.

### M9. Dead weight in the bundle graph / dependencies

**Where:** `package.json`, `vitest.setup.ts`  
**Finding:** `three` and `@types/three` are unused (backgrounds are CSS + Canvas 2D). `@tanstack/react-query-devtools` and `@tanstack/react-router-devtools` are never mounted. Vitest setup still comments about a “3D stage”. README lists three.js as the hero.  
**Remediate:** Remove unused packages. Mount devtools behind `import.meta.env.DEV` if you want them. Update README / vitest comment.

### M10. Section URLs cannot be shared

**Where:** `src/components/SectionLink/SectionLink.tsx`  
**Finding:** All section links are `href="/"` and hashes are intentionally not written. Copy-link, open-in-new-tab, and browser back do not restore a section. Navigate-from-archive uses a single `requestAnimationFrame` after `navigate()`, which can fire before the home sections exist.  
**Remediate:** Prefer `href="/#experience"` (etc.) and `scrollIntoView` on hash change, or TanStack Router hashes. After cross-route navigation, wait for the section node (microtask loop / `MutationObserver` / `useLayoutEffect`) instead of one rAF.

### M11. QueryClient has no production defaults

**Where:** `src/main.tsx`  
**Finding:** Default QueryClient: 3 retries, refetch on window focus. A flaky Credly proxy will hammer `/credlyBadges` when visitors tab back.  
**Remediate:** `{ queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 60 * 60 * 1000 } }` at the client, not only in the hook.

### M12. Accessibility bugs in certifications chrome

**Where:** `src/components/BadgeSourceCard/BadgeSourceCard.tsx`  
**Finding:** `aria-labelledby="badge-source-title"` but no element with that id. The aside is an unlabelled complementary region.  
**Remediate:** Add a heading/`id`, or drop `aria-labelledby` and use `aria-label`.

### M13. `target="_blank"` without `noreferrer` in several places

**Where:** `Footer.tsx`, `MobileMenu.tsx`, `DownloadCvMenu.tsx` (others already use `noopener noreferrer`)  
**Finding:** Inconsistent `rel`. Modern browsers imply `noopener` from `target="_blank"`, but the codebase already uses the full pair elsewhere.  
**Remediate:** Standardize on `rel="noopener noreferrer"` (or a small `ExternalLink` wrapper).

### M14. Launch metadata still looks like a staging site

**Where:** `index.html`  
**Finding:** `robots: noindex, nofollow` is correct for `new.ioanatatu.com` while old site is live; it is a blocker the day this URL becomes canonical. `twitter:card` is set without `twitter:image` / `og:image:alt`. No canonical link.  
**Remediate:** Checklist item at cutover: remove noindex, add canonical, complete Twitter tags, confirm `og:image` URL after DNS switch.

---

## Low

### L1. Job dates read backwards

**Where:** `src/content/experience.ts` (e.g. `'Jan 2026 – Dec 2022'`, `'Nov 2022 – Aug 2021'`)  
**Finding:** Tests lock in end–start order. Readers will parse this as “started in 2026, ended in 2022.”  
**Remediate:** Use `Dec 2022 – Jan 2026` (or `Dec 2022 – present` if still employed). Update tests.

### L2. Content typos and possible broken links

**Where:** `src/content/projects.ts`, `src/content/experience.ts`  
**Finding:** “experiement”, “revewed”, “FC Byern”. Design system repo is `github.com/ioanatu/component-library` (one `t`) vs `ioanatatu` used elsewhere. GitHub/LinkedIn in the footer point at the account README says is lost.  
**Remediate:** Spell-check content. Verify each outbound URL. Update social links to the accounts you actually use.

### L3. Pronunciation control on touch / keyboard split

**Where:** `NamePronunciation.tsx` / `.module.css`  
**Finding:** Hover tooltip play button is `tabIndex={-1}`; keyboard users get a clipped-until-focus button. Hover-only tooltip is unreliable on touch despite README (“tap on mobile”). Two `useAudioPlayer` instances mean two `Audio` objects.  
**Remediate:** One player in context, or always-visible play control on coarse pointers (`(hover: none)`). Keep the keyboard button.

### L4. Duplicate `id="top"` and duplicate resume entry points

**Where:** `HomePage.tsx`, `DesignArchivePage.tsx`, header CV menu vs `ResumeDownload`  
**Finding:** Two mains share `id="top"` (only one is mounted at a time, so this is OK today). Resume PDFs are offered in header, mobile menu, and experience footer.  
**Remediate:** Optional: unique ids if you later nest layouts. Consider one obvious CV path to reduce clutter.

### L5. Human-readable PDF is ~918 KB

**Where:** `src/assets/IoanaTatu_FrontendEngineer_Human.pdf`  
**Finding:** Fine as a click-to-download hashed asset (not inlined), but large for a CV.  
**Remediate:** Re-export compressed; keep ATS slimmer.

### L6. Coverage config has no thresholds; several hooks untested

**Where:** `vitest.config.ts`, `src/hooks/*`  
**Finding:** Coverage exclude list is small; no `thresholds`. No direct tests for `useCredlyBadges` parsing edge cases, `ThemeProvider` FOUC/system changes, `useOrbits`, or `useAudioPlayer` cleanup.  
**Remediate:** Add tests for JSON validation and theme persistence; set modest coverage thresholds once the suite is green.

### L7. `useScrolledPast` / scroll spy extra work

**Where:** `useScrolledPast.ts`, `useScrollSpy.ts`  
**Finding:** Scroll listener is not rAF-throttled (passive, so minor). Scroll spy depends on `ids` array identity (stable today because `SECTION_IDS` is module-level).  
**Remediate:** Optional rAF coalescing. Keep `SECTION_IDS` as a constant.

### L8. Cookie banner HTML in translation strings

**Where:** `cookieConsent.ts` preferences necessary description  
**Finding:** HTML in i18n strings (`<a href=…>`) is the library’s API; still easy to break escaping later.  
**Remediate:** Keep `rel` on that link; avoid interpolating untrusted strings.

### L9. Fonts: three families loaded up front

**Where:** `src/main.tsx`  
**Finding:** Hanken Grotesk, JetBrains Mono, and Poppins 700 all load on boot.  
**Remediate:** Confirm Poppins is still used; subset or delay mono until needed.

### L10. README drift

**Where:** `README.md`  
**Finding:** Documents `/projects` as a page, three.js hero, `.nvmrc`, and “pushes directly to main” without the current design-archive route or failing test.  
**Remediate:** Refresh Pages / Features / Getting started after the high-priority fixes.

### L11. `html { scroll-behavior: smooth }` vs reduced motion

**Where:** `src/index.css`  
**Finding:** Reduced-motion media query correctly disables it; Brand’s JS smooth scroll does not.  
**Remediate:** Covered under M2.

### L12. Security headers not defined in repo

**Where:** hosting (not in this codebase)  
**Finding:** No CSP, HSTS, or `Referrer-Policy` in the app. Those belong on CloudFront.  
**Remediate:** Add a response-headers policy: CSP allowing your origins + GTM/Sentry/Credly as needed, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS once HTTPS is guaranteed.

---

## Test and CI snapshot (this review)

```
yarn test:run
Test Files  1 failed | 10 passed (11)
Tests       1 failed | 71 passed (72)
```

Failed assertion: ATS href `/src/assets/IoanaTatu_FrontendEngineer_ATS.pdf` vs expected `/IoanaTatu_ATS_resume.*\.pdf$/`.

Deploy job order is otherwise sensible: lint → format check → tests → build → AWS. Gaps: no `--immutable`, no PR CI, no OIDC, no cache split, no CloudFront invalidation, no post-deploy smoke test.

---

## Recommended remediation order

Do these in this sequence. Still no code was changed in this review; this is the work list.

1. **Unblock CI:** fix Header CV filename tests (H1).
2. **Privacy:** gate Sentry replay (H3); stop unconditional GTM noscript / unused categories (H4); align consent copy (M4).
3. **Hosting:** CloudFront SPA rewrite + invalidation (H5); split cache headers (H6); OIDC instead of access keys (H2).
4. **Correctness:** uncontrolled `details` (M1); Brand modifier-click (M2); Credly validation + `isLoading` (M3, M11).
5. **A11y / UX:** skip link, 404, error boundary (M7); mobile focus trap (M6); theme anti-FOUC (M5); badge source label (M12); date order (L1).
6. **Hygiene:** drop unused deps (M9); `yarn install --immutable` + PR workflow + `.nvmrc` (M8); README (L10); content typos (L2).

---

## Out of scope / not verified

- Live CloudFront/S3/Lambda/IAM configuration (only inferred from README and the workflow).
- Whether `new.ioanatatu.com/credlyBadges` currently returns Credly-shaped JSON.
- Visual/QA pass in a real browser (reduced motion, dark mode FOUC, mobile menu, experience accordion vs theme toggle).
- Legal sufficiency of the consent banner (not legal advice).
