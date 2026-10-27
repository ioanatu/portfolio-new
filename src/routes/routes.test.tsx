import { screen } from '@testing-library/react'
import { renderRoute } from '../test/renderWithRouter'

describe('routes', () => {
  it('renders the home page', async () => {
    await renderRoute('/')
    expect(
      await screen.findByRole('heading', { name: 'Welcome' }),
    ).toBeInTheDocument()
  })

  it('renders the about page', async () => {
    await renderRoute('/about')
    expect(
      await screen.findByRole('heading', { name: 'About' }),
    ).toBeInTheDocument()
  })
})
