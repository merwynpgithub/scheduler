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

//Defining all visualMode states
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

  /**
   * Book a new appointment or edit an existing one
   * @param {*} name 
   * @param {*} interviewer object
   */
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

  /**
   * cancel an existing appointment
   */
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
      
      {/* Initial mode when no appointment */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {/* mode when booking appointment */}
      {mode === CREATE && (
        <Form
          interview={props.interview}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {/* mode while saving appointment and sceduler api updates*/}
      {mode === SAVING && <Status message={SAVING} />}

      {/* mode when appointment is booked */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onConfirm={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {/* mode while canceling appointment and sceduler api updates*/}
      {mode === DELETING && <Status message={DELETING} />}

      {/* mode to confirm cancellation */}
      {mode === CONFIRM && (
        <Confirm
          message={"Delete the Appointment?"}
          onConfirm={delInterview}
          onCancel={() => back()}
        />)}
      
      {/* mode while editing appointment */}
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

      {/* mode if scheduler api is unable to book appointment */}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save the appointment."
          onClose={() => transition(EMPTY)}
        />
      )}

      {/* mode if scheduler api is unable to cancel appointment */}
      {mode === ERROR_CANCEL && (
        <Error
          message="Could not cancel the appointment."
          onClose={() => back()}
        />
      )}

      {/* mode if user tries to book appointemt without both name and interviewer */}
      {mode === ERROR_INCOMPLETE && (
        <Error
          message="Incomplete form. Please enter student name and select interviewer."
          onClose={() => back()}
        />
      )}

    </article>
  );
}