import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';
import { vi } from 'vitest';
describe('Textarea', () => {
    it('renders with label', () => {
        render(_jsx(Textarea, { label: "Description" }));
        expect(screen.getByText('Description')).toBeInTheDocument();
    });
    it('shows error message', () => {
        render(_jsx(Textarea, { label: "Description", error: "Required" }));
        expect(screen.getByText('Required')).toBeInTheDocument();
    });
    it('calls onChange when value changes', () => {
        const handleChange = vi.fn();
        render(_jsx(Textarea, { label: "Notes", onChange: handleChange }));
        const textarea = screen.getByLabelText('Notes');
        fireEvent.change(textarea, { target: { value: 'test' } });
        expect(handleChange).toHaveBeenCalled();
    });
});
