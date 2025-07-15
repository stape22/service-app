import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Badge } from './Badge';
describe('Badge', () => {
    it('renders with text', () => {
        render(_jsx(Badge, { children: "Active" }));
        expect(screen.getByText('Active')).toBeInTheDocument();
    });
    it('applies variant and size classes', () => {
        render(_jsx(Badge, { variant: "primary", size: "lg", children: "Primary" }));
        const badge = screen.getByText('Primary');
        expect(badge).toHaveClass('badge-primary');
        expect(badge).toHaveClass('badge-lg');
    });
});
