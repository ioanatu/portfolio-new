import { render, screen, within } from '@testing-library/react';
import { PROJECTS, PROJECTS_INTRO, PROJECTS_TITLE } from '../../content/projects';
import { ProjectsSection } from './ProjectsSection';

describe('ProjectsSection', () => {
  it('shows its title as the heading of the projects region', () => {
    render(<ProjectsSection />);

    expect(screen.getByRole('region', { name: PROJECTS_TITLE })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: PROJECTS_TITLE })).toBeVisible();
    expect(screen.getByText(PROJECTS_INTRO)).toBeVisible();
  });

  it('lists a card per project that links out in a new tab', () => {
    render(<ProjectsSection />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(PROJECTS.length);
    PROJECTS.forEach(({ name, href, linkLabel, repoHref, description }, i) => {
      expect(within(cards[i]).getByRole('heading', { level: 3, name })).toBeVisible();
      const link = within(cards[i]).getByRole('link', { name: linkLabel });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
      expect(cards[i]).toHaveTextContent(description);
      const repo = within(cards[i]).getByRole('link', { name: `${name} on GitHub` });
      expect(repo).toHaveAttribute('href', repoHref);
      expect(repo).toHaveAttribute('target', '_blank');
    });
  });

  it('keeps the illustrations out of the accessibility tree', () => {
    const { container } = render(<ProjectsSection />);

    container.querySelectorAll('svg').forEach((svg) => {
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
    container.querySelectorAll('img').forEach((img) => {
      expect(img).toHaveAttribute('alt', '');
    });
  });
});
