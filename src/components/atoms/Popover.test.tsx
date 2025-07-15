import React from "react";
import { render, screen } from "@testing-library/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./Popover";

describe("Popover", () => {
  it("renders Popover and children without crashing", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("renders PopoverAnchor if provided", () => {
    render(
      <Popover>
        <PopoverAnchor>Anchor</PopoverAnchor>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText("Anchor")).toBeInTheDocument();
  });

  it("has correct data-slot attributes for accessibility and testing", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText("Open").closest('[data-slot="popover-trigger"]')).toBeInTheDocument();
    expect(screen.getByText("Popover content").closest('[data-slot="popover-content"]')).toBeInTheDocument();
  });
}); 