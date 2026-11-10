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
export NPM_AUTH_TOKEN=<a GitHub token that can read packages>
yarn install
yarn dev
```

### Component library

The hero buttons come from my own [component library](https://github.com/ioanatu/component-library/pkgs/npm/component-library), `@ioanatu/component-library`, which is published on GitHub Packages. GitHub Packages needs a token even to read a package, so `yarn install` expects one in the `NPM_AUTH_TOKEN` environment variable. `.yarnrc.yml` only points to that variable, so no token is stored in the repo. Use a classic personal access token with the `read:packages` scope.

The library adds its own CSS (colors, fonts and button styles). It only has light colors, so the dark theme restates the colors its buttons use, at the end of the dark block in `src/index.css`.

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

The file `.github/workflows/deploy.yml`, contains the workflow for linting, running tests, and building. Installing the dependencies needs to read the component library: the workflow gives yarn the built-in `GITHUB_TOKEN` as `NPM_AUTH_TOKEN`, so no secret has to be created. That only works while the package `component-library` allows this repository to read it (the package's settings, under "Manage Actions access"). The `dist/` is uploaded to S3. Because this is a personal project, it does not use environments, instead it pushes directly to `main`.

---

<sub style="line-height: 0.15em">The old portfolio is at [ioanatatu.com](https://ioanatatu.com). My old GitHub account, which I no longer have access to, is [ioanatatu](https://github.com/ioanatatu).</sub>
