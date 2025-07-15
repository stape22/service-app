import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders logo/brand and navigation links', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText('ServiceApp')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Jobs' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Roofers' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Customers' })).toBeInTheDocument();
  });
}); 