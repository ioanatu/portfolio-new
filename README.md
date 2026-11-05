# portfolio-new

This project is meant to showcase my skills, highlight my professional experience, and function as a sandbox for experimentation.

## Monitoring & Analytics

I use Sentry to monitor errors and website performance, and Google Analytics to better understand visitor traffic and user behavior as part of my own learning process. Your privacy matters to me and there is no marketing purpose behind. Thank you for supporting my work by accepting cookies!

---

## Tech stack

- React 19 + TypeScript
- Vite
- TanStack Router (file-based routing) and TanStack Query
- three.js for the 3D hero
- Vitest + React Testing Library
- ESLint (with jsx-a11y) + Prettier
- Node.js 24
- Yarn 4

## Pages

- `/` – main landing page with sections
- `/projects` – projects (work in progress)

## Features

- **Name pronunciation**: hover (or tap on mobile) my name in Hero section to hear it spoken.
- **Live Credly badges**: certifications are fetched lazily through a `/credlyBadges` CloudFront path that forwards to a Lambda. Lambda is thus not accessed directly and only the CloudFront distribution has IAM permissions for GET requests.
- **Dark Mode**: Who doesn't have a dark mode nowadays, right? It follows the system setting until the toggle is used. The choice is saved in `localStorage`.
- **Animations**: created with claude code.
- **Resume download**: ATS and human-friendly CV versions.
- **Cookie consent**: Google Analytics loads only after opt-in, and choices can be changed from the footer. I use an open source lightweight & gdpr compliant cookie consent plugin [vanilla-cookieconsent](https://www.npmjs.com/package/vanilla-cookieconsent)
- **Monitoring**: mandatory Sentry error tracking and performance, with source maps uploaded in CI.
- **Responsive and accessible**: mobile, tablet and desktop layouts, keyboard support, and reduced-motion support.
- **CI/CD**: GitHub Actions lints, tests, builds and deploys to S3 behind CloudFront.
- **Meta tags for social preview**: These index.html meta tags control how the website appears when someone shares its URL on social media, messaging apps, and other platforms (for me this was important particularly for Whatsapp and LinkedIn).

## Getting started

Requires Node 24 (see `.nvmrc`).

```bash
corepack enable
yarn install
yarn dev
```

## Commands

| Command         | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `yarn dev`      | Start the dev server                                           |
| `yarn dev:host` | Start the dev server on the network (for phones/other devices) |
| `yarn build`    | Type-check and build to `dist/`                                |
| `yarn preview`  | Preview the production build                                   |
| `yarn lint`     | Run ESLint                                                     |
| `yarn format`   | Format with Prettier                                           |
| `yarn test`     | Run tests in watch mode                                        |
| `yarn test:run` | Run tests once                                                 |
| `yarn test:ui`  | Run tests with the Vitest UI                                   |
| `yarn coverage` | Run tests with coverage                                        |

## Deployment

The file `.github/workflows/deploy.yml`, contains the workflow for linting, running tests, and building. The `dist/` is uploaded to S3. Because this is a personal project, it does not use environments, instead it pushes directly to `main`.

---

<sub style="line-height: 0.15em">The old portfolio is at [ioanatatu.com](https://ioanatatu.com). My old GitHub account, which I no longer have access to, is [ioanatatu](https://github.com/ioanatatu).</sub>
