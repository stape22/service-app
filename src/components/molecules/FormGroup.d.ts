import React from 'react';
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    htmlFor?: string;
    helpText?: string;
    errorText?: string;
    children: React.ReactNode;
}
export declare const FormGroup: React.FC<FormGroupProps>;
