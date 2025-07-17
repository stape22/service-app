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
    roofers: RooferData[];
    onAddRoofer: () => void;
    onEditRoofer: (roofer: RooferData) => void;
    onDeleteRoofer?: (id: number) => void;
}
export declare const Roofers: React.FC<RoofersProps>;
export {};
