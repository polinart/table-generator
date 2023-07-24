
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Record } from '../interfaces/Record';

interface TablesDataState {
    data: Record[];
  }
  
  const initialState: TablesDataState = {
    data: [],
  };
  
  const tablesDataSlice = createSlice({
    name: 'tablesData',
    initialState,
    reducers: {
      addRecord: (state, action: PayloadAction<Record>) => {
        state.data.push(action.payload);
      },
      editRecordAction: (state, action: PayloadAction<Record>) => {
        const { id } = action.payload;
        const index = state.data.findIndex((record) => record.id === id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      },
      deleteRecordAction: (state, action: PayloadAction<number>) => {
        state.data = state.data.filter((record) => record.id !== action.payload);
      },
    },
  });

  export const {
    addRecord,
    editRecordAction,
    deleteRecordAction,
  } = tablesDataSlice.actions;

  export default tablesDataSlice.reducer;