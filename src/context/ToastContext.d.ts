import React from 'react';
import { ToastType } from '../components/atoms/Toast';
interface ToastContextType {
    showToast: (type: ToastType, message: string, duration?: number) => void;
    hideToast: (id: string) => void;
}
export declare const useToast: () => ToastContextType;
interface ToastProviderProps {
    children: React.ReactNode;
}
export declare const ToastProvider: React.FC<ToastProviderProps>;
export {};
