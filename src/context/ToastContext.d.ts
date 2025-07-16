import React from 'react';
interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
}
interface ToastContextType {
    showToast: (type: ToastMessage['type'], message: string) => void;
    hideToast: (id: string) => void;
}
export declare const useToast: () => ToastContextType;
interface ToastProviderProps {
    children: React.ReactNode;
}
export declare const ToastProvider: React.FC<ToastProviderProps>;
export {};
