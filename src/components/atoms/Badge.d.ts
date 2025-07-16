export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'info' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}
export declare const Badge: React.FC<BadgeProps>;
