import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const setDay = day => setState(prev => ({ ...prev, day }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => {
        if (res.status === 204) {
          const index = Math.floor((id - 1) / 5);
          setState(prev => {
            const dayCopy = [...prev.days];
            dayCopy[index].spots -= 1;
            return { ...prev, appointments, days: dayCopy };
          });
        }
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        const index = Math.floor((id - 1) / 5);
        setState(prev => {
          const dayCopy = [...prev.days];
          dayCopy[index].spots += 1;
          return { ...prev, appointments, days: dayCopy };
        });
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    })
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}