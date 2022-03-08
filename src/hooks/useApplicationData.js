import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const setDay = day => setState(prev => ({ ...prev, day }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const [spots, setSpots] = useState(0);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(res => {
      if (res.status === 204) {
        setState(prev => {
          return {...prev, appointments };
        });
        setSpots(prev => prev + 1);
      console.log("Updated spots after book are:", spots);
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
      setState(prev => {
        return {...prev, appointments };
      });
      setSpots(prev => prev - 1);
      console.log("Updated spots after cancel are:", spots);
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
      const spotInUse = days.reduce((acc, val) => acc + val.spots, 0);
      const emptySpots = 25 - spotInUse;
      console.log("emptyspots", emptySpots);
      setSpots(emptySpots);
      console.log("First render spots:", spots);
    })
  }, []);

  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}