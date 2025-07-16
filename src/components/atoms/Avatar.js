import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../utils/index';
export const Avatar = ({ className, children, ...props }) => {
    return (_jsx("div", { className: cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", className), ...props, children: children }));
};
export const AvatarImage = ({ className, src, alt, ...props }) => {
    return (_jsx("img", { className: cn("aspect-square size-full", className), src: src, alt: alt, ...props }));
};
export const AvatarFallback = ({ className, children, ...props }) => {
    return (_jsx("div", { className: cn("bg-muted flex size-full items-center justify-center rounded-full", className), ...props, children: children }));
};
