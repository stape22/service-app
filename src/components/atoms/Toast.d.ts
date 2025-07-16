export type ToastType = 'success' | 'error' | 'info' | 'warning';
interface ToastProps {
    type: ToastType;
    message: string;
    onClose: () => void;
    duration?: number;
    className?: string;
}
export declare const Toast: React.FC<ToastProps>;
export {};
