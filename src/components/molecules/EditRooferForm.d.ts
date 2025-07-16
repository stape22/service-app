import React from 'react';
export interface RooferData {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    availability: 'full-time' | 'part-time';
    certifications: string[];
    contactCount: number;
}
export interface EditRooferFormProps {
    roofer: RooferData;
    onBack: () => void;
    onSubmit?: (data: any) => void;
    onDelete?: (id: number) => void;
}
export declare const EditRooferForm: React.FC<EditRooferFormProps>;
