import React from 'react';
export interface RadioGroupOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface RadioGroupProps {
    label?: string;
    error?: string;
    options: RadioGroupOption[];
    value: string;
    onChange: (value: string) => void;
    name?: string;
    className?: string;
}
export declare const RadioGroup: React.FC<RadioGroupProps>;
