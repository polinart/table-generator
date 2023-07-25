import React, { useRef, useState }  from 'react';
import { Grid, Button } from '@mui/material';
import './App.scss';
import { Record, emptyRecord } from './interfaces/Record';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { addRecord } from './slices/tablesDataSlice';
import { editCopiedRecord, deleteCopiedRecord, deleteCopiedTable, addCopiedTable } from './slices/copiedTablesSlices';  
import TableComponent from './components/TableComponent';
import CopiedTablesComponent from './components/CopiedTablesComponent';
import RecordForm from './components/RecordForm';

const App: React.FC = () => {
  const [formData, setFormData] = useState<Record>(emptyRecord);
  const tableData = useSelector((state: RootState) => state.tablesData.data);
  const copiedTables = useSelector((state: RootState) => state.copiedTables.data);
  const dispatch = useDispatch();
  const copiedTableRef = useRef<HTMLDivElement>(null);

  const handleAddRecord = (record: Record) => {
    dispatch(addRecord(record));
  };

  const handleCopyTable = () => {
    dispatch(addCopiedTable([...tableData]));
    setTimeout(() => {
      copiedTableRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
          <Grid item sm={4}>
          <h2>Add new record to Main table - Form 1</h2>
          <RecordForm formData={formData} setFormData={setFormData} onSave={handleAddRecord} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container justifyContent="flex-end">
              <Button variant="contained" color="primary" className='copy-button' onClick={handleCopyTable}>
                Copy Table
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={10} className="table-container">
            <TableComponent />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item sm={6}>
            <h2>Add new record to Main table - Form 2</h2>
            <RecordForm formData={formData} setFormData={setFormData} onSave={handleAddRecord} inputWidth='half'/>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={10}>
            <h2>Copied tables list</h2>
          </Grid>
        </Grid>
        {copiedTables.length > 0 &&
          <CopiedTablesComponent
            copiedTables={copiedTables}
            onEditRecord={handleEditCopiedRecord}
            onDeleteRecord={handleDeleteCopiedRecord}
            onDeleteTable={handleDeleteCopiedTable}
            lastTableRef={copiedTableRef}
          />}
      </div>
  );
};

export default App;
