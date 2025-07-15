import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const base = 'btn';
const variantMap = {
  default: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  link: 'btn-link',
};
const sizeMap = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => (
  <button
    type="button"
    className={[
      base,
      variantMap[variant],
      sizeMap[size],
      className,
    ].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
  </button>
); 