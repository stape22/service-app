import React from 'react';
export interface CustomerData {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    customerType: 'residential' | 'commercial';
    status: 'active' | 'inactive';
    jobCount: number;
    lastContact: string;
    assignedRoofer: string | null;
}
interface CustomersProps {
    onAddCustomer: () => void;
    onEditCustomer: (customer: CustomerData) => void;
}
export declare const Customers: React.FC<CustomersProps>;
export {};
