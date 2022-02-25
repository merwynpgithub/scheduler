import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from 'classnames';

export default function InterviewerListItem(props) {
  const interviewClasses = classNames(
    "interviewers__item",
    {"interviewers__item--selected": props.selected}
  );
  return (
    <li className={interviewClasses}>
      <img
        className="interviewers__item-image"
        src={props.src}
        alt={props.name}
        onClick={props.setInterviewer}
      />
      {props.selected && props.name}
    </li>
  );
};