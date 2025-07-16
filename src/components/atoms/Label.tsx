import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const base = 'block text-sm font-medium text-gray-700';

export const Label: React.FC<LabelProps> = ({ className = '', children, ...props }) => (
  <label className={[base, className].filter(Boolean).join(' ')} {...props}>
    {children}
  </label>
); 