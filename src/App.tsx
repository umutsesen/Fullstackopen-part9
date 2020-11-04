import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, Diagnosis } from "./types";
import SpesificPage from './PatientListPage/SpecificPatient';
import { setPatientList, setDiagnoses } from './state/reducer';
import PatientListPage from "./PatientListPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);
  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: DiagnosisListFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnoses(DiagnosisListFromApi));
      } catch(e) {
        console.error(e);
    } 
    };
    fetchDiagnosisList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
     
          <Switch>
          <Route exact path='/patient/:id' component={SpesificPage} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
          
        </Container>
      </Router>
    </div>
  );
};

export default App;
