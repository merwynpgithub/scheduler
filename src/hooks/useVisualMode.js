import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (next, replace = false) => {
    if (!replace) {
      setHistory(prev => {
        const prevChange = prev;
        prevChange.push(next);
        setHistory(prevChange);
      });
    }
    setMode(next);
  }

  const back = () => {
    setHistory(prev => {
      const newChange = prev;
      if (newChange.length >= 2) newChange.pop();
      setHistory(newChange);
    })
    if (history.length >= 2) {
      setMode(history[history.length - 2]);
    } else {
      setMode(history[0]);
    }
  };

  return { mode, transition, back };
};