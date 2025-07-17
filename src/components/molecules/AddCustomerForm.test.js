import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { AddCustomerForm } from './AddCustomerForm';
import { vi } from 'vitest';
describe('AddCustomerForm', () => {
    const availableRoofers = ['Michael Rodriguez', 'Sarah Johnson'];
    it('renders all required fields', () => {
        render(_jsx(AddCustomerForm, { onBack: () => { }, availableRoofers: availableRoofers }));
        expect(screen.getByLabelText(/Customer Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Contact/i)).toBeInTheDocument();
    });
    it('shows validation errors for required fields', () => {
        render(_jsx(AddCustomerForm, { onBack: () => { }, availableRoofers: availableRoofers }));
        fireEvent.click(screen.getByText(/Save Customer/i));
        expect(screen.getByText(/Customer name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Phone is required/i)).toBeInTheDocument();
    });
    it('calls onSubmit with form data and onBack when valid', () => {
        const onBack = vi.fn();
        const onSubmit = vi.fn();
        render(_jsx(AddCustomerForm, { onBack: onBack, onSubmit: onSubmit, availableRoofers: availableRoofers }));
        fireEvent.change(screen.getByLabelText(/Customer Name/i), { target: { value: 'Jane Customer' } });
        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '555-1234' } });
        fireEvent.click(screen.getByText(/Save Customer/i));
        expect(onSubmit).toHaveBeenCalled();
        expect(onBack).toHaveBeenCalled();
    });
    it('can add and remove contacts', () => {
        render(_jsx(AddCustomerForm, { onBack: () => { }, availableRoofers: availableRoofers }));
        fireEvent.click(screen.getByText(/Add Contact/i));
        expect(screen.getAllByPlaceholderText(/Full Name/i).length).toBe(2);
        fireEvent.click(screen.getAllByText(/Remove/i)[0]);
        expect(screen.getAllByPlaceholderText(/Full Name/i).length).toBe(1);
    });
});
