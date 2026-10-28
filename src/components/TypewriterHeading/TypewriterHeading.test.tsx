import { act, render, screen } from '@testing-library/react';
import { TypewriterHeading } from './TypewriterHeading';

describe('TypewriterHeading', () => {
  afterEach(() => vi.useRealTimers());

  it('gives screen readers the plain text', () => {
    render(<TypewriterHeading id="title" lines={['Hello there', 'good morning']} />);
    expect(screen.getByRole('heading', { name: 'Hello there good morning' })).toBeInTheDocument();
  });

  it('reports when the words have nearly all landed', () => {
    vi.useFakeTimers();
    const onSettle = vi.fn();
    render(<TypewriterHeading id="title" lines={['one two']} onSettle={onSettle} />);
    expect(onSettle).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(onSettle).toHaveBeenCalledTimes(1);
  });
});
