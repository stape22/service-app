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
  <form 
    className={["space-y-6", className].filter(Boolean).join(' ')} 
    onSubmit={onSubmit} 
    {...props}
  >
    <div className="space-y-4">
      {children}
    </div>
    
    {helpText && !errorText && (
      <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
        {helpText}
      </div>
    )}
    
    {errorText && (
      <div 
        className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2" 
        data-testid={errorTestId}
      >
        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{errorText}</span>
      </div>
    )}
    
    <Button 
      type="submit" 
      disabled={loading} 
      size="lg"
      className="w-full"
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Signing in...</span>
        </div>
      ) : (
        submitLabel
      )}
    </Button>
  </form>
); 