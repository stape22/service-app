import React from 'react';

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface InputProps extends NativeInputProps {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const base = 'block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed';
const variantMap = {
  default: '',
  primary: 'border-blue-300 focus:border-blue-500 focus:ring-blue-500',
  secondary: 'border-gray-300 focus:border-gray-500 focus:ring-gray-500',
  accent: 'border-purple-300 focus:border-purple-500 focus:ring-purple-500',
  ghost: 'border-transparent bg-transparent',
};
const sizeMap = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2',
  lg: 'px-4 py-3 text-lg',
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