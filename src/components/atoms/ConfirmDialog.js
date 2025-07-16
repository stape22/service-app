import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal } from './Modal';
import { Button } from './Button';
export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger', loading = false }) => {
    const variantStyles = {
        danger: {
            button: 'btn-error',
            icon: 'text-red-500',
            bg: 'bg-red-50'
        },
        warning: {
            button: 'btn-warning',
            icon: 'text-yellow-500',
            bg: 'bg-yellow-50'
        },
        info: {
            button: 'btn-info',
            icon: 'text-blue-500',
            bg: 'bg-blue-50'
        }
    };
    const icons = {
        danger: '⚠️',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: title, size: "sm", showCloseButton: false, children: _jsxs("div", { className: `p-4 rounded-lg ${variantStyles[variant].bg}`, children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: `text-2xl ${variantStyles[variant].icon}`, children: icons[variant] }), _jsx("div", { className: "flex-1", children: _jsx("p", { className: "text-gray-700", children: message }) })] }), _jsxs("div", { className: "flex justify-end space-x-3 mt-6", children: [_jsx(Button, { variant: "outline", onClick: onClose, disabled: loading, children: cancelText }), _jsx(Button, { variant: variant === 'danger' ? 'danger' : 'primary', onClick: onConfirm, loading: loading, children: confirmText })] })] }) }));
};
