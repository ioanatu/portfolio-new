import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PAGE_NAV_ITEMS, SECTION_NAV_ITEMS } from '../../content/navigation';
import { renderRoute } from '../../testUtils';

describe('Header', () => {
  it('opens and closes the mobile menu', async () => {
    await renderRoute('/');
    const button = await screen.findByRole('button', { name: 'Open menu' });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(button);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  });

  it('links the navbar to every section of the home page', async () => {
    await renderRoute('/');
    const nav = await screen.findByRole('navigation', { name: 'Main' });
    SECTION_NAV_ITEMS.forEach(({ label, sectionId }) => {
      expect(within(nav).getByRole('link', { name: label, hidden: true })).toHaveAttribute(
        'href',
        `/#${sectionId}`,
      );
    });
  });

  it('scrolls back to a section whose link was already followed', async () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    await renderRoute('/');
    const { label, sectionId } = SECTION_NAV_ITEMS[0];
    const nav = await screen.findByRole('navigation', { name: 'Main' });
    const link = within(nav).getByRole('link', { name: label, hidden: true });

    await userEvent.click(link);
    scrollIntoView.mockClear();

    await userEvent.click(link);
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById(sectionId));
  });

  it('closes the mobile menu when clicking elsewhere on the page', async () => {
    renderRoute('/');
    await userEvent.click(await screen.findByRole('button', { name: 'Open menu' }));
    const menu = document.getElementById('mobile-menu') as HTMLElement;

    await userEvent.click(menu);
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();

    await userEvent.click(document.body);
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
  });

  it('lists the same sections in the mobile menu', async () => {
    await renderRoute('/');
    await userEvent.click(await screen.findByRole('button', { name: 'Open menu' }));
    const menu = within(document.getElementById('mobile-menu') as HTMLElement);
    SECTION_NAV_ITEMS.forEach(({ label, sectionId }) => {
      expect(menu.getByRole('link', { name: label })).toHaveAttribute('href', `/#${sectionId}`);
    });
  });

  it('closes the mobile menu after choosing a section', async () => {
    await renderRoute('/');
    await userEvent.click(await screen.findByRole('button', { name: 'Open menu' }));
    const menu = document.getElementById('mobile-menu') as HTMLElement;
    await userEvent.click(menu.querySelector('a[href="/#certifications"]') as HTMLElement);
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
  });

  it('switches theme and remembers the choice', async () => {
    localStorage.clear();
    await renderRoute('/');
    await userEvent.click(await screen.findByRole('button', { name: 'Switch to dark theme' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('it-theme')).toBe('dark');
    await userEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('lists the CV versions in a menu that closes with Escape', async () => {
    await renderRoute('/');
    const trigger = await screen.findByRole('button', { name: 'View Resume' });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const ats = screen.getByRole('menuitem', { name: /ATS format/ });
    expect(ats.getAttribute('href')).toMatch(/IoanaTatu_ATS_resume.*\.pdf$/);
    expect(ats).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('menuitem', { name: /Human eye/ }).getAttribute('href')).toMatch(
      /IoanaTatu_Human.*\.pdf$/,
    );

    await userEvent.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });

  it('moves through the CV versions with the arrow keys', async () => {
    await renderRoute('/');
    const trigger = await screen.findByRole('button', { name: 'View Resume' });
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: /ATS format/ })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: /Human eye/ })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: /ATS format/ })).toHaveFocus();
  });

  it('links the navbar to the design archive and marks it as the current page there', async () => {
    await renderRoute('/design-archive');
    const nav = await screen.findByRole('navigation', { name: 'Main' });
    const link = within(nav).getByRole('link', { name: 'Design archive', hidden: true });

    expect(link).toHaveAttribute('href', '/design-archive');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('opens the design archive from the navbar', async () => {
    await renderRoute('/');
    const nav = await screen.findByRole('navigation', { name: 'Main' });
    await userEvent.click(within(nav).getByRole('link', { name: 'Design archive', hidden: true }));

    expect(await screen.findByText(/This page is work in progress/)).toBeInTheDocument();
  });

  it('lists the design archive in the mobile menu', async () => {
    await renderRoute('/');
    await userEvent.click(await screen.findByRole('button', { name: 'Open menu' }));

    expect(
      within(document.getElementById('mobile-menu')!).getByRole('link', { name: 'Design archive' }),
    ).toHaveAttribute('href', '/design-archive');
  });

  it('lists Projects after Education, then the pages after a gap', async () => {
    await renderRoute('/');
    const nav = await screen.findByRole('navigation', { name: 'Main' });
    const labels = within(nav)
      .getAllByRole('link', { hidden: true })
      .map((link) => link.textContent);

    const sections = SECTION_NAV_ITEMS.map(({ label }) => label);
    expect(sections.slice(-2)).toEqual(['Education', 'Projects']);
    const pages = PAGE_NAV_ITEMS.map(({ label }) => label);
    expect(labels.slice(labels.indexOf(sections[0]))).toEqual(
      expect.arrayContaining([...sections, ...pages]),
    );
    expect(labels.indexOf('Projects')).toBeLessThan(labels.indexOf(pages[0]));
  });

  it('separates the pages from the sections in the mobile menu', async () => {
    await renderRoute('/');
    await userEvent.click(await screen.findByRole('button', { name: 'Open menu' }));
    const menu = document.getElementById('mobile-menu') as HTMLElement;
    const items = [...menu.querySelectorAll('li')];
    const projects = items.findIndex((item) => item.textContent === 'Projects');
    const designArchive = items.findIndex((item) => item.textContent === 'Design archive');

    expect(items[projects + 1]).toHaveAttribute('aria-hidden', 'true');
    expect(designArchive).toBe(projects + 2);
  });

  it('keeps the URL hash on the section in view', async () => {
    type Change = (entries: unknown[]) => void;
    const observers: { onChange: Change; targets: Element[] }[] = [];
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        entry: { onChange: Change; targets: Element[] };
        constructor(onChange: Change) {
          this.entry = { onChange, targets: [] };
          observers.push(this.entry);
        }
        observe(target: Element) {
          this.entry.targets.push(target);
        }
        unobserve() {}
        disconnect() {}
      },
    );
    const { router } = await renderRoute('/');
    await screen.findByRole('navigation', { name: 'Main' });
    expect(router.state.location.hash).toBe('');

    const skills = document.getElementById('skills') as HTMLElement;
    await act(async () => {
      observers
        .filter(({ targets }) => targets.includes(skills))
        .forEach(({ onChange }) => onChange([{ target: skills, isIntersecting: true }]));
    });

    expect(router.state.location.hash).toBe('skills');
  });
});
