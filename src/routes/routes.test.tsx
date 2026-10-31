import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SECTION_IDS } from '../content/navigation';
import { renderRoute } from '../testUtils';

describe('routes', () => {
  it('renders the hero, certifications and the navbar on the home page', async () => {
    await renderRoute('/');
    expect(
      await screen.findByRole('heading', { level: 1, name: /Hey there, I’m ioana/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Certified on AWS,\s+three times and counting/ }),
    ).toBeInTheDocument();
  });

  it('renders a labelled section for every navbar item', async () => {
    await renderRoute('/');
    await screen.findByRole('main');
    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      expect(section).toBeInTheDocument();
      expect(section).toHaveAccessibleName();
    });
    expect(new Set(SECTION_IDS).size).toBe(SECTION_IDS.length);
  });

  it('no longer has a projects page', async () => {
    await renderRoute('/projects');
    expect(await screen.findByRole('heading', { level: 1, name: /Hey there/ })).toBeInTheDocument();
  });

  it('links the hero buttons to the skills and certifications sections', async () => {
    await renderRoute('/');
    const hero = within(await screen.findByRole('main'));
    expect(hero.getByRole('link', { name: 'Check out my skills' })).toHaveAttribute(
      'href',
      '/#skills',
    );
    expect(hero.getByRole('link', { name: 'AWS Certifications' })).toHaveAttribute(
      'href',
      '/#certifications',
    );
  });

  it('redirects unknown paths to the home page', async () => {
    await renderRoute('/nope');
    expect(await screen.findByRole('heading', { level: 1, name: /Hey there/ })).toBeInTheDocument();
  });

  it('shows the work-in-progress message on the design archive page, linking to Behance', async () => {
    await renderRoute('/design-archive');
    const main = within(await screen.findByRole('main'));

    expect(main.getByRole('heading', { level: 1, name: 'Design archive' })).toBeInTheDocument();
    expect(main.getByText(/This page is work in progress/)).toHaveTextContent(
      "It will contain snippets of my old designer portfolio. If you're curious, you can check out my ancient behance.",
    );
    const link = main.getByRole('link', { name: 'behance' });
    expect(link).toHaveAttribute('href', 'https://www.behance.net/IoanaTatu');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveTextContent(/^behance$/);
  });

  it('takes the visitor back home from the design archive', async () => {
    await renderRoute('/design-archive');
    await userEvent.click(await screen.findByRole('link', { name: 'Back home' }));

    expect(await screen.findByRole('heading', { level: 1, name: /Hey there/ })).toBeInTheDocument();
  });
});
