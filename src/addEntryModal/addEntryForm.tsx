import React, { useState, useCallback } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik  } from "formik";
import { Form, Dropdown, DropdownProps, Divider } from "semantic-ui-react";
import { TextField } from "./FormField";
import { NewEntry, EntryType  } from '../types';
import EntryField from './EntryTypeFields';
import { useStateValue } from "../state";
import { DiagnosisSelection } from './FormField';




const options = [
  {
    key: EntryType.HealthCheck,
    value: EntryType.HealthCheck,
    text: "Health Check",
  },
  {
    key: EntryType.OccupationalHealthCare,
    value: EntryType.OccupationalHealthCare,
    text: "Occupational Health Care",
  },
  { key: EntryType.Hospital,
    value: EntryType.Hospital,
    text: "Hospital"
   },
];


const baseInitialValues = {
  description: '',
  date: '',
  specialist: ''
};

const healthCheckInitialValues: NewEntry  = {
  ...baseInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0,
};

const OccupationalHealthCareInitialValues: NewEntry  = {
  ...baseInitialValues,
  type: EntryType.OccupationalHealthCare,
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: ''
  },
};

const  HospitalEntryInitialValues: NewEntry  = {
  ...baseInitialValues,
  type: EntryType.Hospital,
  discharge: {
    date: '',
    criteria: ''
  },
};

interface PropsForSender {
onSubmit: (values: NewEntry) => void;
onCancel: () => void;
}
export const FormSender: React.FC<PropsForSender> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const handleChange = (
    _e: React.SyntheticEvent,
    { value }: DropdownProps
  ): void => {
    if (value) setEntryType(value as EntryType);
  };

  const entryForm = useCallback(() => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <AddEntryForm
            initialValues={healthCheckInitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.OccupationalHealthCare:
        return (
          <AddEntryForm
            initialValues={OccupationalHealthCareInitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.Hospital:
        return (
          <AddEntryForm
            initialValues={HospitalEntryInitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      default:
        return null;
    }
  }, [entryType, onCancel, onSubmit]);
  return (
    <>
      <Form>
        <Form.Field>
          <label>Entry Type</label>
          <Dropdown
            fluid
            onChange={handleChange}
            options={options}
            selection
            value={entryType}
          />
        </Form.Field>
      </Form>

      <Divider />

      {entryForm()}
    </>
  );

};

interface Props {
  initialValues: NewEntry;
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, initialValues }) => { 
  const [{ diagnoses }] = useStateValue();

    return (
      <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validate={values => {                                 /// missing real validation. date -minlength etc.
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError; 
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}>
          {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui" onSubmit={() => onSubmit(values)}>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />   
            <EntryField entryType={values.type} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}</Formik>

    );
};