import diagnoseEntries from '../../data/diagnoseEntries';
import { patientEntries } from '../../data/patientEntries';
import { DiagnoseEntry, NonSSNPatientEntry, PatientEntry, NewPatientEntry, NewEntry, Entry } from '../types';
import { uuid } from 'uuidv4';



let savedPatients = [...patientEntries ];
const getPatientEntries = (): NonSSNPatientEntry[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};
const getPatientByID = (id: string): PatientEntry | undefined => {
  const patient = patientEntries.find(p => p.id === id);
  return patient;
};


const getDiagnoseEntries = (): Array<DiagnoseEntry> => {
  return diagnoseEntries;
};
const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatient = { ...patient, id: uuid(), entries: [] as Entry[] };
  savedPatients = savedPatients.concat(newPatient);
  return newPatient;
};



const addEntry = (entry: NewEntry, patientid: string ): PatientEntry | undefined=> {
  const newPatientEntry = {
    ...entry,
    id: uuid(),
  };
  const foundpatient = patientEntries.find(patient => patient.id === patientid); // missing validation
  foundpatient?.entries.push(newPatientEntry);
  return foundpatient;
};

export default {
  getDiagnoseEntries,
  addEntry,
  getPatientEntries,
  getPatientByID,
  addPatient
};