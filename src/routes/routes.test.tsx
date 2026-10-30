import { screen, within } from '@testing-library/react';
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

  it('shows the projects page and marks its link as current', async () => {
    await renderRoute('/projects');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Products I’ve helped ship' }),
    ).toHaveFocus();
    expect(screen.getAllByRole('article')).toHaveLength(6);
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'aria-current',
      'page',
    );
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
});
