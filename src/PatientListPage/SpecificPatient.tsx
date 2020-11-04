import React from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { updatePatient, useStateValue } from "../state";
//import AddPatientModal from "../AddPatientModal";
//import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
//import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Button } from "semantic-ui-react";
import EntryDetails from './EntryDetails';
import AddEntryModal from '../addEntryModal';
import { NewEntry, Patient } from '../types';
//import { updatePatient } from '../state/reducer';
const SpesificPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();

    const patient = patients[id];
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };
    
  //  const submitNewPatient = async (values: PatientFormValues) => {
      //  try {
  ////        const { data: updatedPatient } = await axios.post<Patient>(
   //         `${apiBaseUrl}/patients`,
   //         values
   //       );
     //     dispatch(updatePatient(updatedPatient));
     //     closeModal();
     //   } catch (e) {
      //    console.error(e.response.data);
       //   setError(e.response.data.error);
       // }
     // };  <Button onClick={() => openModal()}>Update Patient</Button>
     // <AddPatientModal
  //   modalOpen={modalOpen}
  //   onSubmit={submitNewPatient}
  //   error={error}
  //   onClose={closeModal}                                updating patient was unneccessary.
//   />

    const submitNewEntry = async (values: NewEntry) => {
      try {
        const { data: newEntry } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, values);
        dispatch(updatePatient(newEntry));
        closeModal();
        
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };
    if (patient) {
    return (
        <div>
           
            <Button onClick={() => openModal()}>Add New Entry</Button>
            <ul>
           <li>Name: {patient.name}</li>
           <li>Birth Date: {patient.dateOfBirth}</li>
           <li>Gender: {patient.gender}</li>
           <li>Job: {patient.occupation}</li>
           </ul>
           <h3>Entries</h3>
           {patient.entries.map(entry => 
           <EntryDetails key={entry.id} entry={entry} />)}
           
      <AddEntryModal modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal}/>
        </div>
        
    );}
    else return (
        <div>..Loading</div>
    );
};



export default SpesificPage;