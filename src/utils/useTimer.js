import { useEffect, useState } from "react";

export const useTimer = (startTime) => {
  const [time, setTime] = useState(startTime);
  const [intervalID, setIntervalID] = useState(null);
  const hasTimerEnded = time <= 0;
  const isTimerRunning = intervalID != null;

  const update = () => {
    setTime((time) => time - 1);
  };
  const startTimer = () => {
    if (!hasTimerEnded && !isTimerRunning) {
      setIntervalID(setInterval(update, 1000));
    }
  };
  const stopTimer = () => {
    clearInterval(intervalID);
    setIntervalID(null);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(startTime);
    startTimer();
  };

  useEffect(() => {
    if (hasTimerEnded) {
      clearInterval(intervalID);
      setIntervalID(null);
    }
  }, [hasTimerEnded, intervalID]);

  useEffect(
    () => () => {
      clearInterval(intervalID);
    },
    [intervalID]
  );
  
  return {
    time,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
