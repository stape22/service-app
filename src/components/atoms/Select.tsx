import React from 'react';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  ...props
}) => (
  <label className={`block w-full ${className}`}>
    {label && <span className="block mb-1 text-sm font-medium text-gray-700">{label}</span>}
    <select
      className={`block w-full rounded-md border border-input bg-input-background p-2 text-base text-foreground shadow-sm focus:border-ring focus:ring-2 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-destructive ring-destructive' : ''}`}
      aria-invalid={!!error}
      {...props}
    >
      <option value="" disabled hidden>Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <span className="mt-1 text-xs text-destructive">{error}</span>}
  </label>
); 