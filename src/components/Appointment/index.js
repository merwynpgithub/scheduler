import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_CANCEL = "ERROR_CANCEL";
const ERROR_INCOMPLETE = "ERROR_INCOMPLETE";

export default function Appointment(props) {
  const { mode, transition, back, history } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    if (!name || !interviewer) {
      transition(ERROR_INCOMPLETE);
    } else {
      transition(SAVING);
      let editInterview = false;
      if (history[history.length - 1] === "EDIT") {
        editInterview = true;
      }
      props.bookInterview(props.id, interview, editInterview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    }
  }

  function delInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_CANCEL, true));
  }

  return (
    <article className="appointment">
      {!props.time && "No Appointments"}
      {props.time && <Header time={props.time} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onConfirm={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interview={props.interview}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Delete the Appointment?"}
          onConfirm={delInterview}
          onCancel={() => back()}
        />)}
      {mode === EDIT && (
        <Form
          interview={props.interview}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save the appointment."
          onClose={() => transition(EMPTY)}
        />
      )}
      {mode === ERROR_CANCEL && (
        <Error 
          message="Could not cancel the appointment."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_INCOMPLETE && (
        <Error 
          message="Incomplete form. Please enter student name and select interviewer."
          onClose={() => back()}
        />
      )}
      
    </article>
  );
}