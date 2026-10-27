import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRoute } from '../test/renderWithRouter'

// jsdom has no canvas; the wave surface bails out without a 2D context
beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
})

describe('routes', () => {
  it('renders the home page with the menu as links', async () => {
    await renderRoute('/')
    expect(
      await screen.findByRole('heading', { name: 'Hello' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(6)
  })

  it('shows the section of the category in the URL and marks it current', async () => {
    await renderRoute('/film')
    expect(
      await screen.findByRole('heading', { name: 'Film' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Film' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('switches section when a menu item is clicked', async () => {
    await renderRoute('/')
    await userEvent.click(
      await screen.findByRole('link', { name: 'AWS Certifications' }),
    )
    expect(
      await screen.findByRole('heading', { name: 'AWS Certifications' }),
    ).toBeInTheDocument()
  })

  it('redirects unknown categories to home', async () => {
    await renderRoute('/nope')
    expect(
      await screen.findByRole('heading', { name: 'Hello' }),
    ).toBeInTheDocument()
  })

  it('shows the three AWS badges on the AWS Certifications page', async () => {
    await renderRoute('/aws-certifications')
    expect(await screen.findAllByRole('img')).toHaveLength(3)
    expect(screen.getByRole('img', { name: /CLF-C02/ })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /AIF-C01/ })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /SAA-C03/ })).toBeInTheDocument()
    expect(screen.getAllByText(/^(Oct 2021|Sep 2026|Oct 2026)$/)).toHaveLength(
      3,
    )
  })
})
