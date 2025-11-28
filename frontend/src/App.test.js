import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hospital scheduler header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Hospital Scheduler/i);
  expect(headerElement).toBeInTheDocument();
});