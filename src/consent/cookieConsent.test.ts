import * as CookieConsent from 'vanilla-cookieconsent';
import { initializeConsent, showConsentPreferences, toGoogleConsent } from './cookieConsent';

vi.mock('vanilla-cookieconsent', () => ({
  run: vi.fn(),
  showPreferences: vi.fn(),
  acceptedCategory: vi.fn(),
}));

describe('toGoogleConsent', () => {
  it('denies analytics when no category is accepted', () => {
    expect(toGoogleConsent([])).toEqual({ analytics_storage: 'denied' });
  });

  it('denies analytics when only the necessary category is accepted', () => {
    expect(toGoogleConsent(['necessary'])).toEqual({ analytics_storage: 'denied' });
  });

  it('grants analytics when the analytics category is accepted', () => {
    expect(toGoogleConsent(['necessary', 'analytics'])).toEqual({ analytics_storage: 'granted' });
  });
});

describe('initializeConsent', () => {
  const gtag = vi.fn();

  const configPassedToRun = () => vi.mocked(CookieConsent.run).mock.calls[0][0];

  beforeEach(() => {
    vi.clearAllMocks();
    window.gtag = gtag;
  });

  afterEach(() => {
    delete window.gtag;
  });

  it('keeps the necessary category on and locked', () => {
    initializeConsent();

    expect(configPassedToRun().categories).toMatchObject({
      necessary: { enabled: true, readOnly: true },
    });
  });

  it('offers equal-weight buttons, so rejecting is as easy as accepting', () => {
    initializeConsent();

    const { guiOptions } = configPassedToRun();
    expect(guiOptions?.consentModal?.equalWeightButtons).toBe(true);
    expect(guiOptions?.preferencesModal?.equalWeightButtons).toBe(true);
  });

  it.each(['onConsent', 'onChange'] as const)(
    'grants analytics to Google when %s fires with analytics accepted',
    (callback) => {
      vi.mocked(CookieConsent.acceptedCategory).mockImplementation(
        (category) => category === 'analytics',
      );
      initializeConsent();

      configPassedToRun()[callback]?.({
        cookie: {},
        changedCategories: [],
        changedServices: {},
      } as never);

      expect(gtag).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'granted' });
    },
  );

  it('denies analytics to Google when the visitor rejects', () => {
    vi.mocked(CookieConsent.acceptedCategory).mockReturnValue(false);
    initializeConsent();

    configPassedToRun().onConsent?.({ cookie: {} } as never);

    expect(gtag).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'denied' });
  });

  it('does not throw when Google Tag Manager has not loaded', () => {
    delete window.gtag;
    vi.mocked(CookieConsent.acceptedCategory).mockReturnValue(true);
    initializeConsent();

    expect(() => configPassedToRun().onConsent?.({ cookie: {} } as never)).not.toThrow();
  });
});

describe('showConsentPreferences', () => {
  it('opens the preferences modal', () => {
    showConsentPreferences();

    expect(CookieConsent.showPreferences).toHaveBeenCalledTimes(1);
  });
});
