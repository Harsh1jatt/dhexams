// EditQuestionModal.js
import React, { useState } from 'react';
import './css/ViewQuestionsModal.css';

const EditQuestionModal = ({ show, question, onClose, onSave }) => {
  const [questionText, setQuestionText] = useState(question?.text || '');

  if (!show) return null;

  const handleSave = () => {
    const updatedQuestion = { ...question, text: questionText };
    onSave(updatedQuestion);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Question</h2>
        <button className="close-btn" onClick={onClose}>Close</button>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditQuestionModal;
