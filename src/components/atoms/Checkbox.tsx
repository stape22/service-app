export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, error, className = '', ...props }) => {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className={`peer size-4 rounded border border-input bg-input-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-destructive ring-destructive' : ''}`}
        aria-invalid={!!error}
        {...props}
      />
      <span className="select-none text-sm text-foreground">{label}</span>
      {error && <span className="ml-2 text-xs text-destructive">{error}</span>}
    </label>
  );
}; 