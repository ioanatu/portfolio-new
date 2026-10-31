import 'vanilla-cookieconsent/dist/cookieconsent.css';
import './cookieConsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CATEGORY_SIGNALS = {
  analytics: ['analytics_storage'],
} as const;

type Category = keyof typeof CATEGORY_SIGNALS;

export const toGoogleConsent = (accepted: readonly string[]) =>
  Object.fromEntries(
    (Object.keys(CATEGORY_SIGNALS) as Category[]).flatMap((category) =>
      CATEGORY_SIGNALS[category].map((signal) => [
        signal,
        accepted.includes(category) ? 'granted' : 'denied',
      ]),
    ),
  );

const updateGoogleConsent = () => {
  window.gtag?.(
    'consent',
    'update',
    toGoogleConsent(
      (Object.keys(CATEGORY_SIGNALS) as Category[]).filter(CookieConsent.acceptedCategory),
    ),
  );
};

export const showConsentPreferences = () => CookieConsent.showPreferences();

export const initializeConsent = () =>
  CookieConsent.run({
    guiOptions: {
      consentModal: { layout: 'box', position: 'bottom right', equalWeightButtons: true },
      preferencesModal: { layout: 'box', equalWeightButtons: true },
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: {},
      marketing: {},
      preferences: {},
    },
    onConsent: updateGoogleConsent,
    onChange: updateGoogleConsent,
    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: 'Privacy settings',
            description:
              'Hey there, dear visitor! I use Google Tag Manager to see how the site is used. No commercial purposes. Accepting would help me understand usage.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage preferences',
          },
          preferencesModal: {
            title: 'Privacy settings',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save choices',
            closeIconLabel: 'Close',
            sections: [
              {
                title: 'Your choice',
                description:
                  'Pick which categories Google Tag Manager may use. Your choice is saved in a cookie on this device.',
              },
              {
                title: 'Strictly necessary',
                description:
                  'This project uses <a href="https://docs.sentry.io/" target="_blank" rel="noopener noreferrer">Sentry</a> for basic error tracking and performance monitoring. This is essential for the health of any web project, and cannot be disabled.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Analytics',
                description: 'Anonymous statistics about how the site is used.',
                linkedCategory: 'analytics',
              },
            ],
          },
        },
      },
    },
  });
