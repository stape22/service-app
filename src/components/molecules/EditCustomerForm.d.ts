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
export interface EditCustomerFormProps {
    customer: CustomerData;
    onBack: () => void;
    onSubmit?: (data: any) => void;
    onDelete?: (id: number) => void;
    availableRoofers?: string[];
}
export declare const EditCustomerForm: React.FC<EditCustomerFormProps>;
