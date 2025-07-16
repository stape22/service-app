import React from 'react';
import { Button } from '../atoms/Button';
import { Link } from 'react-router-dom';

export interface AuthFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errorText?: string;
  helpText?: string;
  loading?: boolean;
  submitLabel?: string;
  children: React.ReactNode;
  errorTestId?: string;
  showSignupLink?: boolean;
  showLoginLink?: boolean;
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
  showSignupLink = false,
  showLoginLink = false,
  ...props
}) => (
  <div className="space-y-6">
    <form 
      className={["space-y-4", className].filter(Boolean).join(' ')} 
      onSubmit={onSubmit} 
      {...props}
    >
      {children}
      
      {helpText && !errorText && (
        <div className="text-sm text-slate-600">{helpText}</div>
      )}
      
      {errorText && (
        <div 
          className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3" 
          data-testid={errorTestId}
        >
          {errorText}
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full h-10"
        size="lg"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
    
    {(showSignupLink || showLoginLink) && (
      <div className="text-center pt-4 border-t border-slate-200">
        {showSignupLink && (
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign up
            </Link>
          </p>
        )}
        {showLoginLink && (
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    )}
  </div>
); 