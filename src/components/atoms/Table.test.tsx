import { render, screen, within } from '@testing-library/react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from './Table';

describe('Table primitives', () => {
  it('renders a table with header and body', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
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