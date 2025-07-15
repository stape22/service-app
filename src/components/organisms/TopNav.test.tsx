import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { TopNav } from './TopNav';

describe('TopNav', () => {
  it('renders logo/brand and navigation links', () => {
    render(
      <MemoryRouter>
        <TopNav userName="Alice" />
      </MemoryRouter>
    );
    expect(screen.getByText('ServiceApp')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Jobs' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Roofers' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Customers' })).toBeInTheDocument();
  });
  it('renders user avatar with initial', () => {
    render(
      <MemoryRouter>
        <TopNav userName="Bob" />
      </MemoryRouter>
    );
    expect(screen.getByText('B')).toBeInTheDocument();
  });
  it('renders avatar fallback if no userName', () => {
    render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );
    expect(screen.getByText('?')).toBeInTheDocument();
  });
}); 