import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JOBS } from '../../content/experience';
import { ExperienceSection } from './ExperienceSection';

describe('ExperienceSection', () => {
  beforeEach(() => render(<ExperienceSection />));

  it('lists every job with its role and dates', () => {
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(JOBS.length);
    expect(screen.getByText('Frontend Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Nov 2022 – Aug 2021')).toBeInTheDocument();
  });

  it('expands the latest job only', () => {
    const [latest, ...others] = Array.from(document.querySelectorAll('details'));
    expect(latest).toHaveAttribute('open');
    others.forEach((job) => expect(job).not.toHaveAttribute('open'));
  });

  it('expands a job when its summary is clicked', async () => {
    const futurice = screen.getByRole('heading', { name: 'Futurice' });
    const job = futurice.closest('details');
    expect(job).not.toHaveAttribute('open');

    await userEvent.click(futurice);
    expect(job).toHaveAttribute('open');
  });
});
