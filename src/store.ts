import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Record } from './interfaces/Record';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import copiedTablesReducer from './slices/copiedTablesSlices';

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


const persistedTablesDataReducer = persistReducer(
  {
    key: 'tablesData',
    storage,
  },
  tablesDataSlice.reducer
);

const persistedCopiedTablesReducer = persistReducer(
  {
    key: 'copiedTables',
    storage,
  },
  copiedTablesReducer
);

export const {
  addRecord,
  editRecordAction,
  deleteRecordAction,
} = tablesDataSlice.actions;

export const store = configureStore({
  reducer: {
    tablesData: persistedTablesDataReducer,
    copiedTables: persistedCopiedTablesReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
