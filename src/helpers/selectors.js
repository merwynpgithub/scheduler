export function getAppointmentsForDay(state, day) {
  let result = [];
  state.days.forEach(item => {
    if (item.name === day) {
      const appointmentList = item.appointments;
      appointmentList.forEach(i => {
        result.push(state.appointments[i]);
      })
    };
  })
  return result;
};

export function getInterview(state, interview) {
  if (interview === null) return null;
  const interviewerId = interview.interviewer;
  return {...interview, interviewer: state.interviewers[interviewerId]};
};

export function getInterviewersForDay(state, day) {
  let result = [];
  state.days.forEach(item => {
    if (item.name === day) {
      const interviewerList = item.interviewers || [];
      interviewerList.forEach(i => {
        result.push(state.interviewers[i]);
      })
    };
  })
  return result;
};