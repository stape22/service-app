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
interface RoofersProps {
    onAddRoofer: () => void;
    onEditRoofer: (roofer: RooferData) => void;
}
export declare const Roofers: React.FC<RoofersProps>;
export {};
