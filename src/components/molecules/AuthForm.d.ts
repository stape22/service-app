import React from 'react';
export interface AuthFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    errorText?: string;
    helpText?: string;
    loading?: boolean;
    submitLabel?: string;
    children: React.ReactNode;
    errorTestId?: string;
}
export declare const AuthForm: React.FC<AuthFormProps>;
