import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { NavItem } from './NavItem';
describe('NavItem', () => {
    it('renders label and icon', () => {
        render(_jsx(MemoryRouter, { children: _jsx(NavItem, { to: "/dashboard", label: "Dashboard", icon: _jsx("span", { "data-testid": "icon", children: "I" }) }) }));
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
    it('applies active state when route matches', () => {
        render(_jsx(MemoryRouter, { initialEntries: ["/dashboard"], children: _jsx(NavItem, { to: "/dashboard", label: "Dashboard" }) }));
        expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
    });
    it('does not apply active state when route does not match', () => {
        render(_jsx(MemoryRouter, { initialEntries: ["/other"], children: _jsx(NavItem, { to: "/dashboard", label: "Dashboard" }) }));
        expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute('aria-current');
    });
});
