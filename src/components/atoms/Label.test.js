import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Label } from './Label';
describe('Label', () => {
    it('renders with text', () => {
        render(_jsx(Label, { htmlFor: "input-id", children: "My Label" }));
        expect(screen.getByText('My Label')).toBeInTheDocument();
    });
    it('has correct htmlFor attribute', () => {
        render(_jsx(Label, { htmlFor: "input-id", children: "Label" }));
        expect(screen.getByText('Label')).toHaveAttribute('for', 'input-id');
    });
});
