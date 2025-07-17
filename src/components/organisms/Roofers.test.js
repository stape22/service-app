import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Roofers } from './Roofers';
const mockRoofers = [
    {
        id: 1,
        fullName: 'Michael Rodriguez',
        email: 'michael.r@example.com',
        phone: '(555) 123-4567',
        address: '1234 Oak Street',
        availability: 'full-time',
        certifications: ['Licensed', 'Insured'],
        contactCount: 3
    },
    {
        id: 2,
        fullName: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '(555) 987-6543',
        address: '1234 Oak Street',
        availability: 'part-time',
        certifications: ['Licensed', 'Insured', 'Bonded'],
        contactCount: 2
    }
];
const mockOnAddRoofer = vi.fn();
const mockOnEditRoofer = vi.fn();
describe('Roofers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('renders the page header correctly', () => {
        render(_jsx(Roofers, { roofers: mockRoofers, onAddRoofer: mockOnAddRoofer, onEditRoofer: mockOnEditRoofer }));
        expect(screen.getByText('Roofers')).toBeInTheDocument();
        expect(screen.getByText('Manage all roofer profiles and their associated contacts')).toBeInTheDocument();
        expect(screen.getByText('Add Roofer')).toBeInTheDocument();
    });
    it('renders roofer data in the table', () => {
        render(_jsx(Roofers, { roofers: mockRoofers, onAddRoofer: mockOnAddRoofer, onEditRoofer: mockOnEditRoofer }));
        expect(screen.getByText('Michael Rodriguez')).toBeInTheDocument();
        expect(screen.getByText('michael.r@example.com')).toBeInTheDocument();
        expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
        expect(screen.getByText('1234 Oak Street')).toBeInTheDocument();
        expect(screen.getByText('Full-time')).toBeInTheDocument();
        expect(screen.getByText('Licensed')).toBeInTheDocument();
        expect(screen.getByText('Insured')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });
    it('calls onAddRoofer when Add Roofer button is clicked', () => {
        render(_jsx(Roofers, { roofers: mockRoofers, onAddRoofer: mockOnAddRoofer, onEditRoofer: mockOnEditRoofer }));
        fireEvent.click(screen.getByText('Add Roofer'));
        expect(mockOnAddRoofer).toHaveBeenCalledTimes(1);
    });
    it('calls onEditRoofer when a roofer name is clicked', () => {
        render(_jsx(Roofers, { roofers: mockRoofers, onAddRoofer: mockOnAddRoofer, onEditRoofer: mockOnEditRoofer }));
        fireEvent.click(screen.getByText('Michael Rodriguez'));
        expect(mockOnEditRoofer).toHaveBeenCalledWith(mockRoofers[0]);
    });
    it('renders table headers with sort functionality', () => {
        render(_jsx(Roofers, { roofers: mockRoofers, onAddRoofer: mockOnAddRoofer, onEditRoofer: mockOnEditRoofer }));
        expect(screen.getByText('Full Name')).toBeInTheDocument();
        expect(screen.getByText('Email Address')).toBeInTheDocument();
        expect(screen.getByText('Phone Number')).toBeInTheDocument();
        expect(screen.getByText('Address')).toBeInTheDocument();
        expect(screen.getByText('Availability')).toBeInTheDocument();
        expect(screen.getByText('Certifications')).toBeInTheDocument();
        expect(screen.getByText('# of Contacts')).toBeInTheDocument();
    });
});
