import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Calendar } from "./Calendar";
describe("Calendar", () => {
    it("renders without crashing", () => {
        render(_jsx(Calendar, {}));
        expect(screen.getByRole("grid")).toBeInTheDocument();
    });
    it("renders with a selected date", () => {
        const today = new Date();
        render(_jsx(Calendar, { selected: today }));
        // Should highlight today as selected
        expect(screen.getByLabelText(/today/i)).toBeInTheDocument();
    });
    it("navigates months when nav buttons are clicked", () => {
        render(_jsx(Calendar, {}));
        const [prevBtn, nextBtn] = screen.getAllByRole("button");
        expect(prevBtn).toBeInTheDocument();
        expect(nextBtn).toBeInTheDocument();
        fireEvent.click(nextBtn);
        // Should update the month (not asserting text, just that it doesn't crash)
        expect(screen.getByRole("grid")).toBeInTheDocument();
    });
    it("is accessible with keyboard navigation", () => {
        render(_jsx(Calendar, { initialFocus: true }));
        const grid = screen.getByRole("grid");
        expect(grid).toHaveAttribute("tabindex");
    });
});
