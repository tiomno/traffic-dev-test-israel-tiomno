import { render, screen } from '@testing-library/react'
import Header from './index'

test('renders the logo', () => {
  render(<Header />)

  const logo = screen.getByAltText(/Eliston/i)
  expect(logo).toBeInTheDocument()
})
