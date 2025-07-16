import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import { vi } from 'vitest';
describe('Select', () => {
    const options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
    ];
    it('renders with label', () => {
        render(_jsx(Select, { label: "Choose one", options: options, value: "1", onChange: () => { } }));
        expect(screen.getByText('Choose one')).toBeInTheDocument();
    });
    it('shows error message', () => {
        render(_jsx(Select, { label: "Choose one", options: options, value: "1", onChange: () => { }, error: "Required" }));
        expect(screen.getByText('Required')).toBeInTheDocument();
    });
    it('calls onChange when a new option is selected', () => {
        const handleChange = vi.fn();
        render(_jsx(Select, { label: "Choose one", options: options, value: "1", onChange: handleChange }));
        const select = screen.getByLabelText('Choose one');
        fireEvent.change(select, { target: { value: '2' } });
        expect(handleChange).toHaveBeenCalled();
    });
});
