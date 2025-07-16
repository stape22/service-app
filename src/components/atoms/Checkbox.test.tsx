import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Checkbox label="Accept" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('toggles checked state', () => {
    render(<Checkbox label="Check me" />);
    const input = screen.getByRole('checkbox');
    expect(input).not.toBeChecked();
    fireEvent.click(input);
    expect(input).toBeChecked();
  });
}); 