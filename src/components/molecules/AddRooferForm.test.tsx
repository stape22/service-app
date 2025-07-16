import { render, screen, fireEvent } from '@testing-library/react';
import { AddRooferForm } from './AddRooferForm';
import { vi } from 'vitest';

describe('AddRooferForm', () => {
  it('renders all required fields', () => {
    render(<AddRooferForm onBack={() => {}} />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Availability/i)).toBeInTheDocument();
    expect(screen.getByText(/Certifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Notes/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacts/i)).toBeInTheDocument();
  });

  it('can add and remove contacts', () => {
    render(<AddRooferForm onBack={() => {}} />);
    fireEvent.click(screen.getByText(/Add Contact/i));
    expect(screen.getAllByPlaceholderText(/Full Name/i).length).toBe(2);
    fireEvent.click(screen.getAllByText(/Remove/i)[0]);
    expect(screen.getAllByPlaceholderText(/Full Name/i).length).toBe(1);
  });

  it('calls onBack when Cancel or Back to Roofers List is clicked', () => {
    const onBack = vi.fn();
    render(<AddRooferForm onBack={onBack} />);
    fireEvent.click(screen.getAllByText(/Back to Roofers List|Cancel/i)[0]);
    expect(onBack).toHaveBeenCalled();
  });

  it('calls onSubmit with form data and onBack when Save Roofer is clicked', () => {
    const onBack = vi.fn();
    const onSubmit = vi.fn();
    render(<AddRooferForm onBack={onBack} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test Roofer' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '555-1234' } });
    fireEvent.click(screen.getByText(/Save Roofer/i));
    expect(onSubmit).toHaveBeenCalled();
    expect(onBack).toHaveBeenCalled();
  });
}); 