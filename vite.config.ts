import { sentryVitePlugin } from '@sentry/vite-plugin';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const DEFAULT_CREDLY_PROXY_TARGET = 'https://new.ioanatatu.com';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = (env.CREDLY_PROXY_TARGET || DEFAULT_CREDLY_PROXY_TARGET).trim();
  const proxy = { '/credlyBadges': { target, changeOrigin: true } };

  return {
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
    server: { proxy },
    preview: { proxy },
  };
});
