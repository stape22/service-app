import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/index";
const inputVariants = cva("flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        variant: {
            default: "",
            primary: "border-primary focus-visible:ring-primary",
            secondary: "border-secondary focus-visible:ring-secondary",
            accent: "border-accent focus-visible:ring-accent",
            ghost: "border-transparent bg-transparent",
        },
        inputSize: {
            sm: "h-8 px-2 text-xs",
            md: "h-9 px-3 text-sm",
            lg: "h-10 px-4 text-base",
        },
    },
    defaultVariants: {
        variant: "default",
        inputSize: "md",
    },
});
const Input = React.forwardRef(({ className, variant, inputSize, type, ...props }, ref) => {
    return (_jsx("input", { type: type, className: cn(inputVariants({ variant, inputSize, className })), ref: ref, ...props }));
});
Input.displayName = "Input";
export { Input, inputVariants };
