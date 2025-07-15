import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Label } from './Label';

describe('Label', () => {
  it('renders with text', () => {
    render(<Label htmlFor="input-id">My Label</Label>);
    expect(screen.getByText('My Label')).toBeInTheDocument();
  });
  it('has correct htmlFor attribute', () => {
    render(<Label htmlFor="input-id">Label</Label>);
    expect(screen.getByText('Label')).toHaveAttribute('for', 'input-id');
  });
}); 