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
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import TableCell from '@mui/material/TableCell';
import { Record, emptyRecord } from '../interfaces/Record';
import RecordForm from './RecordForm';

interface CopiedTablesComponentProps {
  copiedTables: Record[][];
  onEditRecord: (tableIndex: number, record: Record) => void;
  onDeleteRecord: (tableIndex: number, id: number) => void;
  onDeleteTable: (tableIndex: number) => void;
  lastTableRef: React.RefObject<HTMLDivElement>;
}

const CopiedTablesComponent: React.FC<CopiedTablesComponentProps> = ({
  copiedTables,
  onEditRecord,
  onDeleteRecord,
  onDeleteTable,
  lastTableRef
}) => {

  const [editRecord, setEditRecord] = useState<Record>(emptyRecord);
  const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
  const [deleteTableId, setDeleteTableId] = useState<number | null>(null);
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

  const handleDeleteTableClick = (tableIndex: number) => {
    setDeleteTableId(tableIndex);
  };

  const handleDeleteTableConfirm = () => {
    if (deleteTableId !== null) {
        onDeleteTable(deleteTableId);
        setDeleteTableId(null);
    }
  };

  const handleEditRecord = (record: Record) => {
    if (tableId !== null) {
        onEditRecord(tableId, record);
        setEditRecord(emptyRecord);
        setOpenModal(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteRecordId && tableId !== null) {
        onDeleteRecord(tableId, deleteRecordId);
        setDeleteRecordId(null);
        // remove all table if user want to remove last table element
        if (copiedTables[tableId].length === 1) {
            setDeleteTableId(null);
            onDeleteTable(tableId);
        }
    }
  };

  return (
    <div className='copied-tables-container'>
      {copiedTables.map((tableData, tableIndex) => (
        <div key={tableIndex} className='table-container' ref={(tableIndex === copiedTables.length - 1) ? lastTableRef : null}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={10}>
                <Grid container justifyContent="flex-end">
                <IconButton 
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDeleteTableClick(tableIndex)}
                >
                    <ClearIcon />
                </IconButton>
                </Grid>
            </Grid>
              <Grid item xs={12} sm={10} className="table-container">
              <TableContainer component={Paper}>
                <Table className="table">
                  <TableHead>
                    <TableRow className="table-head">
                      <TableCell>Name</TableCell>
                      <TableCell>Surname</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell align="right">Copy Table #{tableIndex + 1}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((record, recordIndex) => (
                      <TableRow key={record.id} className={(recordIndex === deleteRecordId) ? 'deleting-row' : ''}>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.surname}</TableCell>
                        <TableCell>{record.age}</TableCell>
                        <TableCell>{record.city}</TableCell>
                        <TableCell align="center">
                          {/* Edit and Delete buttons */}
                          <Button
                            onClick={() => handleEditClick(tableIndex, record)}
                          >
                            Edit
                          </Button>
                          <Button
                            color="error"
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
      {/* Delete Record Confirmation Dialog */}
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

      {/* Delete Table Confirmation Dialog */}
      <Dialog open={deleteTableId !== null} onClose={() => setDeleteTableId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this table?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTableId(null)}>Cancel</Button>
          <Button onClick={handleDeleteTableConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Record Dialog */}
      <Dialog open={openModal} onClose={() => setEditRecord(emptyRecord)}>
        <DialogTitle>Edit Record copied table</DialogTitle>
        <DialogContent>
          <RecordForm formData={editRecord} setFormData={setEditRecord} onSave={handleEditRecord} submitText="Agree"/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CopiedTablesComponent;
