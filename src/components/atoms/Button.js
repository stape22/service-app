import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/index";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2", {
    variants: {
        variant: {
            default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
            destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
            outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500",
            secondary: "bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-500",
            ghost: "text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500",
            link: "text-blue-600 underline-offset-4 hover:underline",
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-12 rounded-lg px-6 text-base",
            icon: "h-10 w-10 rounded-lg",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
export const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    return (_jsx(Comp, { "data-slot": "button", className: cn(buttonVariants({ variant, size, className })), ref: ref, ...props }));
});
Button.displayName = "Button";
export { buttonVariants };
