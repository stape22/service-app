import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import AddJobForm from "./AddJobForm";
import { format } from "date-fns";
import { vi } from "vitest";
vi.mock('../atoms', async () => {
    const actual = await vi.importActual('../atoms');
    return {
        ...actual,
        Button: (props) => _jsx("button", { ...props, children: "Button" }),
        Input: (props) => _jsx("input", { ...props }),
        Select: (props) => _jsx("select", { ...props, children: _jsx("option", { children: "Option" }) }),
        RadioGroup: () => _jsx("div", { children: "RadioGroup" }),
        Label: actual.Label,
        Textarea: (props) => _jsx("textarea", { ...props }),
        Popover: (props) => _jsx("div", { children: props.children }),
        PopoverTrigger: (props) => _jsx("div", { children: props.children }),
        PopoverContent: (props) => _jsx("div", { children: props.children }),
        Calendar: () => _jsx("div", { children: "Calendar" }),
        Checkbox: (props) => _jsx("input", { type: "checkbox", ...props }),
    };
});
describe("AddJobForm - Scheduled Date Section", () => {
    it("renders the scheduled date field and allows date selection", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        // Find the scheduled date button (trigger)
        const trigger = screen.getByRole("button", { name: /pick a date/i });
        expect(trigger).toBeInTheDocument();
        // Open the popover
        fireEvent.click(trigger);
        // Find a day button in the calendar (e.g., today)
        const today = new Date();
        const dayLabel = today.getDate().toString();
        const dayButton = screen.getAllByRole("button", { name: dayLabel })[0];
        fireEvent.click(dayButton);
        // The popover should close and the trigger should now show the selected date
        expect(screen.getByRole("button", { name: format(today, "PPP") })).toBeInTheDocument();
    });
});
describe("AddJobForm - Basic Info Section", () => {
    it("renders Job Number input with auto-generated value", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        const jobNumberInput = screen.getByLabelText(/job number/i);
        expect(jobNumberInput).toBeInTheDocument();
        expect(jobNumberInput).toHaveValue(expect.stringMatching(/^JOB-\d{4}-\d{3}$/));
    });
    it("renders Customer select and updates address and roofer on selection", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        // Customer select
        const customerSelect = screen.getByLabelText(/customer/i);
        expect(customerSelect).toBeInTheDocument();
        // Select a customer
        fireEvent.change(customerSelect, { target: { value: "John Smith" } });
        // Address and roofer should appear
        expect(screen.getByText(/123 Main Street, Springfield, IL 62701/)).toBeInTheDocument();
        expect(screen.getByText(/Michael Rodriguez/)).toBeInTheDocument();
    });
    it("renders Job Type radio group and updates value", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        // Should have Estimate, Install, Repair options
        expect(screen.getByLabelText(/estimate/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/install/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/repair/i)).toBeInTheDocument();
        // Change to Install
        const installRadio = screen.getByLabelText(/install/i);
        fireEvent.click(installRadio);
        expect(installRadio).toBeChecked();
    });
});
describe("AddJobForm - Status, Priority, Estimated Cost, Description, Notes Section", () => {
    it("renders Status radio group and updates value", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        // Should have Scheduled, In Progress, Completed, Cancelled options
        expect(screen.getByLabelText(/scheduled/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/in progress/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/completed/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cancelled/i)).toBeInTheDocument();
        // Change to In Progress
        const inProgressRadio = screen.getByLabelText(/in progress/i);
        fireEvent.click(inProgressRadio);
        expect(inProgressRadio).toBeChecked();
    });
    it("renders Priority radio group and updates value", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        // Should have Low, Medium, High options
        expect(screen.getByLabelText(/low/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/medium/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/high/i)).toBeInTheDocument();
        // Change to High
        const highRadio = screen.getByLabelText(/high/i);
        fireEvent.click(highRadio);
        expect(highRadio).toBeChecked();
    });
    it("renders Estimated Cost input and updates value", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        const costInput = screen.getByLabelText(/estimated cost/i);
        expect(costInput).toBeInTheDocument();
        fireEvent.change(costInput, { target: { value: "1234" } });
        expect(costInput).toHaveValue(1234);
    });
    it("renders Description textarea and updates value", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        const descTextarea = screen.getByLabelText(/description/i);
        expect(descTextarea).toBeInTheDocument();
        fireEvent.change(descTextarea, { target: { value: "Test job description" } });
        expect(descTextarea).toHaveValue("Test job description");
    });
    it("renders Notes textarea and updates value", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        const notesTextarea = screen.getByLabelText(/notes/i);
        expect(notesTextarea).toBeInTheDocument();
        fireEvent.change(notesTextarea, { target: { value: "Some notes here" } });
        expect(notesTextarea).toHaveValue("Some notes here");
    });
});
describe("AddJobForm - Advanced Sections (Roofing Specs, Drawing, Photos)", () => {
    it("renders roofing specs fields and updates values", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        // Gutter fields
        const gutterFootage = screen.getByLabelText(/gutter total footage/i);
        expect(gutterFootage).toBeInTheDocument();
        fireEvent.change(gutterFootage, { target: { value: "200" } });
        expect(gutterFootage).toHaveValue(200);
        const gutterType = screen.getByLabelText(/gutter type/i);
        expect(gutterType).toBeInTheDocument();
        fireEvent.change(gutterType, { target: { value: "K-style" } });
        expect(gutterType).toHaveValue("K-style");
        // Downspout Size
        const downspoutSize = screen.getByLabelText(/downspout size/i);
        expect(downspoutSize).toBeInTheDocument();
        fireEvent.change(downspoutSize, { target: { value: "2x3" } });
        expect(downspoutSize).toHaveValue("2x3");
        // Leaf Guard Size
        const leafGuardSize = screen.getByLabelText(/leaf guard size/i);
        expect(leafGuardSize).toBeInTheDocument();
        fireEvent.change(leafGuardSize, { target: { value: "5-inch" } });
        expect(leafGuardSize).toHaveValue("5-inch");
        // Crew Count
        const crewCount = screen.getByLabelText(/crew count/i);
        expect(crewCount).toBeInTheDocument();
        fireEvent.change(crewCount, { target: { value: "4" } });
        expect(crewCount).toHaveValue(4);
        // Time Frame
        const timeFrame = screen.getByLabelText(/time frame/i);
        expect(timeFrame).toBeInTheDocument();
        fireEvent.change(timeFrame, { target: { value: "2 days" } });
        expect(timeFrame).toHaveValue("2 days");
    });
    it("renders Drawing placeholder for MVP", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        expect(screen.getByText(/drawing feature coming soon/i)).toBeInTheDocument();
    });
    it("renders Photo Upload placeholder for MVP", () => {
        render(_jsx(AddJobForm, { onBack: () => { } }));
        expect(screen.getByText(/photo upload feature coming soon/i)).toBeInTheDocument();
    });
});
