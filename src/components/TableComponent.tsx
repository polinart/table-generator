import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { editRecordAction, deleteRecordAction } from '../slices/tablesDataSlice';
import { Record, emptyRecord } from '../interfaces/Record';
import RecordForm from './RecordForm';

const TableComponent: React.FC = () => {
  const data = useSelector((state: RootState) => state.tablesData.data);
  const dispatch = useDispatch();
  const [editRecord, setEditRecord] = useState<Record>(emptyRecord);
  const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleEditClick = (record: Record) => {
    setEditRecord(record);
    setOpenModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteRecordId(id);
  };

  const handleEditRecord = (editedRecord: Record) => {
    dispatch(editRecordAction(editedRecord));
    setEditRecord(emptyRecord);
    setOpenModal(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteRecordId) {
      dispatch(deleteRecordAction(deleteRecordId));
      setDeleteRecordId(null);
    }
  };

  return (
    <div>
      {data.length === 0 ? (
        <div className="empty-table-message">
          <p>The main table is empty.</p>
          <p>Please fill out the form (Form 1 or Form 2) and click "ADD" to add records.</p>
        </div>
      ) : (
        <TableContainer component={Paper}>
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
                    <Button onClick={() => handleEditClick(record)}>
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleDeleteClick(record.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
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
      <Dialog open={openModal} onClose={() => setEditRecord(emptyRecord)}>
        <DialogTitle>Edit Record in Main Table</DialogTitle>
        <DialogContent>
          {/* Pass the record to edit as initial values */}
          <RecordForm formData={editRecord} setFormData={setEditRecord} onSave={handleEditRecord} submitText="Agree"/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableComponent;
