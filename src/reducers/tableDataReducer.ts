import { combineReducers } from 'redux';
import { Record } from '../interfaces/Record';
import { tableDataSubject, tableDataKey } from '../data/tableDataSubject';
import { AnyAction } from 'redux';

// Define the initial state for the main table
const initialMainTableState: Record[] = [];

// Define the initial state for the copied tables
const initialCopiedTablesState: Record[][] = [];

// Define the tableDataReducer
const tableDataReducer = (state: Record[] = initialMainTableState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_MAIN_TABLE_DATA':
      return action.payload;
    case 'ADD_RECORD':
      return [...state, action.payload];
    case 'EDIT_RECORD':
      return state.map((record) =>
        record.id === action.payload.id ? action.payload : record
      );
    case 'DELETE_RECORD':
      return state.filter((record) => record.id !== action.payload);
    default:
      return state;
  }
};

const copiedTablesReducer = (state: Record[][] = initialCopiedTablesState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_COPIED_TABLES_DATA':
      return action.payload;
    case 'ADD_COPIED_TABLE':
      return [...state, action.payload];
    case 'DELETE_COPIED_TABLE':
      return state.filter((_, index) => index !== action.payload);
    case 'EDIT_COPIED_RECORD':
      return state.map((tableData, index) =>
        index === action.payload.tableIndex
          ? tableData.map((record) =>
              record.id === action.payload.record.id ? action.payload.record : record
            )
          : tableData
      );
    case 'DELETE_COPIED_RECORD':
      return state.map((tableData, index) =>
        index === action.payload.tableIndex
          ? tableData.filter((record) => record.id !== action.payload.recordId)
          : tableData
      );
    default:
      return state;
  }
};

// Combine the reducers
const rootReducer = combineReducers({
  mainTableData: tableDataReducer,
  copiedTablesData: copiedTablesReducer,
});

export default rootReducer;
