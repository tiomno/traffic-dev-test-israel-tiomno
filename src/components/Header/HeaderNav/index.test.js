import { render, screen } from '@testing-library/react'
import HeaderNav from './index'

test('renders nav menu', () => {
  render(<HeaderNav />)

  let linkElement = screen.getByText(/VISIT HOUR SALE CENTRE/i)
  expect(linkElement).toBeInTheDocument()

  linkElement = screen.getByText(/1300 354 786/i)
  expect(linkElement).toBeInTheDocument()

  const icons = screen.getAllByRole('img')
  expect(icons.length).toBe(2)
})
