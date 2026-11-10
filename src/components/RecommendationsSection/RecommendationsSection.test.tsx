import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RECOMMENDATIONS } from '../../content/recommendations';
import { RecommendationsSection } from './RecommendationsSection';

describe('RecommendationsSection', () => {
  it('keeps the section title', () => {
    render(<RecommendationsSection />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'What former colleagues say' }),
    ).toBeVisible();
  });

  it('takes every highlight word for word from its recommendation', () => {
    RECOMMENDATIONS.forEach(({ highlight, description }) => {
      expect(description.join(' ')).toContain(highlight);
    });
  });

  it('shows each highlight with its author and role, and keeps the full text collapsed', () => {
    render(<RecommendationsSection />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(RECOMMENDATIONS.length);
    RECOMMENDATIONS.forEach(({ author, role, highlight, description }, i) => {
      expect(within(items[i]).getByRole('heading', { level: 3, name: author })).toBeVisible();
      expect(items[i]).toHaveTextContent(role);
      expect(within(items[i]).getByText(highlight)).toBeVisible();
      expect(within(items[i]).getByText(description[description.length - 1])).not.toBeVisible();
    });
  });

  it('expands and collapses the full recommendation with the more button', async () => {
    render(<RecommendationsSection />);
    const { author, description } = RECOMMENDATIONS[0];
    const card = within(screen.getAllByRole('listitem')[0]);
    const button = card.getByRole('button', { name: `Read more: recommendation from ${author}` });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAccessibleName(`Show less: recommendation from ${author}`);
    description.forEach((paragraph) => expect(card.getByText(paragraph)).toBeVisible());

    await userEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(card.getByText(description[0])).not.toBeVisible();
  });

  it('keeps only one recommendation open at a time', async () => {
    render(<RecommendationsSection />);
    const [first, second] = screen.getAllByRole('button');

    await userEvent.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(first).toHaveAttribute('aria-expanded', 'false');
  });
});
