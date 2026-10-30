import { sentryVitePlugin } from '@sentry/vite-plugin';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  build: { sourcemap: 'hidden' },
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    // Uploads source maps only when SENTRY_AUTH_TOKEN is set (e.g. in CI / production builds).
    sentryVitePlugin({
      org: 'ioana-orga',
      project: 'portfolio',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      url: 'https://de.sentry.io',
      disable: !process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: { filesToDeleteAfterUpload: ['./dist/**/*.map'] },
    }),
  ],
  css: {
    modules: { localsConvention: 'dashes' },
  },
});
