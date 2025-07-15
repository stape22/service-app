import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { AuthForm } from './AuthForm';
describe('AuthForm', () => {
    it('renders children and submit button', () => {
        render(_jsx(AuthForm, { onSubmit: () => { }, submitLabel: "Sign In", children: _jsx("input", { placeholder: "Email" }) }));
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
    it('renders error and help text', () => {
        render(_jsx(AuthForm, { onSubmit: () => { }, errorText: "Error!", helpText: "Help!", children: _jsx("input", {}) }));
        expect(screen.getByText('Error!')).toBeInTheDocument();
        // Help text should not show if error is present
        expect(screen.queryByText('Help!')).not.toBeInTheDocument();
    });
    it('calls onSubmit when form is submitted', () => {
        const handleSubmit = vi.fn((e) => e.preventDefault());
        render(_jsx(AuthForm, { onSubmit: handleSubmit, submitLabel: "Go", children: _jsx("input", { name: "test" }) }));
        fireEvent.submit(screen.getByRole('button', { name: /go/i }).closest('form'));
        expect(handleSubmit).toHaveBeenCalled();
    });
});
