import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Empty from './Empty';

export default function Appointment(props) {
  return (
    <article className="appointment">
      {!props.time && "No Appointements"}
      {props.time && `Appointement at ${props.time}`}
    </article>
  );
}