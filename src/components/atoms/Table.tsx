export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ className = '', ...props }) => (
  <table className={`min-w-full divide-y divide-gray-200 ${className}`} {...props} />
);

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className = '', ...props }) => (
  <thead className={`bg-gray-50 ${className}`} {...props} />
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className = '', ...props }) => (
  <tbody className={className} {...props} />
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className = '', ...props }) => (
  <tr className={`hover:bg-gray-50 ${className}`} {...props} />
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className = '', ...props }) => (
  <td className={`px-4 py-2 text-sm text-gray-900 ${className}`} {...props} />
);

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className = '', ...props }) => (
  <th className={`px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider ${className}`} {...props} />
); 