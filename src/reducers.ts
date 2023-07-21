import { combineReducers } from 'redux';
import { Record } from './interfaces/Record';

interface AppState {
  mainTableData: Record[];
}

const initialMainTableData: Record[] = []; // Replace with your initial data

function mainTableDataReducer(state = initialMainTableData, action: any): Record[] {
  // Handle actions and state changes for the mainTableData here
  return state;
}

const rootReducer = combineReducers<AppState>({
  mainTableData: mainTableDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
