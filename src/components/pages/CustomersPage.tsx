import { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { Customers } from '../organisms/Customers';
import { AddCustomerForm } from '../molecules/AddCustomerForm';
import { EditCustomerForm } from '../molecules/EditCustomerForm';
import { Modal } from '../atoms/Modal';
import type { CustomerData } from '../organisms/Customers';

const initialCustomers: CustomerData[] = [
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
  },
  {
    id: 2,
    fullName: 'ABC Corporation',
    email: 'contact@abccorp.com',
    phone: '(555) 987-6543',
    address: '456 Business Ave, Chicago, IL 60601',
    customerType: 'commercial',
    status: 'active',
    jobCount: 8,
    lastContact: '2024-01-20',
    assignedRoofer: 'Sarah Johnson'
  },
  {
    id: 3,
    fullName: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '(555) 234-5678',
    address: '789 Oak Drive, Peoria, IL 61602',
    customerType: 'residential',
    status: 'active',
    jobCount: 1,
    lastContact: '2024-01-10',
    assignedRoofer: 'David Thompson'
  },
  {
    id: 4,
    fullName: 'Tech Solutions Inc.',
    email: 'info@techsolutions.com',
    phone: '(555) 345-6789',
    address: '321 Corporate Blvd, Rockford, IL 61101',
    customerType: 'commercial',
    status: 'inactive',
    jobCount: 0,
    lastContact: '2023-12-05',
    assignedRoofer: null
  },
  {
    id: 5,
    fullName: 'Robert Johnson',
    email: 'rob.johnson@email.com',
    phone: '(555) 456-7890',
    address: '654 Pine Street, Decatur, IL 62521',
    customerType: 'residential',
    status: 'active',
    jobCount: 5,
    lastContact: '2024-01-18',
    assignedRoofer: 'Jennifer Martinez'
  }
];

const availableRoofers = [
  'Michael Rodriguez',
  'Sarah Johnson',
  'David Thompson',
  'Jennifer Martinez',
  'Robert Wilson'
];

export const CustomersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('customers');
  const [customers, setCustomers] = useState<CustomerData[]>(initialCustomers);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showEditCustomer, setShowEditCustomer] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (page: string) => setCurrentPage(page);
  const handleAddCustomer = () => setShowAddCustomer(true);
  const handleAddCustomerSubmit = (data: any) => {
    setCustomers(prev => [
      ...prev,
      {
        id: Date.now(),
        fullName: data.customerName,
        email: data.email,
        phone: data.phone,
        address: `${data.streetAddress}, ${data.city}, ${data.state} ${data.zipCode}`,
        customerType: data.customerType as 'residential' | 'commercial',
        status: 'active',
        jobCount: 0,
        lastContact: new Date().toISOString().slice(0, 10),
        assignedRoofer: data.assignedRoofer || null
      }
    ]);
  };
  const handleEditCustomer = (customer: CustomerData) => {
    setCustomerToEdit(customer);
    setShowEditCustomer(true);
  };
  const handleEditCustomerSubmit = (data: any) => {
    setCustomers(prev => prev.map(c =>
      c.id === data.id
        ? {
            ...c,
            fullName: data.customerName,
            email: data.email,
            phone: data.phone,
            address: `${data.streetAddress}, ${data.city}, ${data.state} ${data.zipCode}`,
            customerType: data.customerType as 'residential' | 'commercial',
            assignedRoofer: data.assignedRoofer || null
          }
        : c
    ));
    setShowEditCustomer(false);
    setCustomerToEdit(null);
  };
  const handleDeleteCustomer = (id: number) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    setShowEditCustomer(false);
    setCustomerToEdit(null);
  };

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={handlePageChange}>
      <Customers 
        customers={customers} 
        onAddCustomer={handleAddCustomer} 
        onEditCustomer={handleEditCustomer}
        isLoading={isLoading}
      />
      <Modal isOpen={showAddCustomer} onClose={() => setShowAddCustomer(false)} title="Add Customer">
        <AddCustomerForm
          onBack={() => setShowAddCustomer(false)}
          onSubmit={handleAddCustomerSubmit}
          availableRoofers={availableRoofers}
        />
      </Modal>
      <Modal isOpen={showEditCustomer} onClose={() => setShowEditCustomer(false)} title="Edit Customer">
        {customerToEdit && (
          <EditCustomerForm
            customer={customerToEdit}
            onBack={() => setShowEditCustomer(false)}
            onSubmit={handleEditCustomerSubmit}
            onDelete={handleDeleteCustomer}
            availableRoofers={availableRoofers}
          />
        )}
      </Modal>
    </DashboardLayout>
  );
}; 