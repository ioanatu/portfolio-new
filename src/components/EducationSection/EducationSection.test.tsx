import { render, screen, within } from '@testing-library/react';
import { LANGUAGES, STUDIES } from '../../content/education';
import { EducationSection } from './EducationSection';

describe('EducationSection', () => {
  it('lists every study with its years', () => {
    render(<EducationSection />);

    const studies = within(screen.getByRole('group', { name: 'Studies' })).getAllByRole('listitem');
    expect(studies).toHaveLength(STUDIES.length);
    STUDIES.forEach(({ institution, years, title }, i) => {
      expect(studies[i]).toHaveTextContent(institution);
      expect(studies[i]).toHaveTextContent(years);
      expect(within(studies[i]).getByRole('heading', { level: 4, name: title })).toBeVisible();
    });
  });

  it('lists the languages with their levels and certificates', () => {
    render(<EducationSection />);

    const languages = screen.getByRole('group', { name: 'Languages' });
    LANGUAGES.forEach(({ name, level }) => {
      expect(within(languages).getByText(name)).toBeInTheDocument();
      expect(within(languages).getAllByText(level).length).toBeGreaterThan(0);
    });
    expect(within(languages).getByText('IELTS Academic')).toBeInTheDocument();
  });

  it('keeps the decorative background out of the accessibility tree', () => {
    const { container } = render(<EducationSection />);

    expect(container.querySelector('canvas')?.closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
