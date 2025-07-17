import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { Customers } from './Customers';
const mockOnAddCustomer = jest.fn();
const mockOnEditCustomer = jest.fn();
const mockCustomers = [
    {
        id: 1,
        fullName: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        address: '123 Main Street, Springfield, IL 62701',
        customerType: 'residential',
        status: 'active',
        jobCount: 3,
        lastContact: '2024-01-15',
        assignedRoofer: 'Michael Rodriguez'
    }
];
describe('Customers organism', () => {
    beforeEach(() => {
        mockOnAddCustomer.mockClear();
        mockOnEditCustomer.mockClear();
    });
    it('renders the customer table with correct headers and rows', () => {
        render(_jsx(Customers, { customers: mockCustomers, onAddCustomer: mockOnAddCustomer, onEditCustomer: mockOnEditCustomer }));
        // Check table headers
        expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByText(/Address/i)).toBeInTheDocument();
        expect(screen.getByText(/Type/i)).toBeInTheDocument();
        expect(screen.getByText(/Status/i)).toBeInTheDocument();
        expect(screen.getByText(/Assigned Roofer/i)).toBeInTheDocument();
        expect(screen.getByText(/# of Jobs/i)).toBeInTheDocument();
        expect(screen.getByText(/Last Contact/i)).toBeInTheDocument();
        // Check at least one customer row
        expect(screen.getByText('John Smith')).toBeInTheDocument();
        expect(screen.getByText('john.smith@email.com')).toBeInTheDocument();
        expect(screen.getByText('Michael Rodriguez')).toBeInTheDocument();
    });
    it('calls onAddCustomer when Add Customer button is clicked', () => {
        render(_jsx(Customers, { customers: mockCustomers, onAddCustomer: mockOnAddCustomer, onEditCustomer: mockOnEditCustomer }));
        const addButton = screen.getByText(/Add Customer/i);
        fireEvent.click(addButton);
        expect(mockOnAddCustomer).toHaveBeenCalled();
    });
    it('calls onEditCustomer when customer name is clicked', () => {
        render(_jsx(Customers, { customers: mockCustomers, onAddCustomer: mockOnAddCustomer, onEditCustomer: mockOnEditCustomer }));
        const customerNameButton = screen.getByText('John Smith');
        fireEvent.click(customerNameButton);
        expect(mockOnEditCustomer).toHaveBeenCalledWith(mockCustomers[0]);
    });
    it('displays customer type badges correctly', () => {
        render(_jsx(Customers, { customers: mockCustomers, onAddCustomer: mockOnAddCustomer, onEditCustomer: mockOnEditCustomer }));
        expect(screen.getByText('Residential')).toBeInTheDocument();
    });
    it('displays status badges correctly', () => {
        render(_jsx(Customers, { customers: mockCustomers, onAddCustomer: mockOnAddCustomer, onEditCustomer: mockOnEditCustomer }));
        expect(screen.getByText('Active')).toBeInTheDocument();
    });
});
