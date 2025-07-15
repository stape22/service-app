import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { AuthForm } from './AuthForm';

describe('AuthForm', () => {
  it('renders children and submit button', () => {
    render(
      <AuthForm onSubmit={() => {}} submitLabel="Sign In">
        <input placeholder="Email" />
      </AuthForm>
    );
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });
  it('renders error and help text', () => {
    render(
      <AuthForm onSubmit={() => {}} errorText="Error!" helpText="Help!">
        <input />
      </AuthForm>
    );
    expect(screen.getByText('Error!')).toBeInTheDocument();
    // Help text should not show if error is present
    expect(screen.queryByText('Help!')).not.toBeInTheDocument();
  });
  it('calls onSubmit when form is submitted', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    render(
      <AuthForm onSubmit={handleSubmit} submitLabel="Go">
        <input name="test" />
      </AuthForm>
    );
    fireEvent.submit(screen.getByRole('button', { name: /go/i }).closest('form')!);
    expect(handleSubmit).toHaveBeenCalled();
  });
}); 