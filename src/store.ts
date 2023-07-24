import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import copiedTablesReducer from './slices/copiedTablesSlices';
import tablesDataSliceReducer from './slices/tablesDataSlice';


const persistedTablesDataReducer = persistReducer(
  {
    key: 'tablesData',
    storage,
  },
  tablesDataSliceReducer
);

const persistedCopiedTablesReducer = persistReducer(
  {
    key: 'copiedTables',
    storage,
  },
  copiedTablesReducer
);

export const store = configureStore({
  reducer: {
    tablesData: persistedTablesDataReducer,
    copiedTables: persistedCopiedTablesReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
