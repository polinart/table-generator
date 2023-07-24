import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Record } from '../interfaces/Record';

interface CopiedTablesState {
  data: Record[][];
}

const initialState: CopiedTablesState = {
  data: [],
};

const copiedTablesSlice = createSlice({
  name: 'copiedTables',
  initialState,
  reducers: {
    addCopiedTable: (state, action: PayloadAction<Record[]>) => {
      state.data.push(action.payload);
    },
    editCopiedRecord: (state, action: PayloadAction<{ editedRecord: Record; tableIndex: number }>) => {
      const { editedRecord, tableIndex } = action.payload;
      state.data[tableIndex] = state.data[tableIndex].map((record) =>
        record.id === editedRecord.id ? editedRecord : record
      );
    },
    deleteCopiedRecord: (state, action: PayloadAction<{ id: number; tableIndex: number }>) => {
      const { id, tableIndex } = action.payload;
      state.data[tableIndex] = state.data[tableIndex].filter((record) => record.id !== id);
    },
    deleteCopiedTable: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
  },
});

export const {
  addCopiedTable,
  editCopiedRecord,
  deleteCopiedRecord,
  deleteCopiedTable,
} = copiedTablesSlice.actions;

export default copiedTablesSlice.reducer;

