import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log(props.interviewers);
  const interviewerList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        src={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  );
};