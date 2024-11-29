import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Result.css";

const ExamResult = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("examResult");
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      navigate("/"); // Redirect to home if no result is found
    }
  }, [navigate]);

  if (!result) {
    return null;
  }

  return (
    <div className="result-containerr">
      <div className="result-header">
        <img src={result.userImage} alt="User" id="userImage" />
        <div className="info">
          <h1 id="userName">{result.userName}</h1>
          <h3 id="rollNumber">Roll No: {result.rollNumber}</h3>
        </div>
      </div>

      <div className="score">
        Your Score: <b id="userScore">{result.userScore}</b>/{result.totalQuestions}
      </div>
      {result.wpm && (
        <div className="score">
          Your Typing Speed is: <b id="WPM">{result.wpm}</b> wpm
        </div>
      )}

      <div className="summary">
        <p>
          Congratulations, <b>{result.userName}</b>! You have successfully completed the exam.
        </p>
        <p>Check your results, and feel free to review your answers anytime.</p>
      </div>

      <button className="ok-button" onClick={() => navigate("/profile")}>
        OK
      </button>
    </div>
  );
};

export default ExamResult;
