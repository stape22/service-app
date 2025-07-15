import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SignupForm } from './SignupForm';

// Mock AuthContext
const mockSignup = vi.fn();
const mockContext = {
  signup: mockSignup,
  loading: false,
  error: null,
};

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockContext,
}));

describe('SignupForm', () => {
  beforeEach(() => {
    mockSignup.mockReset();
  });

  it('renders email and password fields', () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows validation error if fields are empty', async () => {
    render(<SignupForm />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });
    const error = await screen.findByTestId('signup-error');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(/email and password are required/i);
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('calls signup with email and password', async () => {
    render(<SignupForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await screen.findByRole('button', { name: /sign up/i }); // wait for re-render
    expect(mockSignup).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('shows error from context', () => {
    mockContext.error = 'Email already in use' as any;
    render(<SignupForm />);
    expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
    mockContext.error = null;
  });

  it('disables button when loading', () => {
    mockContext.loading = true;
    render(<SignupForm />);
    expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled();
    mockContext.loading = false;
  });
}); 