export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => (
  <label className={`block w-full ${className}`}>
    {label && <span className="block mb-1 text-sm font-medium text-gray-700">{label}</span>}
    <textarea
      className={`block w-full rounded-md border border-input bg-input-background p-2 text-base text-foreground shadow-sm focus:border-ring focus:ring-2 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-destructive ring-destructive' : ''}`}
      aria-invalid={!!error}
      {...props}
    />
    {error && <span className="mt-1 text-xs text-destructive">{error}</span>}
  </label>
); 