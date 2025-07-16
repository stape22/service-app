import { render, screen, fireEvent } from '@testing-library/react';
import { EditRooferForm } from './EditRooferForm';
import type { RooferData } from './EditRooferForm';
import { vi } from 'vitest';

describe('EditRooferForm', () => {
  const roofer: RooferData = {
    id: 1,
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '555-1234',
    address: '123 Main St, Springfield, IL',
    availability: 'full-time',
    certifications: ['Licensed', 'Insured'],
    contactCount: 1,
  };

  it('renders all required fields with initial values', () => {
    render(<EditRooferForm roofer={roofer} onBack={() => {}} />);
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue('john@example.com');
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue('555-1234');
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Availability/i)).toBeInTheDocument();
    expect(screen.getByText(/Certifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Notes/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacts/i)).toBeInTheDocument();
  });

  it('calls onBack when Cancel or Back to Roofers List is clicked', () => {
    const onBack = vi.fn();
    render(<EditRooferForm roofer={roofer} onBack={onBack} />);
    fireEvent.click(screen.getAllByText(/Back to Roofers List|Cancel/i)[0]);
    expect(onBack).toHaveBeenCalled();
  });

  it('calls onSubmit with form data and onBack when Save Changes is clicked', () => {
    const onBack = vi.fn();
    const onSubmit = vi.fn();
    render(<EditRooferForm roofer={roofer} onBack={onBack} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.click(screen.getByText(/Save Changes/i));
    expect(onSubmit).toHaveBeenCalled();
    expect(onBack).toHaveBeenCalled();
  });

  it('calls onDelete and onBack when Delete Roofer is confirmed', () => {
    const onBack = vi.fn();
    const onDelete = vi.fn();
    window.confirm = vi.fn(() => true);
    render(<EditRooferForm roofer={roofer} onBack={onBack} onDelete={onDelete} />);
    fireEvent.click(screen.getByText(/Delete Roofer/i));
    expect(onDelete).toHaveBeenCalledWith(roofer.id);
    expect(onBack).toHaveBeenCalled();
  });
}); 