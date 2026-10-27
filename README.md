# portfolio-new

Personal portfolio site.

## Tech stack

- React 19 + TypeScript
- Vite
- TanStack Router (file-based routing) and TanStack Query
- Vitest + Testing Library
- ESLint (with jsx-a11y) + Prettier
- Yarn 4

## Getting started

Requires Node 24 (see `.nvmrc`).

```bash
corepack enable
yarn install
yarn dev
```

The app runs at http://localhost:5173.

## Commands

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `yarn dev`       | Start the dev server             |
| `yarn build`     | Type-check and build to `dist/`  |
| `yarn preview`   | Preview the production build     |
| `yarn lint`      | Run ESLint                       |
| `yarn format`    | Format with Prettier             |
| `yarn test`      | Run tests in watch mode          |
| `yarn test:run`  | Run tests once                   |
| `yarn test:ui`   | Run tests with the Vitest UI     |
| `yarn coverage`  | Run tests with coverage          |

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`, which lints, tests, builds and syncs `dist/` to S3.

Configure in the repository settings:

- Secret: `AWS_ROLE_ARN`
- Variables: `AWS_REGION`, `S3_BUCKET`, and optionally `CLOUDFRONT_DISTRIBUTION_ID`
- Environment: `production`
