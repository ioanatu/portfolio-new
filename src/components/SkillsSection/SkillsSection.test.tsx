import { render, screen, within } from '@testing-library/react';
import { AI_PANEL, MORE_SKILLS, MORE_SKILLS_TITLE, SKILL_GROUPS } from '../../content/skills';
import { SkillsSection } from './SkillsSection';

describe('SkillsSection', () => {
  it('keeps the section title', () => {
    render(<SkillsSection />);

    expect(screen.getByRole('heading', { level: 2, name: 'Skills & tech stack' })).toBeVisible();
  });

  it('renders every skill group with its description and skills', () => {
    render(<SkillsSection />);

    SKILL_GROUPS.forEach(({ title, description, skills }) => {
      const card = screen.getByRole('heading', { level: 3, name: title }).closest('article');
      if (description) expect(card).toHaveTextContent(description);
      expect(within(card!).getAllByRole('listitem')).toHaveLength(skills.length);
    });
  });

  it('shows the AI panel as a complementary region', () => {
    render(<SkillsSection />);

    const panel = screen.getByRole('complementary', { name: AI_PANEL.title });
    expect(within(panel).getAllByRole('listitem')).toHaveLength(
      AI_PANEL.skills.length + AI_PANEL.courses.length,
    );
  });

  it('links the course to its credential in a new tab', () => {
    render(<SkillsSection />);

    const panel = screen.getByRole('complementary', { name: AI_PANEL.title });
    expect(within(panel).getByRole('heading', { level: 4, name: 'Courses' })).toBeVisible();
    const [{ name, credentialUrl }] = AI_PANEL.courses;
    const link = within(panel).getByRole('link', { name: `Show credential: ${name}` });
    expect(link).toHaveAttribute('href', credentialUrl);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('lists the additional toolbox skills', () => {
    render(<SkillsSection />);

    const list = screen.getByRole('list', { name: MORE_SKILLS_TITLE });
    expect(within(list).getAllByRole('listitem')).toHaveLength(MORE_SKILLS.length);
  });
});
