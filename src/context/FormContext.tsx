import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Record } from '../interfaces/Record';

// Определяем интерфейс для контекста
interface FormContextProps {
  formData: Record;
  setFormData: React.Dispatch<React.SetStateAction<Record>>;
}

// Создаем контекст
const FormContext = createContext<FormContextProps | undefined>(undefined);

// Создаем провайдер контекста, который будет оборачивать наше приложение
// Принимаем ReactNode вместо пустых фигурных скобок
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Record>({
    id: 0,
    name: '',
    surname: '',
    age: 0,
    city: '',
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Кастомный хук для удобного доступа к данным контекста
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
