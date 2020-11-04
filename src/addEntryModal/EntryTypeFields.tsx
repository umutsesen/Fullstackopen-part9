import React from "react";
import { Field } from "formik";
import { EntryType } from '../types';
import { NumberField, TextField,  } from './FormField';
interface Props {
    entryType: EntryType;
  }
  

const EntryField: React.FC<Props> = ({ entryType }) => {
    switch (entryType) {
        case EntryType.HealthCheck:
        return <Field
        component={NumberField} 
        label='Health Check Rating' name='healthCheckRating' min={1} max={3}></Field>;
      case EntryType.OccupationalHealthCare:
        return( <>
            <Field name='employerName' component={TextField} label='Employer Name' value=''>
        </Field>
        <Field name='sickLeave.startDate' label='Start Date' component={TextField} placeholder="YYYY-MM-DD">
            </Field>
            <Field name='sickLeave.endDate' label='End Date' component={TextField} placeholder="YYYY-MM-DD">
                </Field>
                </>);
      case EntryType.Hospital:
          return (<>
     <Field name='discharge.date' label='Date' component={TextField} placeholder="YYYY-MM-DD">
        </Field>
        <Field name='discharge.criteria' label='Criteria' component={TextField}></Field>
        </>);
      default:
        return null;
    }
    };



export default EntryField;