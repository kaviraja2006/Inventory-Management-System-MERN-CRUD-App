import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation and brand title', () => {
  render(<App />);
  const brandTitle = screen.getByText(/IMS/i);
  expect(brandTitle).toBeInTheDocument();
  
  const productsNav = screen.getByText(/Products/i);
  expect(productsNav).toBeInTheDocument();
});

test('renders home greeting text', () => {
  render(<App />);
  const homeText = screen.getByText(/Go to Products Section/i);
  expect(homeText).toBeInTheDocument();
});
