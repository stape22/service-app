import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./Popover";
describe("Popover", () => {
    it("renders Popover and children without crashing", () => {
        render(_jsxs(Popover, { children: [_jsx(PopoverTrigger, { children: "Open" }), _jsx(PopoverContent, { children: "Popover content" })] }));
        expect(screen.getByText("Open")).toBeInTheDocument();
        expect(screen.getByText("Popover content")).toBeInTheDocument();
    });
    it("renders PopoverAnchor if provided", () => {
        render(_jsxs(Popover, { children: [_jsx(PopoverAnchor, { children: "Anchor" }), _jsx(PopoverTrigger, { children: "Open" }), _jsx(PopoverContent, { children: "Popover content" })] }));
        expect(screen.getByText("Anchor")).toBeInTheDocument();
    });
    it("has correct data-slot attributes for accessibility and testing", () => {
        render(_jsxs(Popover, { children: [_jsx(PopoverTrigger, { children: "Open" }), _jsx(PopoverContent, { children: "Popover content" })] }));
        expect(screen.getByText("Open").closest('[data-slot="popover-trigger"]')).toBeInTheDocument();
        expect(screen.getByText("Popover content").closest('[data-slot="popover-content"]')).toBeInTheDocument();
    });
});
