export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
}
export declare const Select: React.FC<SelectProps>;
