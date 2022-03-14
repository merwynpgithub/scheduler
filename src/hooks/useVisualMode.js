import { useState } from 'react';

/**
 * useVisualMode updates visualMode state and history for scheduler UI
 * @param {*} initial 
 * @returns object with mode and history state, transition and back function
 */
export default function useVisualMode(initial) {
  //set up initial mode
  const [mode, setMode] = useState(initial);
  //maintain mode history in an array
  const [history, setHistory] = useState([initial]);

  /**
   * 
   * @param {*} next 
   * @param {*} replace
   * default replace = false, mode = ['EMPTY'], next = 'CREATE'
   * history = ['EMPTY', 'CREATE']
   * replace = true, mode = ['EMPTY', 'CREATE'], next = 'DELETING'
   * history = ['EMPTY', 'DELETING']
   */
  const transition = (next, replace = false) => {
    if (!replace) {
      setHistory(prev => {
        const prevChange = [...prev];
        prevChange.push(next);
        return prevChange;
      });
    } else {
      setHistory(prev => {
        const prevChange = [...prev];
        prevChange[prevChange.length - 1] = next;
        return prevChange;
      });
    }
    setMode(next);
  }

  /** 
   * back function updates mode value to previous state
   */
  const back = () => {
    setHistory(prev => {
      const newChange = [...prev];
      if (newChange.length >= 2) newChange.pop();
      return newChange;
    });
    if (history.length >= 2) {
      setMode(history[history.length - 2]);
    } else {
      setMode(history[0]);
    }
  };

  return { mode, transition, back, history };
};