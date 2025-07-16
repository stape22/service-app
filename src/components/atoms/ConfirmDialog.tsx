import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false
}) => {
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      showCloseButton={false}
    >
      <div className={`p-4 rounded-lg ${variantStyles[variant].bg}`}>
        <div className="flex items-start space-x-3">
          <div className={`text-2xl ${variantStyles[variant].icon}`}>
            {icons[variant]}
          </div>
          <div className="flex-1">
            <p className="text-gray-700">{message}</p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};