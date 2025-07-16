export interface RadioGroupOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label?: string;
  error?: string;
  options: RadioGroupOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  options,
  value,
  onChange,
  name,
  className = '',
}) => (
  <fieldset className={`mb-2 ${className}`}>
    {label && <legend className="mb-1 text-sm font-medium text-gray-700">{label}</legend>}
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label key={option.value} className={`inline-flex items-center gap-2 cursor-pointer ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            disabled={option.disabled}
            className="form-radio h-4 w-4 text-primary focus:ring-ring border-gray-300"
            aria-invalid={!!error}
          />
          <span className="text-sm text-foreground">{option.label}</span>
        </label>
      ))}
    </div>
    {error && <span className="mt-1 text-xs text-destructive">{error}</span>}
  </fieldset>
); 