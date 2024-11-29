import React, { useEffect, useState } from 'react';
import './css/timer.css';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval); // Stop the timer when time is up
          onTimeUp(); // Automatically submit the exam
          return 0; // Ensure the timer does not go negative
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup the interval when the component unmounts
  }, [onTimeUp]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return <div className="timePlease">Time Left: {formatTime(timeLeft)}</div>;
};

export default Timer;
