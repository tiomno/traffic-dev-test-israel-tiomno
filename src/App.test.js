import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app message', () => {
  render(<App />);
  const message = screen.getByText(/Two stunning new Townhome Releases Launching/i);
  expect(message).toBeInTheDocument();
});
