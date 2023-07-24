export interface Record {
    id: number;
    name: string;
    surname: string;
    age: number | string;
    city: string;
}

export const emptyRecord = { id: 0, name: '', surname: '', age: '', city: ''  };