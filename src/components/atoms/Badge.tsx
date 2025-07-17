export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'info' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const base = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
const variantMap = {
  default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  accent: 'border-transparent bg-accent text-accent-foreground hover:bg-accent/80',
  ghost: 'border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground',
  info: 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200',
  success: 'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
  warning: 'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  error: 'border-transparent bg-red-100 text-red-800 hover:bg-red-200',
  outline: 'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground',
};
const sizeMap = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => (
  <span
    className={[
      base,
      variantMap[variant],
      sizeMap[size],
      className,
    ].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
  </span>
); 