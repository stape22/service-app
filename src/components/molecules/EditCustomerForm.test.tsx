import { render, screen, fireEvent } from '@testing-library/react';
import { EditCustomerForm } from './EditCustomerForm';
import type { CustomerData } from './EditCustomerForm';
import { vi } from 'vitest';

describe('EditCustomerForm', () => {
  const customer: CustomerData = {
    id: 1,
    fullName: 'Jane Customer',
    email: 'jane@example.com',
    phone: '555-1234',
    address: '123 Main St, Springfield IL 12345',
    customerType: 'residential',
    status: 'active',
    jobCount: 2,
    lastContact: '2024-01-01',
    assignedRoofer: 'Michael Rodriguez',
  };
  const availableRoofers = ['Michael Rodriguez', 'Sarah Johnson'];
  it('renders all required fields with initial values', () => {
    render(<EditCustomerForm customer={customer} onBack={() => {}} availableRoofers={availableRoofers} />);
    expect(screen.getByLabelText(/Customer Name/i)).toHaveValue('Jane Customer');
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue('jane@example.com');
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue('555-1234');
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Contact/i)).toBeInTheDocument();
  });
  it('shows validation errors for required fields', () => {
    render(<EditCustomerForm customer={customer} onBack={() => {}} availableRoofers={availableRoofers} />);
    fireEvent.change(screen.getByLabelText(/Customer Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '' } });
    fireEvent.click(screen.getByText(/Save Changes/i));
    expect(screen.getByText(/Customer name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone is required/i)).toBeInTheDocument();
  });
  it('calls onSubmit with updated data and onBack when valid', () => {
    const onBack = vi.fn();
    const onSubmit = vi.fn();
    render(<EditCustomerForm customer={customer} onBack={onBack} onSubmit={onSubmit} availableRoofers={availableRoofers} />);
    fireEvent.change(screen.getByLabelText(/Customer Name/i), { target: { value: 'Updated Name' } });
    fireEvent.click(screen.getByText(/Save Changes/i));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ customerName: 'Updated Name', id: customer.id }));
    expect(onBack).toHaveBeenCalled();
  });
  it('can add and remove contacts', () => {
    render(<EditCustomerForm customer={customer} onBack={() => {}} availableRoofers={availableRoofers} />);
    fireEvent.click(screen.getByText(/Add Contact/i));
    expect(screen.getAllByPlaceholderText(/Full Name/i).length).toBe(2);
    fireEvent.click(screen.getAllByText(/Remove/i)[0]);
    expect(screen.getAllByPlaceholderText(/Full Name/i).length).toBe(1);
  });
  it('calls onDelete and onBack when Delete Customer is confirmed', () => {
    const onBack = vi.fn();
    const onDelete = vi.fn();
    window.confirm = vi.fn(() => true);
    render(<EditCustomerForm customer={customer} onBack={onBack} onDelete={onDelete} availableRoofers={availableRoofers} />);
    fireEvent.click(screen.getByText(/Delete Customer/i));
    expect(onDelete).toHaveBeenCalledWith(customer.id);
    expect(onBack).toHaveBeenCalled();
  });
}); 