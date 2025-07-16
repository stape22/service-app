import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/index";
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
    variants: {
        variant: {
            default: "text-foreground",
            primary: "text-primary",
            secondary: "text-secondary-foreground",
            muted: "text-muted-foreground",
        },
        size: {
            sm: "text-xs",
            md: "text-sm",
            lg: "text-base",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});
const Label = forwardRef(({ className, variant, size, ...props }, ref) => (_jsx("label", { ref: ref, className: cn(labelVariants({ variant, size, className })), ...props })));
Label.displayName = "Label";
export { Label, labelVariants };
