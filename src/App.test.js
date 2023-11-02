import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved, queryByText } from '@testing-library/react';
import App from './App';

test('Verifying initial loading text in Home Page', async () => {
  render(<App />);
  const initialLoadElement = screen.getByText(/Loading initial Table Data/i);
  expect(initialLoadElement).toBeInTheDocument();
});

test('Verifying initial async data load in Home Page', async () => {
  render(<App />);
  const initialLoadElement = screen.getByText(/Loading initial Table Data/i);
  await waitForElementToBeRemoved(initialLoadElement).then(async () => {
    const headerElement = await screen.getByText(/React Virtualized Infinite Scroll Demo/i);
    expect(headerElement).toBeInTheDocument();
  })
});

test('Verifying /questions route', async () => {
  render(<App />);
  const initialLoadElement = screen.getByText(/Loading initial Table Data/i);
  await waitForElementToBeRemoved(initialLoadElement).then(async () => {
    fireEvent.click(screen.getByText(/questions/i))
    expect(screen.getByText(/Questions and Answers/i)).toBeInTheDocument()
  })
});

test('Verifying /pagination route', async () => {
  render(<App />);
  const initialLoadElement = screen.getByText(/Loading initial Table Data/i);
  await waitForElementToBeRemoved(initialLoadElement).then(async () => {
    fireEvent.click(screen.getByRole('link', {name: /pagination/i}))
    expect(screen.getByText(/Table Data with Pagination/i)).toBeInTheDocument()
  })
});