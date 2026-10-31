import { toGoogleConsent } from './cookieConsent';

describe('toGoogleConsent', () => {
  it('denies every signal when no category is accepted', () => {
    expect(toGoogleConsent([])).toEqual({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
    });
  });

  it('grants only the signals of the accepted categories', () => {
    expect(toGoogleConsent(['necessary', 'analytics'])).toEqual(
      expect.objectContaining({
        analytics_storage: 'granted',
        ad_storage: 'denied',
        functionality_storage: 'denied',
      }),
    );
  });

  it('grants the three marketing signals together', () => {
    expect(toGoogleConsent(['marketing'])).toEqual(
      expect.objectContaining({
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'denied',
      }),
    );
  });
});
