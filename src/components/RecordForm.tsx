import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Record, emptyRecord } from '../interfaces/Record';

interface AddRecordFormProps {
    onSave: (record: Record) => void;
    formData: Record;
    setFormData: React.Dispatch<React.SetStateAction<Record>>;
    inputWidth?: 'full' | 'half';
    submitText?: string;
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

const RecordForm: React.FC<AddRecordFormProps> = ({
    onSave,
    formData,
    setFormData,
    inputWidth = 'full',
    submitText = 'Add',
  }) => {
  
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
      setNameError(!validateName(formData.name));
    };
    const handleSurnameBlur = () => {
      setSurnameError(!validateSurname(formData.surname));
    };
    const handleAgeBlur = () => {
      setAgeError(!validateAge(formData.age as string));
    };
    const handleCityBlur = () => {
      setCityError(formData.city === '');
    };
  
    const isFormValid = () => {
      const isNameValid = validateName(formData.name);
      const isSurnameValid = validateSurname(formData.surname);
      const isAgeValid = validateAge(formData.age as string);
      const isCityValid = formData.city !== '';
  
      return isNameValid && isSurnameValid && isAgeValid && isCityValid;
    };
  
    const handleAddRecord = (e: React.FormEvent) => {
      const isNameValid = validateName(formData.name);
      const isSurnameValid = validateSurname(formData.surname);
      const isAgeValid = validateAge(formData.age as string);
      const isCityValid = formData.city !== '';
  
      if (isFormValid()) {
        const newRecord: Record = {
          ...formData,
          id: formData?.id || Date.now(),
        };
  
        onSave(newRecord);
  
        setFormData(emptyRecord);
      }
  
      setNameError(!isNameValid);
      setSurnameError(!isSurnameValid);
      setAgeError(!isAgeValid);
      setCityError(!isCityValid);
    };

  const handleInputChange = (value: string | number, key: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const inputClass = inputWidth === 'half' ? 'half-width-input' : 'full-width-input';
  const selectStyle: React.CSSProperties = inputWidth === 'half' ? { width: '50%' } : { width: '100%' };

    return (
      <div className='form-container'>
      <form className='form'>
        <TextField
          className={`form-input ${inputClass}`}
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleInputChange(e.target.value, 'name')}
          required
          error={nameError}
          helperText={nameError && nameHelperText}
          onBlur={handleNameBlur}
        />
        <TextField
          className={`form-input ${inputClass}`}
          placeholder="Surname"
          value={formData.surname}
          onChange={(e) => handleInputChange(e.target.value, 'surname')}
          required
          error={surnameError}
          helperText={surnameError && surnameHelperText}
          onBlur={handleSurnameBlur}
        />
        <TextField
          className={`form-input ${inputClass}`}
          placeholder="Age"
          value={formData.age}
          onChange={(e) => handleInputChange(e.target.value, 'age')}
          inputProps={{ min: 1, max: 150 }}
          required
          error={ageError}
          helperText={ageError && ageHelperText}
          onBlur={handleAgeBlur}
        />
         <FormControl className="form-select" style={selectStyle} error={cityError}>
            <Select
              value={formData.city}
              displayEmpty
              onBlur={handleCityBlur} 
              onChange={(e) => handleInputChange(e.target.value as string, 'city')}
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

export default RecordForm;

