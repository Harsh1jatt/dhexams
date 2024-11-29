// ViewQuestionsModal.js
import React from 'react';
import './css/ViewQuestionsModal.css';

const ViewQuestionsModal = ({ show, exam, onClose }) => {
  if (!show || !exam) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{exam.title} - Questions</h2>
        <button className="close-btn" onClick={onClose}>Close</button>
        
        <div className="questions-list">
          {exam.questions.map((question) => (
            <div key={question.id} className="question-item">
              <h3>{question.text}</h3>
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              <p><strong>Answer:</strong> {question.answer}</p>
              <p><strong>Type:</strong> {question.type}</p>

              <div className="question-actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewQuestionsModal;
