import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import { Record } from '../interfaces/Record';
// import { tableDataSubject } from '../data/tableDataSubject';
import AddRecordForm from '../components/AddRecordForm';
import { BehaviorSubject } from 'rxjs';

interface TableComponentProps {
    dataSubject: BehaviorSubject<Record[]>;
    onEditRecord: (record: Record) => void;
    onDeleteRecord: (id: number) => void;
  }

const TableComponent: React.FC<TableComponentProps> = ({ dataSubject, onEditRecord, onDeleteRecord }) => {
    const [editRecord, setEditRecord] = useState<Record | null>(null);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    // Используем хук useState для хранения текущих данных
    const [data, setData] = useState<Record[]>(dataSubject.getValue());
  
    useEffect(() => {
      // Подписываемся на обновления данных из tableDataSubject
      const subscription = dataSubject.subscribe((newData) => {
        // Обновляем локальное состояние компонента
        setData(newData);
      });
  
      // Отписываемся от подписки при размонтировании компонента
      return () => {
        subscription.unsubscribe();
      };
    }, []);
  
  
    const handleEditClick = (record: Record) => {
      setEditRecord(record);
    };
  
    const handleDeleteClick = (id: number) => {
      setDeleteRecordId(id);
    };
  
    const handleDeleteConfirm = () => {
      if (deleteRecordId) {
        onDeleteRecord(deleteRecordId);
        setDeleteRecordId(null);
      }
    };
  
    const handleEditRecord = (editedRecord: Record) => {
      onEditRecord(editedRecord);
      setEditRecord(null);
    };
  
    return (
      <TableContainer component={Paper} className="table-container">
        <Table className="table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>City</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((record) => (
            <TableRow key={record.id}>
             <TableCell>{record.name}</TableCell>
            <TableCell>{record.surname}</TableCell>
            <TableCell>{record.age}</TableCell>
            <TableCell>{record.city}</TableCell>
            <TableCell align="center">
              {/* Edit and Delete buttons */}
              <Button className="table-edit-btn" onClick={() => handleEditClick(record)}>Edit</Button>
              <Button className="table-delete-btn" onClick={() => handleDeleteClick(record.id)}>Delete</Button>
            </TableCell>
            </TableRow>
          ))}
          </TableBody>
          </Table>
  
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteRecordId !== null} onClose={() => setDeleteRecordId(null)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this record?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteRecordId(null)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm}>Delete</Button>
          </DialogActions>
        </Dialog>
  
        {/* Edit Record Dialog */}
        <Dialog open={editRecord !== null} onClose={() => setEditRecord(null)}>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogContent>
            {/* Pass the record to edit as initial values */}
            <AddRecordForm isNewRecord={false} initialValues={editRecord} onSave={handleEditRecord} submitText="Agree"/>
          </DialogContent>
        </Dialog>
      </TableContainer>
    );
  };

  export default TableComponent;