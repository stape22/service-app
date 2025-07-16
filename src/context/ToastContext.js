import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../components/atoms/Toast';
const ToastContext = createContext(undefined);
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const showToast = useCallback((type, message, duration = 5000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = { id, type, message, duration };
        setToasts(prev => [...prev, newToast]);
    }, []);
    const hideToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);
    return (_jsxs(ToastContext.Provider, { value: { showToast, hideToast }, children: [children, _jsx("div", { className: "fixed top-4 right-4 z-50 space-y-2", children: toasts.map(toast => (_jsx(Toast, { type: toast.type, message: toast.message, duration: toast.duration, onClose: () => hideToast(toast.id) }, toast.id))) })] }));
};
