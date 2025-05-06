import React, { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  cell?: (row: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

function Table<T extends { id?: string | number }>({
  data,
  columns,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No data available'
}: TableProps<T>) {
  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                <div className="flex justify-center items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id?.toString() || rowIndex}
                className={`
                  ${onRowClick ? 'cursor-pointer' : ''}
                  bg-white border-b dark:bg-gray-800 dark:border-gray-700
                  hover:bg-gray-50 dark:hover:bg-gray-700
                  transition-colors duration-150
                `}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => {
                  const value = 
                    typeof column.accessor === 'function' 
                      ? column.accessor(row)
                      : row[column.accessor];
                      
                  return (
                    <td key={colIndex} className="px-6 py-4">
                      {column.cell ? column.cell(row) : value as ReactNode}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;