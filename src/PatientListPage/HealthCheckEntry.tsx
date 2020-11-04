import React from "react";
import { Entry } from '../types';
import DiagnosisList from './DiagnosisList';
import { Card, Icon } from "semantic-ui-react";

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <Card fluid>
        <Card.Content>
            <Card.Header>
            {entry.date} <Icon name='hospital' />
            </Card.Header>
            <Card.Meta>by {entry.specialist} </Card.Meta>
            <Card.Description>{entry.description} </Card.Description>
            {entry.diagnosisCodes ?  <DiagnosisList diagnosesCodes={entry.diagnosisCodes} />: ''}
             
        </Card.Content>
    

    </Card>
    );

};


export default HealthCheckEntry;