import React, { useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

interface Record {
  id: number;
  name: string;
  surname: string;
  age: number;
  city: string;
}

// Создаем BehaviorSubject для хранения данных таблицы
const tableDataSubject = new BehaviorSubject<Record[]>([
  { id: 1, name: 'John', surname: 'Doe', age: 25, city: 'New York' },
]);

// Компонент формы добавления записей
const AddRecordForm: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');

  const handleAddRecord = () => {
    // Проверяем, что все поля заполнены
    if (name && surname && age && city) {
      // Создаем новую запись
      const newRecord: Record = {
        id: Date.now(),
        name,
        surname,
        age: parseInt(age),
        city,
      };

      // Получаем текущие данные таблицы
      const currentData = tableDataSubject.getValue();

      // Обновляем данные таблицы, добавляя новую запись
      tableDataSubject.next([...currentData, newRecord]);

      // Сбрасываем значения полей формы
      setName('');
      setSurname('');
      setAge('');
      setCity('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleAddRecord}>Add</button>
    </div>
  );
};

// Компонент таблицы
const Table: React.FC = () => {
  const [tableData, setTableData] = useState<Record[]>([]);

  // Подписываемся на изменения данных таблицы
  tableDataSubject.pipe(take(1)).subscribe((data) => {
    setTableData(data);
  });

  const handleEditRecord = (id: number) => {
    // Находим запись по id
    const record = tableData.find((item) => item.id === id);

    // Открываем модальное окно для редактирования
    // (реализация модального окна опущена в этом коде)
    if (record) {
      //openModalForEdit(record);
    }
  };

  const handleDeleteRecord = (id: number) => {
    // Фильтруем записи, оставляя только те, которые необходимо удалить
    const filteredData = tableData.filter((item) => item.id !== id);

    // Обновляем данные таблицы
    tableDataSubject.next(filteredData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((record) => (
          <tr key={record.id}>
            <td>{record.name}</td>
            <td>{record.surname}</td>
            <td>{record.age}</td>
            <td>{record.city}</td>
            <td>
              <button onClick={() => handleEditRecord(record.id)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDeleteRecord(record.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Компонент страницы
const Page: React.FC = () => {
  const handleCopyTable = () => {
    // Получаем текущие данные таблицы
    const currentData = tableDataSubject.getValue();

    // Создаем копию данных таблицы
    const copiedData = [...currentData];

    // Обновляем данные таблицы, добавляя копию
    tableDataSubject.next([...currentData, ...copiedData]);
  };

  const handleDeleteTable = () => {
    // Получаем текущие данные таблицы
    const currentData = tableDataSubject.getValue();

    // Удаляем последнюю таблицу из данных
    const updatedData = currentData.slice(0, -1);

    // Обновляем данные таблицы
    tableDataSubject.next(updatedData);
  };

  return (
    <div>
      <AddRecordForm />
      <Table />
      <button onClick={handleCopyTable}>Copy table</button>
      <button onClick={handleDeleteTable}>Delete table</button>
    </div>
  );
};

export default Page;
