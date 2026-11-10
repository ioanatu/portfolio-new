import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderRoute } from '../../testUtils';

describe('SectionButton', () => {
  afterEach(() => vi.restoreAllMocks());

  it('is a link to the home page, styled by the component library', async () => {
    await renderRoute('/');

    const accent = await screen.findByRole('link', { name: 'Check out my skills' });
    const primary = screen.getByRole('link', { name: 'AWS Certifications' });

    expect(accent).toHaveAttribute('href', '/');
    expect(primary).toHaveAttribute('href', '/');
    // The library's primary button is its default style, the accent one has a class of its own
    expect(accent.className).toMatch(/accent/);
    expect(primary.className).not.toMatch(/accent/);
  });

  it('scrolls to its section on a plain click, without following the link', async () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    const { router } = await renderRoute('/');

    await userEvent.click(await screen.findByRole('link', { name: 'Check out my skills' }));

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById('skills'));
    expect(router.state.location.hash).toBe('');
  });

  it('leaves a click with a modifier key to the browser', async () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    await renderRoute('/');
    const link = await screen.findByRole('link', { name: 'AWS Certifications' });

    fireEvent.click(link, { ctrlKey: true });

    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});
