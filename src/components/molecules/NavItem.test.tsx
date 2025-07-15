import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { NavItem } from './NavItem';

describe('NavItem', () => {
  it('renders label and icon', () => {
    render(
      <MemoryRouter>
        <NavItem to="/dashboard" label="Dashboard" icon={<span data-testid="icon">I</span>} />
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
  it('applies active state when route matches', () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <NavItem to="/dashboard" label="Dashboard" />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
  });
  it('does not apply active state when route does not match', () => {
    render(
      <MemoryRouter initialEntries={["/other"]}>
        <NavItem to="/dashboard" label="Dashboard" />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute('aria-current');
  });
}); 