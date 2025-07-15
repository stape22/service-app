import React from 'react';
import { Label } from '../atoms/Label';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor?: string;
  helpText?: string;
  errorText?: string;
  children: React.ReactNode;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  htmlFor,
  helpText,
  errorText,
  children,
  className = '',
  ...props
}) => (
  <div className={["form-control", className].filter(Boolean).join(' ')} {...props}>
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
    {helpText && !errorText && (
      <span className="label-text-alt text-xs text-base-content/60">{helpText}</span>
    )}
    {errorText && (
      <span className="label-text-alt text-xs text-error">{errorText}</span>
    )}
  </div>
); 