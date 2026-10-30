import * as Sentry from '@sentry/react';

// The TanStack Router tracing integration is added in main.tsx once the router exists.
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION,
  enabled: Boolean(import.meta.env.VITE_SENTRY_DSN),

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
