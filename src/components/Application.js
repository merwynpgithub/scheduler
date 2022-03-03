import React, { useState, useEffect } from "react";
import Appointment from "./Appointment";
import DayList from "./DayList";
import "components/Application.scss";
import axios from "axios";

import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const setDay = day => setState(prev => ({ ...prev, day }));
  
  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments")
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      setState(prev => ({ ...prev, days, appointments }));
    })
  }, []);

  const appointmentList = dailyAppointments.map(appointment => {
    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
