import { type VariantProps } from "class-variance-authority";
declare const labelVariants: (props?: ({
    variant?: "default" | "primary" | "secondary" | "muted" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
}
declare const Label: import("react").ForwardRefExoticComponent<LabelProps & import("react").RefAttributes<HTMLLabelElement>>;
export { Label, labelVariants };
