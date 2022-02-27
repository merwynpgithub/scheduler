import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import Form from './Form';

export default function Appointment(props) {
  return (
    <article className="appointment">
      {!props.time && "No Appointments"}
      {props.time && `Appointment at ${props.time}`}
      {!props.interview ? <Empty /> : <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />}
    </article>
  );
}