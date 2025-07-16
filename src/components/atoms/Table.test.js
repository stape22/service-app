import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen, within } from '@testing-library/react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from './Table';
describe('Table primitives', () => {
    it('renders a table with header and body', () => {
        render(_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Header 1" }), _jsx(TableHead, { children: "Header 2" })] }) }), _jsx(TableBody, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Cell 1" }), _jsx(TableCell, { children: "Cell 2" })] }) })] }));
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        const headers = within(table).getAllByRole('columnheader');
        expect(headers).toHaveLength(2);
        expect(headers[0]).toHaveTextContent('Header 1');
        expect(headers[1]).toHaveTextContent('Header 2');
        const cells = within(table).getAllByRole('cell');
        expect(cells).toHaveLength(2);
        expect(cells[0]).toHaveTextContent('Cell 1');
        expect(cells[1]).toHaveTextContent('Cell 2');
    });
});
