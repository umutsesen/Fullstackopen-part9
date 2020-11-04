/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, gender } from './types';

export const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseText(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        ssn: parseText(object.ssn),
        occupation: parseText(object.occupation)
    };

};

const isGender = (param: any): param is gender => {
    return Object.values(gender).includes(param);
  };
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };  
  const parseGender = (gender: any): gender => {
    if (!gender || !isGender(gender)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
  };



const parseText = (text: any): string => {
    if (!text || !isString(text)) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      throw new Error('Incorrect or missing comment: ' + text);
    }
  
    return text;
  }; 
export default toNewPatientEntry;