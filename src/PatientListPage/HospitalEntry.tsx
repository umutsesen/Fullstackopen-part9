import { Entry } from '../types';
import React from "react";
import { Card, Icon } from "semantic-ui-react";
import DiagnosisList from './DiagnosisList';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                {entry.date} <Icon name='user md' />
                </Card.Header>
                <Card.Meta>by {entry.specialist} </Card.Meta>
                <Card.Description>{entry.description} </Card.Description>
                {entry.diagnosisCodes ?  <DiagnosisList diagnosesCodes={entry.diagnosisCodes} />: ''}
                 
            </Card.Content>
        

        </Card>

    );

};


export default HospitalEntry;