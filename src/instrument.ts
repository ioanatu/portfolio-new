import * as Sentry from '@sentry/react';

const sentryEnabled = Boolean(import.meta.env.VITE_SENTRY_DSN);

// The TanStack Router tracing integration is added in main.tsx once the router exists.
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION,
  enabled: sentryEnabled,

  tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Session replay is large, so it is fetched after the page has loaded instead of with the main bundle.
const loadReplay = async () => {
  try {
    const replayIntegration = await Sentry.lazyLoadIntegration('replayIntegration');
    Sentry.addIntegration(replayIntegration({ maskAllText: true, blockAllMedia: true }));
  } catch {
    // Replay is optional; error reporting keeps working without it.
  }
};

if (sentryEnabled) {
  window.addEventListener('load', () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => void loadReplay());
    else setTimeout(() => void loadReplay(), 1500);
  });
}
