import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { JobsTable } from './JobsTable';
import { vi } from 'vitest';
describe('JobsTable', () => {
    it('renders job rows', () => {
        render(_jsx(JobsTable, {}));
        expect(screen.getByText('#318')).toBeInTheDocument();
        // Use getAllByText for duplicate values
        expect(screen.getAllByText('Install').length).toBeGreaterThan(0);
        expect(screen.getByText('Mike Johnson')).toBeInTheDocument();
    });
    it('calls onEditJob when a row is clicked', () => {
        const handleEdit = vi.fn();
        render(_jsx(JobsTable, { onEditJob: handleEdit }));
        const row = screen.getByText('#318').closest('tr');
        if (row)
            fireEvent.click(row);
        expect(handleEdit).toHaveBeenCalledWith('#318');
    });
});
