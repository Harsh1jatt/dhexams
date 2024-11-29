import React, { useState } from 'react';
import axios from 'axios';
import './css/CreateQuestion.css';

const CreateQuestion = ({ show, onClose, examId }) => {
  const initialQuestionState = {
    questionText: '',
    correctAnswer: '',
    subfield: '',
    options: ['', '', '', ''], // Assuming four options initially
  };

  const [createQuestion, setcreateQuestion] = useState(initialQuestionState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcreateQuestion((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    setcreateQuestion((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[index] = value;
      return { ...prevData, options: newOptions };
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `https://examforinstitutes.onrender.com/institute/${examId}/questions`,
        createQuestion
      );

      // Reset the form and close the modal
      setcreateQuestion(initialQuestionState);
      onClose();
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  if (!show) return null;

  return (
    <div className="create-question-modal-overlay">
      <div className="create-question-modal-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Add New Question</h2>

        <form className="create-question-form">
          <label>
            Question Text:
            <input
              type="text"
              name="questionText"
              value={createQuestion.questionText}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Subfield: <span>Example:- Computer Fundamental, MS Excel, MS Word, etc.</span>
            <input
              type="text"
              name="subfield"
              value={createQuestion.subfield}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Options:
            {createQuestion.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                required
              />
            ))}
          </label>

          <label>
            Correct Answer:
            <select
              name="correctAnswer"
              value={createQuestion.correctAnswer}
              onChange={handleChange}
              className="correct-answer-dropdown"
              required
            >
              <option value="" disabled>
                Select Correct Answer
              </option>
              {createQuestion.options.map((option, index) =>
                option ? (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ) : null
              )}
            </select>
          </label>

          <button
            type="button"
            onClick={handleSave}
            className="create-question-save-btn"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
