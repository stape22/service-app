import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';
import { vi } from 'vitest';
describe('RadioGroup', () => {
    const options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
    ];
    it('renders with label', () => {
        render(_jsx(RadioGroup, { label: "Choose one", options: options, value: "1", onChange: () => { } }));
        expect(screen.getByText('Choose one')).toBeInTheDocument();
    });
    it('shows error message', () => {
        render(_jsx(RadioGroup, { label: "Choose one", options: options, value: "1", onChange: () => { }, error: "Required" }));
        expect(screen.getByText('Required')).toBeInTheDocument();
    });
    it('calls onChange when a radio is selected', () => {
        const handleChange = vi.fn();
        render(_jsx(RadioGroup, { label: "Choose one", options: options, value: "1", onChange: handleChange }));
        const radio = screen.getByLabelText('Option 2');
        fireEvent.click(radio);
        expect(handleChange).toHaveBeenCalledWith('2');
    });
});
