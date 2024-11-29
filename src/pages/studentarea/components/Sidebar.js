import React from 'react';
import './css/Sidebar.css';

const Sidebar = ({ questions, userAnswers, onQuestionClick, onSubmitExam }) => {
  return (
    <aside className="Ssidebar">
      <div className="question-status">
        <p><span className="status answered"></span> Answered</p>
        <p><span className="status not-answered"></span> Not Answered</p>
        <p><span className="status not-visited"></span> Not Visited</p>
      </div>
      <div className="question-navigation">
        {questions.map((question, index) => {
          // Determine the status class for each question
          const questionId = question._id; // Assuming `question._id` uniquely identifies each question
          const statusClass = userAnswers[questionId]
            ? 'answered'
            : 'not-answered';

          return (
            <div
              key={questionId}
              className={`question-number status ${statusClass}`}
              onClick={() => onQuestionClick(index)} // Navigate to the question on click
            >
              {index + 1}
            </div>
          );
        })}
      </div>  
      <button className="btn-submit" id="SubmitButton" onClick={onSubmitExam}>
        Submit
      </button>
    </aside>
  );
};

export default Sidebar;
