import { BehaviorSubject } from 'rxjs';
import { Record } from '../interfaces/Record';

export const tableDataKey = 'tableData';
export const tableDataSubject = new BehaviorSubject<Record[]>([]);