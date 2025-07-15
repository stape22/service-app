import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddJobForm from "./AddJobForm";
import { format } from "date-fns";
import { vi } from "vitest";
import { Button } from '../atoms/Button';

vi.mock('../atoms', async () => {
  const actual = await vi.importActual('../atoms');
  return {
    ...actual,
    Button: (props: any) => <button {...props}>Button</button>,
    Input: (props: any) => <input {...props} />,
    Select: (props: any) => <select {...props}><option>Option</option></select>,
    RadioGroup: (props: any) => <div>RadioGroup</div>,
    Label: actual.Label,
    Textarea: (props: any) => <textarea {...props} />,
    Popover: (props: any) => <div>{props.children}</div>,
    PopoverTrigger: (props: any) => <div>{props.children}</div>,
    PopoverContent: (props: any) => <div>{props.children}</div>,
    Calendar: (props: any) => <div>Calendar</div>,
    Checkbox: (props: any) => <input type="checkbox" {...props} />,
  };
});

describe("AddJobForm - Scheduled Date Section", () => {
  it("renders the scheduled date field and allows date selection", () => {
    render(<AddJobForm onBack={() => {}} />);

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
    render(<AddJobForm onBack={() => {}} />);
    const jobNumberInput = screen.getByLabelText(/job number/i);
    expect(jobNumberInput).toBeInTheDocument();
    expect(jobNumberInput).toHaveValue(expect.stringMatching(/^JOB-\d{4}-\d{3}$/));
  });

  it("renders Customer select and updates address and roofer on selection", () => {
    render(<AddJobForm onBack={() => {}} />);
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
    render(<AddJobForm onBack={() => {}} />);
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