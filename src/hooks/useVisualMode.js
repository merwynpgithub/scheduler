import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const transition = (next) => {
    setMode(next);
  }
  return { mode, transition };
};