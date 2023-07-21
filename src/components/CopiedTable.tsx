import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Record } from '../interfaces/Record';

interface CopiedTableProps {
  data: Record[];
  onEditRecord: (record: Record) => void;
  onDeleteRecord: (id: number) => void;
}

const CopiedTable: React.FC<CopiedTableProps> = ({ data, onEditRecord, onDeleteRecord }) => {
  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.surname}</TableCell>
              <TableCell>{record.age}</TableCell>
              <TableCell>{record.city}</TableCell>
              <TableCell>
                <Button onClick={() => onEditRecord(record)}>Edit</Button>
                <Button onClick={() => onDeleteRecord(record.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CopiedTable;
