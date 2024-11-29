import React, { useState, useEffect, useRef } from "react";
import "./css/TypingExam.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TypingExam = () => {
  const [timeLeft, setTimeLeft] = useState(null); // Default time in seconds (3 minutes)
  const [duration, setDuration] = useState(null); // Default time in seconds (3 minutes)
  const [wpm, setWpm] = useState(0); // Words per minute
  const [inputText, setInputText] = useState(""); // User input
  const [correctText, setCorrectText] = useState(""); // Text to be typed
  const [examFinished, setExamFinished] = useState(false); // Exam finished flag
  const [highlightedText, setHighlightedText] = useState(""); // Highlighted text
  const intervalRef = useRef(null); // Interval reference for countdown timer
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTypingTest = async () => {
      try {
        const examId = localStorage.getItem("examId"); // Get examId from localStorage
        if (!examId) {
          alert("Exam ID not found in localStorage!");
          return;
        }

        // Fetch typing test data
        const response = await axios.get(
          `https://examforinstitutes.onrender.com/institute/${examId}/typing-test`
        );

        const { passage, duration } = response.data.typingTest; // Destructure passage and duration

        if (passage && duration) {
          setCorrectText(passage); // Set the passage text for typing test
          setTimeLeft(duration * 60); // Set the duration for the typing test (in seconds)
          setDuration(duration * 60); // Set the duration for the typing test (in seconds)
          setHighlightedText(highlightCorrectWords("")); // Initialize highlighted text
        } else {
          alert("Typing test data is invalid or missing.");
        }
      } catch (error) {
        alert(`Failed to fetch typing test: ${error.response?.data || error.message}`);
      }
    };

    fetchTypingTest();
  }, []); // Empty dependency array to run once when the component is mounted

  useEffect(() => {
    // Initialize highlightedText whenever inputText changes
    setHighlightedText(highlightCorrectWords(inputText));

    // Start the countdown timer only if timeLeft is greater than 0 and exam is not finished
    if (timeLeft > 0 && !examFinished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 || examFinished) {
      // If time is up or the exam is finished, clear the interval
      clearInterval(intervalRef.current);
      setExamFinished(true); // Ensure the exam is marked as finished
    }

    // Cleanup the interval when the component unmounts or when the exam is finished
    return () => clearInterval(intervalRef.current);
  }, [timeLeft, examFinished]); // Runs when timeLeft or examFinished changes

  // Update highlighted text whenever inputText changes
  useEffect(() => {
    setHighlightedText(highlightCorrectWords(inputText));
  }, [inputText]);

  // Handle text input
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    calculateWpm(e.target.value);
  };

  // Calculate WPM based on input
  const calculateWpm = (typedText) => {
    // Split text by spaces and count the words
    const wordsTyped = typedText.trim().split(/\s+/).length;

    // Calculate minutes elapsed based on initial time and time left
    const minutesElapsed = (duration - timeLeft) / 60;

    // Ensure that we don't divide by zero if the user hasn't started typing yet
    const calculatedWpm = minutesElapsed > 0 ? Math.round(wordsTyped / minutesElapsed) : 0;

    setWpm(calculatedWpm);
  };

  // Highlight correct, incorrect, and not typed characters
  const highlightCorrectWords = (typedText) => {
    const typedChars = typedText.split("");
    const correctChars = correctText.split("");

    return correctChars
      .map((char, index) => {
        if (index < typedChars.length) {
          // Only highlight characters that have been typed
          if (typedChars[index] === char) {
            // Correct character
            return `<span class="correct">${char}</span>`;
          } else {
            // Incorrect character, but don't stop typing
            return `<span class="incorrect">${char}</span>`;
          }
        } else {
          // For characters that haven't been typed yet
          return `<span class="not-typed">${char}</span>`;
        }
      })
      .join("");
  };

  // Check if the user has completed the typing
  const isExamCompleted = inputText.length >= correctText.length || timeLeft === 0;
  return (
    <div className="typing">
      <div className="wrapper">
        <div className="content-box">
          <div className="typing-text">
            {/* Render the highlighted text */}
            <p dangerouslySetInnerHTML={{ __html: highlightedText }} />
          </div>
          <div className="content">
            <ul className="result-details">
              <li className="time">
                <p>Time Left:</p>
                <span>
                  <>{Math.floor(timeLeft / 60).toString().padStart(2, "0")}</>:
                  <>{(timeLeft % 60).toString().padStart(2, "0")}</> <b>min</b>
                </span>
              </li>
              <li className="wpm">
                <p>WPM:</p>
                <span>{wpm}</span>
              </li>
            </ul>
            {/* Conditionally render the Finish Exam button */}
            {isExamCompleted && (
              <button className="showExam" onClick={() => { 
                localStorage.setItem('wpm', wpm);
                 navigate("/exam") }}>
                Finish
              </button>
            )}
          </div>
        </div>
        <textarea
          name="input-field"
          placeholder="Click here to type..."
          className="input-field"
          value={inputText}
          onChange={handleInputChange}
          disabled={isExamCompleted} // Disable input when exam is finished
        ></textarea>
      </div>
    </div>
  );
};

export default TypingExam;
