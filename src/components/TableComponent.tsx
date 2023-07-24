import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { editRecordAction, deleteRecordAction } from '../store';
import { Record } from '../interfaces/Record';
import AddRecordForm from './AddRecordForm';

const TableComponent: React.FC = () => {
  const data = useSelector((state: RootState) => state.tablesData.data);
  const dispatch = useDispatch();
  const [editRecord, setEditRecord] = React.useState<Record | null>(null);
  const [deleteRecordId, setDeleteRecordId] = React.useState<number | null>(null);

  const handleEditClick = (record: Record) => {
    setEditRecord(record);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteRecordId(id);
  };

  const handleEditRecord = (editedRecord: Record) => {
    dispatch(editRecordAction(editedRecord));
    setEditRecord(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteRecordId) {
      dispatch(deleteRecordAction(deleteRecordId));
      setDeleteRecordId(null);
    }
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={10} className="table-container">
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
                    {/* Edit and Delete buttons */}
                    <Button
                      className="table-edit-btn"
                      onClick={() => handleEditClick(record)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="table-delete-btn"
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
      </Grid>
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
      </Grid>
    </div>
  );
};

export default TableComponent;
