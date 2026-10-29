import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('closes the mobile menu after choosing a page', async () => {
    await renderRoute('/');
    await userEvent.click(await screen.findByRole('button', { name: 'Open menu' }));
    const menu = document.getElementById('mobile-menu') as HTMLElement;
    await userEvent.click(menu.querySelector('a[href="/projects"]') as HTMLElement);
    expect(await screen.findByRole('heading', { name: 'Products I’ve helped ship' })).toBeVisible();
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
});
