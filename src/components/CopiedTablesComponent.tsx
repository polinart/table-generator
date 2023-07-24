import React, { useState } from 'react';
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
import { Record, emptyRecord } from '../interfaces/Record';
import RecordForm from './RecordForm';

interface CopiedTablesComponentProps {
  copiedTables: Record[][];
  onEditRecord: (tableIndex: number, record: Record) => void;
  onDeleteRecord: (tableIndex: number, id: number) => void;
  onDeleteTable: (tableIndex: number) => void;
}

const CopiedTablesComponent: React.FC<CopiedTablesComponentProps> = ({
  copiedTables,
  onEditRecord,
  onDeleteRecord,
  onDeleteTable,
}) => {

  const [editRecord, setEditRecord] = useState<Record>(emptyRecord);
  const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
  const [tableId, setTableId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleEditClick = (tableIndex: number, record: Record) => {
    setEditRecord(record);
    setTableId(tableIndex);
    setOpenModal(true);
  };

  const handleDeleteClick = (tableIndex: number, id: number) => {
    setDeleteRecordId(id);
    setTableId(tableIndex);
  };

  const handleEditRecord = (record: Record) => {
    if (tableId !== null) {
        onEditRecord(tableId, record);
        setEditRecord(emptyRecord);
        setOpenModal(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteRecordId && tableId) {
        onDeleteRecord(tableId, deleteRecordId);
        setDeleteRecordId(null);
    }
  };

  return (
    <>
      {copiedTables.map((tableData, tableIndex) => (
        <div key={tableIndex}>
          <h2>Copied Table {tableIndex + 1}:</h2>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={10} className="table-container">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => onDeleteTable(tableIndex)}
              >
                Delete Table
              </Button>
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
                    {tableData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.surname}</TableCell>
                        <TableCell>{record.age}</TableCell>
                        <TableCell>{record.city}</TableCell>
                        <TableCell align="center">
                          {/* Edit and Delete buttons */}
                          <Button
                            className="table-edit-btn"
                            onClick={() => handleEditClick(tableIndex, record)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="table-delete-btn"
                            onClick={() => handleDeleteClick(tableIndex, record.id)}
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
          </Grid>
        </div>
      ))}
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
        <DialogTitle>Edit Record copied table</DialogTitle>
        <DialogContent>
          {/* Pass the record to edit as initial values */}
          <RecordForm formData={editRecord} setFormData={setEditRecord} onSave={handleEditRecord} submitText="Agree"/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CopiedTablesComponent;
