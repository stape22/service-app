import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}
export declare const Button: React.FC<ButtonProps>;
