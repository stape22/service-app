import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with text', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
  it('applies variant and size classes', () => {
    render(<Badge variant="primary" size="lg">Primary</Badge>);
    const badge = screen.getByText('Primary');
    expect(badge).toHaveClass('badge-primary');
    expect(badge).toHaveClass('badge-lg');
  });
}); 