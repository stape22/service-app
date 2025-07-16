import { render, screen, fireEvent } from '@testing-library/react';
import { Customers } from './Customers';

const mockOnAddCustomer = jest.fn();
const mockOnEditCustomer = jest.fn();

describe('Customers organism', () => {
  beforeEach(() => {
    mockOnAddCustomer.mockClear();
    mockOnEditCustomer.mockClear();
  });

  it('renders the customer table with correct headers and rows', () => {
    render(<Customers onAddCustomer={mockOnAddCustomer} onEditCustomer={mockOnEditCustomer} />);
    // Check table headers
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Assigned Roofer/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();
    // Check at least one customer row
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('john.smith@email.com')).toBeInTheDocument();
    expect(screen.getByText('Michael Rodriguez')).toBeInTheDocument();
  });

  it('calls onAddCustomer when Add Customer button is clicked', () => {
    render(<Customers onAddCustomer={mockOnAddCustomer} onEditCustomer={mockOnEditCustomer} />);
    const addButton = screen.getByText(/Add Customer/i);
    fireEvent.click(addButton);
    expect(mockOnAddCustomer).toHaveBeenCalled();
  });

  it('calls onEditCustomer when Edit button is clicked', () => {
    render(<Customers onAddCustomer={mockOnAddCustomer} onEditCustomer={mockOnEditCustomer} />);
    const editButtons = screen.getAllByText(/Edit/i);
    expect(editButtons.length).toBeGreaterThan(0);
    fireEvent.click(editButtons[0]);
    expect(mockOnEditCustomer).toHaveBeenCalled();
  });
}); 