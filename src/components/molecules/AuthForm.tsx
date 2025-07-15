import React from 'react';
import { Button } from '../atoms/Button';

export interface AuthFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errorText?: string;
  helpText?: string;
  loading?: boolean;
  submitLabel?: string;
  children: React.ReactNode;
  errorTestId?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  errorText,
  helpText,
  loading = false,
  submitLabel = 'Submit',
  children,
  className = '',
  errorTestId,
  ...props
}) => (
  <form className={["w-full max-w-sm space-y-4", className].filter(Boolean).join(' ')} onSubmit={onSubmit} {...props}>
    {children}
    {helpText && !errorText && (
      <div className="text-xs text-base-content/60">{helpText}</div>
    )}
    {errorText && (
      <div className="text-xs text-error" data-testid={errorTestId}>{errorText}</div>
    )}
    <Button type="submit" disabled={loading} className="w-full">
      {loading ? 'Loading...' : submitLabel}
    </Button>
  </form>
); 