# portfolio-new

I created this project to showcase my skills, highlight my professional experience, and experiment with AI-powered tools.

I uses Sentry for error tracking and performance monitoring, and Google Analytics for my personal learning process. Please accept cookies as there is no marketing purpose behind.

---

## Tech stack

- React 19 + TypeScript
- Vite
- TanStack Router (file-based routing) and TanStack Query
- three.js for the 3D hero
- Vitest + React Testing Library
- ESLint (with jsx-a11y) + Prettier
- Yarn 4

## Pages

- `/` – hero
- `/projects` – projects (work in progress)

Dark mode follows the system setting until the toggle is used; the choice is saved in `localStorage`.

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

Pushes directly to `main` run `.github/workflows/deploy.yml`, which lints, tests, builds and syncs `dist/` to S3. Because this is a personal project, it does not use environments.

---

<sub style="line-height: 0.15em">The old portfolio is at [ioanatatu.com](https://ioanatatu.com). My old GitHub account, which I no longer have access to, is [ioanatatu](https://github.com/ioanatatu).</sub>
