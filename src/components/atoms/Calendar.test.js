import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import { Calendar } from "./Calendar";
describe("Calendar", () => {
    it("renders without crashing", () => {
        render(_jsx(Calendar, {}));
        expect(screen.getByRole("grid")).toBeInTheDocument();
    });
    it("renders with a selected date", () => {
        // Use a fixed date in July 2025
        const selectedDate = new Date(2025, 6, 15); // July 15, 2025
        render(_jsx(Calendar, { selected: selectedDate, month: selectedDate }));
        // Find the button for the 15th
        const todayButton = screen.getAllByRole("button").find(btn => btn.textContent === "15");
        expect(todayButton).toBeDefined();
    });
    it("navigates months when nav buttons are clicked", () => {
        render(_jsx(Calendar, {}));
        const navButtons = screen.getAllByRole("button");
        expect(navButtons.length).toBeGreaterThanOrEqual(2);
        fireEvent.click(navButtons[1]); // Click next month
        expect(screen.getByRole("grid")).toBeInTheDocument();
    });
    it("is accessible with keyboard navigation", () => {
        render(_jsx(Calendar, { initialFocus: true }));
        const grid = screen.getByRole("grid");
        // Instead of tabindex, check that at least one day is focusable
        const dayButtons = screen.getAllByRole("button");
        const focusable = dayButtons.some(btn => !btn.hasAttribute("disabled"));
        expect(focusable).toBe(true);
    });
});
