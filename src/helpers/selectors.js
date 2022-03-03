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