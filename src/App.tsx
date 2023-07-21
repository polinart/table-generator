import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import './App.scss';
import { Record } from './interfaces/Record';
import TableComponent from './components/TableComponent';
import AddRecordForm from './components/AddRecordForm';
import { tableDataSubject, tableDataKey } from './data/tableDataSubject';
import { BehaviorSubject } from 'rxjs';

const App: React.FC = () => {
  const [copiedTables, setCopiedTables] = useState<BehaviorSubject<Record[]>[]>([]);


  useEffect(() => {
    // Подписываемся на обновления данных из copiedTables
    const subscription = new BehaviorSubject(copiedTables).subscribe((data) => {
      // Преобразуем данные в обычный массив перед сохранением в localStorage
      const dataToSave = data.map((behaviorSubject) => behaviorSubject.getValue());
      localStorage.setItem("copiedTables", JSON.stringify(dataToSave));
    });
  
    // Отписываемся от подписки при размонтировании компонента
    return () => {
      subscription.unsubscribe();
    };
  }, [copiedTables]);
  
  useEffect(() => {
    // Загрузка данных из localStorage при монтировании компонента
    const storedData = localStorage.getItem("copiedTables");
    if (storedData) {
      const parsedData: Record[][] = JSON.parse(storedData);
      // Преобразуем массив данных в массив BehaviorSubject
      const copiedTableSubjects = parsedData.map((data) => new BehaviorSubject<Record[]>(data));
      setCopiedTables(copiedTableSubjects);
    }
  }, []);

  // Загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    const storedData = localStorage.getItem(tableDataKey);
    if (storedData) {
      tableDataSubject.next(JSON.parse(storedData));
    }
  }, []);

  const handleAddRecord = (record: Record) => {
    // Добавляем новую запись в BehaviorSubject
    tableDataSubject.next([...tableDataSubject.getValue(), record]);
  };

  const handleEditRecord = (editedRecord: Record) => {
    // Обновляем данные в BehaviorSubject, заменяя старую запись на отредактированную
    const newData = tableDataSubject.getValue().map((record) =>
      record.id === editedRecord.id ? editedRecord : record
    );
    tableDataSubject.next(newData);
  };

  const handleDeleteRecord = (id: number) => {
    // Удаляем запись из таблицы
    const filteredData = tableDataSubject.getValue().filter((record) => record.id !== id);
    tableDataSubject.next(filteredData);
  };

  useEffect(() => {
    // Подписываемся на обновления данных из tableDataSubject
    const subscription = tableDataSubject.subscribe((data) => {
      // Сохраняем данные в localStorage при изменении tableDataSubject
      localStorage.setItem(tableDataKey, JSON.stringify(data));
    });

    // Отписываемся от подписки при размонтировании компонента
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleCopyTable = () => {
    const newCopiedTable = [...tableDataSubject.getValue()]; // Копируем данные из главной таблицы
    const newCopiedTableSubject = new BehaviorSubject<Record[]>(newCopiedTable); // Создаем новый BehaviorSubject с скопированными данными
    setCopiedTables((prevCopiedTables) => [...prevCopiedTables, newCopiedTableSubject]); // Добавляем новый BehaviorSubject в массив copiedTables
  };

  const handleDeleteCopiedTable = (tableIndex: number) => {
    setCopiedTables((prevCopiedTables) => {
      const updatedCopiedTables = [...prevCopiedTables];
      updatedCopiedTables.splice(tableIndex, 1); // Удаляем скопированную таблицу по индексу
      return updatedCopiedTables;
    });
  };

  const handleEditCopiedRecord = (editedRecord: Record, tableIndex: number) => {
    const editedData = copiedTables[tableIndex].getValue().map((record) =>
      record.id === editedRecord.id ? editedRecord : record
    );
    copiedTables[tableIndex].next(editedData);
  };

  const handleDeleteCopiedRecord = (id: number, tableIndex: number) => {
    const filteredData = copiedTables[tableIndex].getValue().filter((record) => record.id !== id);
    copiedTables[tableIndex].next(filteredData);
  };

  return (
    <div className="app">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <AddRecordForm onSave={handleAddRecord} />
        </Grid>
        <Grid item xs={12} sm={10} className='table-container'>
          <Button variant="contained" color="primary" onClick={handleCopyTable}>
            Copy Table
        </Button>
          <TableComponent
            dataSubject={tableDataSubject}
            onEditRecord={handleEditRecord}
            onDeleteRecord={handleDeleteRecord}
          />
        </Grid>
      </Grid>
      {copiedTables.length > 0 &&
        copiedTables.map((copiedTable, index) => (
          <div key={index}>
            <h2>Copied Table {index + 1}:</h2>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={10} className='table-container'>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteCopiedTable(index)} // Обработчик для кнопки "Delete table"
                >
                  Delete Table
                </Button>
                <TableComponent
                  dataSubject={copiedTable}
                  onEditRecord={(record) => handleEditCopiedRecord(record, index)}
                  onDeleteRecord={(id) => handleDeleteCopiedRecord(id, index)}
                />
              </Grid>
            </Grid>
          </div>
        ))}
    </div>
  );
};


export default App;