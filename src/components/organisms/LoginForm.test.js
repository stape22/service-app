import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LoginForm } from './LoginForm';
// Mock AuthContext
const mockLogin = vi.fn();
const mockContext = {
    login: mockLogin,
    loading: false,
    error: null,
};
vi.mock('../../context/AuthContext', () => ({
    useAuth: () => mockContext,
}));
describe('LoginForm', () => {
    beforeEach(() => {
        mockLogin.mockReset();
    });
    it('renders email and password fields', () => {
        render(_jsx(LoginForm, {}));
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
    it('shows validation error if fields are empty', async () => {
        render(_jsx(LoginForm, {}));
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
        });
        const error = await screen.findByTestId('login-error');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(/email and password are required/i);
        expect(mockLogin).not.toHaveBeenCalled();
    });
    it('calls login with email and password', async () => {
        render(_jsx(LoginForm, {}));
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
        await screen.findByRole('button', { name: /sign in/i }); // wait for re-render
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
    it('shows error from context', () => {
        mockContext.error = 'Invalid credentials';
        render(_jsx(LoginForm, {}));
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        mockContext.error = null;
    });
    it('disables button when loading', () => {
        mockContext.loading = true;
        render(_jsx(LoginForm, {}));
        expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled();
        mockContext.loading = false;
    });
});
