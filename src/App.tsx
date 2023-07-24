import React from 'react';
import { Grid, Button } from '@mui/material';
import './App.scss';
import { Record } from './interfaces/Record';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { addRecord } from './store'
import { editCopiedRecord, deleteCopiedRecord, deleteCopiedTable, addCopiedTable } from './slices/copiedTablesSlices';  
import TableComponent from './components/TableComponent';
import CopiedTablesComponent from './components/CopiedTablesComponent';
import AddRecordForm from './components/AddRecordForm';

const App: React.FC = () => {
  const tableData = useSelector((state: RootState) => state.tablesData.data);
  const copiedTables = useSelector((state: RootState) => state.copiedTables.data);
  const dispatch = useDispatch();

  const handleAddRecord = (record: Record) => {
    dispatch(addRecord(record));
  };

  const handleCopyTable = () => {
    dispatch(addCopiedTable([...tableData]));
  };

  const handleDeleteCopiedRecord = (tableIndex: number, id: number) => {
    dispatch(deleteCopiedRecord({tableIndex, id}));
  };

  const handleEditCopiedRecord = (tableIndex: number, record: Record) => {
    dispatch(editCopiedRecord({tableIndex, editedRecord: record}));
  };

  const handleDeleteCopiedTable = (tableIndex: number) => {
    dispatch(deleteCopiedTable(tableIndex));
  };

  return (
      <div className="app">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <AddRecordForm onSave={handleAddRecord} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Button variant="contained" color="primary" onClick={handleCopyTable}>
              Copy Table
            </Button>
          </Grid>
        </Grid>
        <TableComponent />
        {copiedTables.length > 0 &&
          <CopiedTablesComponent
            copiedTables={copiedTables}
            onEditRecord={handleEditCopiedRecord}
            onDeleteRecord={handleDeleteCopiedRecord}
            onDeleteTable={handleDeleteCopiedTable}
          />}
      </div>
  );
};

export default App;
