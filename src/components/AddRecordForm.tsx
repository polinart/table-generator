import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Record } from '../interfaces/Record';
import { tableDataSubject, tableDataKey } from '../data/tableDataSubject';

interface AddRecordFormProps {
    onSave: (record: Record) => void;
    initialValues?: Record | null;
    submitText?: string;
    isNewRecord?: boolean;
}

const citiesLatvia = [
    'Riga',
    'Daugavpils',
    'Liepaja',
    'Jelgava',
    'Jurmala',
    'Ventspils',
    'Rezekne',
    'Valmiera',
    'Jekabpils',
    'Ogre',
  ];

const AddRecordForm: React.FC<AddRecordFormProps> = ({
    onSave,
    initialValues,
    isNewRecord,
    submitText = 'Add',
  }) => {
  
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [cityError, setCityError] = useState(false);
  
    const validateName = (value: string) => /^[A-Za-zА-Яа-я\s-]+$/.test(value);
    const validateSurname = (value: string) => /^[A-Za-zА-Яа-я\s-]+$/.test(value);
    const validateAge = (value: string) => /^[1-9][0-9]?$|^150$/.test(value);
    const nameHelperText = 'Please enter a valid name. Only letters (both Latin and Cyrillic), spaces, and dashes are allowed.';
    const surnameHelperText = 'Please enter a valid surname. Only letters (both Latin and Cyrillic), spaces, and dashes are allowed.';
    const ageHelperText = 'Please enter a valid age. Age must be between 1 and 150.';
    const cityHelperText = 'Please select a city.';
    
    const handleNameBlur = () => {
      setNameError(!validateName(name));
    };
    const handleSurnameBlur = () => {
      setSurnameError(!validateSurname(surname));
    };
    const handleAgeBlur = () => {
      setAgeError(!validateAge(age));
    };
    const handleCityBlur = () => {
      setCityError(city === '');
    };
  
    useEffect(() => {
      const storedData = localStorage.getItem(tableDataKey);
      if (storedData) {
        setTableData(JSON.parse(storedData));
      }
    }, []);
  
    useEffect(() => {
      if (initialValues) {
        setName(initialValues.name);
        setSurname(initialValues.surname);
        setAge(initialValues.age.toString());
        setCity(initialValues.city);
      } else {
        // Добавьте очистку полей, если нет initialValues
        setName('');
        setSurname('');
        setAge('');
        setCity('');
      }
    }, [initialValues]);
  
    const setTableData = (data: Record[]) => {
      localStorage.setItem(tableDataKey, JSON.stringify(data));
      tableDataSubject.next(data);
    };
  
    const isFormValid = () => {
      const isNameValid = validateName(name);
      const isSurnameValid = validateSurname(surname);
      const isAgeValid = validateAge(age);
      const isCityValid = city !== '';
  
      // Проверяем, что все поля валидны
      return isNameValid && isSurnameValid && isAgeValid && isCityValid;
    };
  
    const handleAddRecord = (e: React.FormEvent) => {
      const isNameValid = validateName(name);
      const isSurnameValid = validateSurname(surname);
      const isAgeValid = validateAge(age);
      const isCityValid = city !== '';
  
      if (isFormValid()) {
        const newRecord: Record = {
          id: isNewRecord ? Date.now() : initialValues?.id || Date.now(),
          name,
          surname,
          age: parseInt(age),
          city,
        };
  
        onSave(newRecord);
  
        // Очищаем поля формы
        setName('');
        setSurname('');
        setAge('');
        setCity('');
      }
  
      setNameError(!isNameValid);
      setSurnameError(!isSurnameValid);
      setAgeError(!isAgeValid);
      setCityError(!isCityValid);
    };
  
    return (
      <div className='form-container'>
      <form className='form'>
        <TextField
          className="form-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          error={nameError} // Показываем ошибку, если поле не валидно
          helperText={nameError && nameHelperText} // Показываем сообщение об ошибке
          onBlur={handleNameBlur}
        />
        <TextField
          className="form-input"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
          required
          error={surnameError} // Показываем ошибку, если поле не валидно
          helperText={surnameError && surnameHelperText} // Показываем сообщение об ошибке
          onBlur={handleSurnameBlur}
        />
        <TextField
          className="form-input"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          inputProps={{ min: 1, max: 150 }}
          fullWidth
          required
          error={ageError} // Показываем ошибку, если поле не валидно
          helperText={ageError && ageHelperText} // Показываем сообщение об ошибке
          onBlur={handleAgeBlur}
        />
         <FormControl className="form-select" error={cityError}>
            <Select
              className="form-input"
              value={city}
              onChange={(e) => setCity(e.target.value as string)}
              displayEmpty
              onBlur={handleCityBlur} 
            >
              <MenuItem value="" disabled>
                Select a city
              </MenuItem>
              {citiesLatvia.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
            {cityError && <FormHelperText>{cityHelperText}</FormHelperText>}
          </FormControl>
        <Button 
          className="form-button" 
          variant="contained" 
          color="primary" 
          onClick={handleAddRecord}
          disabled={!isFormValid()}
          >
        {submitText}
        </Button>
      </form>
      </div>
    );
};

export default AddRecordForm;