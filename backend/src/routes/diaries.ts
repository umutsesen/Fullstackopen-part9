/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diaryFunctions from '../services/diaryService';

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
  res.send(diaryFunctions.getDiagnoseEntries());
});

router.get('/patients', (_req, res) => {
  res.send(diaryFunctions.getPatientEntries());
});

router.get('/patients/:id', (req, res) => {
  const patient = diaryFunctions.getPatientByID(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});
router.post('/patients/:id/entries', (req, res) => {

  try {
    const newEntry = req.body;
    const patientid = req.params.id; 
    const addedEntry = diaryFunctions.addEntry(newEntry, patientid);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send({ error: 'Could not add the Entry'});
  }

});

router.post('/patients', (req, res) => {
  try {
  const NewPatient = req.body; /// lacks validation
  const addedPatient = diaryFunctions.addPatient(NewPatient);
  res.json(addedPatient);
}
catch (e) {
  res.status(400).send({ error: 'Could Not Add the Patient' });
}
});

export default router;