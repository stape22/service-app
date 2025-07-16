import React from 'react';
interface ToastProps {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    onClose: () => void;
    duration?: number;
}
export declare const Toast: React.FC<ToastProps>;
export {};
