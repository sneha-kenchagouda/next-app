import {
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
  } from '@carbon/react';
  import React from 'react';
  
  interface TableRowData {
    id: string;
    [key: string]: any;
  }
  
  interface DataTableProps {
    headers?: string[];
    rows?: TableRowData[];
  }
  
  export const DataTable = ({
    headers = ['Name', 'Place', 'Email', 'Phone'],
    rows = [
      {
        id: '1',
        name: 'Sneha',
        place: 'Banglore',
        Email: 'sneha@gmail.com',
        phone: '8198625232'
      },
      {
        id: '2',
        name: 'Sneha',
        place: 'Banglore',
        Email: 'sneha@gmail.com',
        phone: '8198625232'
      },
      {
        id: '3',
        name: 'Sneha',
        place: 'Banglore',
        Email: 'sneha@gmail.com',
        phone: '8198625232'
      }
    ]
  }: DataTableProps) => {
    return (
      <Table aria-label="sample table">
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableHeader key={header}>
                {header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {Object.keys(row)
                .filter(key => key !== 'id')
                .map(key => (
                  <TableCell key={key}>
                    {row[key]}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };