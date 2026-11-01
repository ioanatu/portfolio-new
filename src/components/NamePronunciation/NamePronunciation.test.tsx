import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nameAudio from '../../assets/name.ogg';
import { PRONUNCIATION_LABEL } from '../../content/hero';
import { renderRoute } from '../../testUtils';
import { NamePronunciation, PronunciationButton } from './NamePronunciation';

const stubAudio = () => {
  const instances: {
    src: string;
    currentTime: number;
    play: ReturnType<typeof vi.fn>;
    emit: (event: string) => void;
  }[] = [];
  vi.stubGlobal(
    'Audio',
    class {
      src: string;
      currentTime = 0;
      play = vi.fn(() => Promise.resolve());
      pause = vi.fn();
      listeners: Record<string, () => void> = {};
      constructor(src: string) {
        this.src = src;
        instances.push(this);
      }
      addEventListener(event: string, listener: () => void) {
        this.listeners[event] = listener;
      }
      emit(event: string) {
        this.listeners[event]?.();
      }
    },
  );
  return instances;
};

describe('NamePronunciation', () => {
  it('shows the name with a tooltip that explains the button', () => {
    render(
      <NamePronunciation>
        <span>ioana</span>
      </NamePronunciation>,
    );

    expect(screen.getByText('ioana')).toBeInTheDocument();
    expect(screen.getByText(PRONUNCIATION_LABEL, { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: PRONUNCIATION_LABEL, hidden: true })).toBeVisible();
  });

  it('plays the recording from the start when the button is clicked', async () => {
    const audio = stubAudio();
    render(
      <NamePronunciation>
        <span>ioana</span>
      </NamePronunciation>,
    );
    const button = screen.getByRole('button', { name: PRONUNCIATION_LABEL, hidden: true });

    await userEvent.click(button);
    audio[0].currentTime = 2;
    await userEvent.click(button);

    expect(audio).toHaveLength(1);
    expect(audio[0].src).toBe(nameAudio);
    expect(audio[0].play).toHaveBeenCalledTimes(2);
    expect(audio[0].currentTime).toBe(0);
  });

  it('keeps the tooltip open while the recording plays, then closes it at once', async () => {
    const audio = stubAudio();
    render(
      <NamePronunciation>
        <span>ioana</span>
      </NamePronunciation>,
    );
    const button = screen.getByRole('button', { name: PRONUNCIATION_LABEL, hidden: true });
    const tooltip = button.closest('.tooltip');
    expect(tooltip).not.toHaveClass('open');

    await userEvent.click(button);
    act(() => audio[0].emit('play'));
    expect(tooltip).toHaveClass('open');

    act(() => audio[0].emit('ended'));
    expect(tooltip).not.toHaveClass('open');
  });

  it('gives keyboard users a button that plays the recording too', async () => {
    const audio = stubAudio();
    render(<PronunciationButton />);

    await userEvent.tab();
    expect(screen.getByRole('button', { name: PRONUNCIATION_LABEL })).toHaveFocus();
    await userEvent.keyboard('{Enter}');

    expect(audio[0].play).toHaveBeenCalledTimes(1);
  });

  it('is attached to the name in the hero heading', async () => {
    await renderRoute('/');
    const heading = await screen.findByRole('heading', { level: 1, name: /Hey there, I’m ioana/ });

    expect(heading).toHaveTextContent(PRONUNCIATION_LABEL);
    expect(screen.getAllByRole('button', { name: PRONUNCIATION_LABEL, hidden: true })).toHaveLength(
      2,
    );
  });
});
