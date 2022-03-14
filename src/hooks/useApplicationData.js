import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "BOOK_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {}
  });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY: {
        const day = action.day;
        return { ...state, day };
      }
      case SET_APPLICATION_DATA: {
        const days = action.days;
        const appointments = action.appointments;
        const interviewers = action.interviewers;
        return { ...state, days, appointments, interviewers };
      }
      case SET_INTERVIEW: {
        const days = action.days;
        const appointments = action.appointments;
        return { ...state, appointments, days };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

/**
 * @param {*} day 
 * @returns state object with day
 */
  const setDay = day => dispatch({ type: SET_DAY, day: day });

/**
 * book a new interview or edit an existing one
 * @param {*} id 
 * @param {*} interview object
 * @param {*} editInterview (boolean value default false if new booking)
 * @returns Promise axios which updates scheduler api
 */
  function bookInterview(id, interview, editInterview) {
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
          const dayCopy = [...state.days];
          if (!editInterview) {
            dayCopy[index].spots -= 1;
          }
          dispatch({ type: SET_INTERVIEW, appointments, days: dayCopy });
        }
      });
  }

  /**
   * cancel interview
   * @param {*} id 
   * @returns Promise axios which updates scheduler api
   */
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
        const dayCopy = [...state.days];
        dayCopy[index].spots += 1;
        dispatch({ type: SET_INTERVIEW, appointments, days: dayCopy });
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
      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
    })
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}