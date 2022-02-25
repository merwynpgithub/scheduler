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
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
        onClick={() => props.setInterviewer(props.id)}
      />
      Sylvia Palmer
    </li>
  );
};