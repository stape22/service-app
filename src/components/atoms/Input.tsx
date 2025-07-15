import React from 'react';

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface InputProps extends NativeInputProps {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const base = 'input input-bordered';
const variantMap = {
  default: '',
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  ghost: 'input-ghost',
};
const sizeMap = {
  sm: 'input-sm',
  md: '',
  lg: 'input-lg',
};

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => (
  <input
    className={[
      base,
      variantMap[variant],
      sizeMap[size],
      className,
    ].filter(Boolean).join(' ')}
    {...props}
  />
); 