import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { showConsentPreferences } from '../../consent/cookieConsent';
import { PAGE_NAV_ITEMS, SECTION_NAV_ITEMS, SOCIAL_LINKS } from '../../content/navigation';
import { renderRoute } from '../../testUtils';

vi.mock('../../consent/cookieConsent', () => ({ showConsentPreferences: vi.fn() }));

const renderFooter = async () => {
  await renderRoute('/');
  return within(await screen.findByRole('contentinfo'));
};

describe('Footer', () => {
  it('links to every section and to the social profiles', async () => {
    const footer = await renderFooter();

    SECTION_NAV_ITEMS.forEach(({ label }) => {
      expect(footer.getByRole('link', { name: label })).toHaveAttribute('href', '/');
    });
    SOCIAL_LINKS.forEach(({ label, href }) => {
      const link = footer.getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('lists the sections, social links and pages under their own headings', async () => {
    const footer = await renderFooter();

    const sections = footer.getByRole('heading', { level: 4, name: 'Sections' }).nextElementSibling;
    const pages = footer.getByRole('heading', { level: 4, name: 'Pages' }).nextElementSibling;
    const links = footer.getByRole('heading', { level: 4, name: 'Links' }).nextElementSibling;
    expect(
      within(sections as HTMLElement)
        .getAllByRole('link')
        .map((link) => link.textContent),
    ).toEqual(SECTION_NAV_ITEMS.map(({ label }) => label));
    expect(
      within(links as HTMLElement)
        .getAllByRole('link')
        .map((link) => link.textContent),
    ).toEqual(SOCIAL_LINKS.map(({ label }) => label));
    expect(
      within(pages as HTMLElement)
        .getAllByRole('link')
        .map((link) => [link.textContent, link.getAttribute('href')]),
    ).toEqual(PAGE_NAV_ITEMS.map(({ label, to }) => [label, to]));
  });

  it('no longer has an Elsewhere heading', async () => {
    const footer = await renderFooter();

    expect(footer.queryByRole('heading', { name: 'Elsewhere' })).not.toBeInTheDocument();
  });

  it('does not link to the design system, which has its own project card', async () => {
    const footer = await renderFooter();

    expect(footer.queryByRole('link', { name: 'Design system' })).not.toBeInTheDocument();
  });

  it('shows the copyright with the current year', async () => {
    const footer = await renderFooter();

    expect(footer.getByText(new RegExp(`© ${new Date().getFullYear()} Ioana Tatu`))).toBeVisible();
  });

  it('reopens the privacy settings', async () => {
    const footer = await renderFooter();

    await userEvent.click(footer.getByRole('button', { name: 'Privacy settings' }));

    expect(showConsentPreferences).toHaveBeenCalledTimes(1);
  });
});
