'use client'; // Mark this component as a Client Component
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableBatchActions,
  TableBatchAction,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  TableSelectAll,
  TableSelectRow,
  Button,
  Modal,
} from '@carbon/react';
import { TrashCan, Save, Download } from '@carbon/icons-react';
import { useState } from 'react';

export default function Archive() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowsForDeletion, setSelectedRowsForDeletion] = useState<Array<{ id: string; [key: string]: any }>>([]);

  const rows = [
    { id: '1', userid: 'user001', name: 'Ananya', email: 'ananya@example.com' },
    { id: '2', userid: 'user002', name: 'Bhuvana', email: 'bhuvana@example.com' },
    { id: '3', userid: 'user003', name: 'Chaitra', email: 'chaitra@example.com' },
    { id: '4', userid: 'user004', name: 'Divya', email: 'divya@example.com' },
    { id: '5', userid: 'user005', name: 'Eshwari', email: 'eshwari@example.com' },
  ];

  const headers = [
    { key: 'userid', header: 'User ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ];

  const batchActionClick = (selectedRows: Array<{ id: string; [key: string]: any }>) => {
    console.log('Selected Rows:', selectedRows);
    // Perform deletion logic here
  };

  return (
    <>
      <DataTable rows={rows} headers={headers}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getToolbarProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
          getTableProps,
          getTableContainerProps,
        }) => {
          const batchActionProps = getBatchActionProps();
          return (
            <TableContainer
              title="DataTable"
              description="With batch actions"
              {...getTableContainerProps()}
            >
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...batchActionProps}>
                  <TableBatchAction
                    renderIcon={TrashCan}
                    onClick={() => {
                      const selectedRowsData = selectedRows.map((row) => ({
                        id: row.id,
                        ...row.cells.reduce((acc, cell) => {
                          (acc as Record<string, any>)[cell.info.header] = cell.value;
                          return acc;
                        }, {}),
                      }));
                      setSelectedRowsForDeletion(selectedRowsData);
                      setIsModalOpen(true);
                    }}
                  >
                    Delete
                  </TableBatchAction>
                  <TableBatchAction renderIcon={Save} onClick={() => batchActionClick(selectedRows)}>
                    Save
                  </TableBatchAction>
                  <TableBatchAction renderIcon={Download} onClick={() => batchActionClick(selectedRows)}>
                    Download
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent aria-hidden={batchActionProps.shouldShowBatchActions}>
                  <TableToolbarSearch onChange={(event) => {
                    if (event && 'target' in event) {
                      onInputChange(event as React.ChangeEvent<HTMLInputElement>);
                    }
                  }} />
                  <TableToolbarMenu>
                    <TableToolbarAction onClick={() => alert('Action 1')}>Action 1</TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Action 2')}>Action 2</TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Action 3')}>Action 3</TableToolbarAction>
                  </TableToolbarMenu>
                  <Button onClick={() => console.log('Add new row')} kind="primary">
                    Add new
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()} aria-label="sample table">
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header) => {
                      const { key, ...headerProps } = getHeaderProps({ header });
                      return (
                        <TableHeader key={key} {...headerProps}>
                          {header.header}
                        </TableHeader>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
  {rows.map((row) => {
    const { key, ...rowProps } = getRowProps({ row }); // Destructure key from rowProps
    return (
      <TableRow key={row.id} {...rowProps}>
        <TableSelectRow {...getSelectionProps({ row })} />
        {row.cells.map((cell) => (
          <TableCell key={cell.id}>{cell.value}</TableCell>
        ))}
      </TableRow>
    );
  })}
</TableBody>
              </Table>
            </TableContainer>
          );
        }}
      </DataTable>

      <Modal
        open={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        danger
        modalHeading="Are you sure you want to delete the selected rows?"
        modalLabel="Delete Confirmation"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onSecondarySubmit={() => setIsModalOpen(false)}
        onRequestSubmit={() => {
          batchActionClick(selectedRowsForDeletion);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
