import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const base = 'label';
const text = 'label-text';

export const Label: React.FC<LabelProps> = ({ className = '', children, ...props }) => (
  <label className={[base, text, className].filter(Boolean).join(' ')} {...props}>
    {children}
  </label>
); 