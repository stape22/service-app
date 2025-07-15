import React from 'react';
type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;
export interface InputProps extends NativeInputProps {
    variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}
export declare const Input: React.FC<InputProps>;
export {};
