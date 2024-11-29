import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ExamQuestions.css';

const ExamQuestions = ({ examId, exam, closeModal }) => {
  const [questions, setQuestions] = useState([]);
  const [typing, setTyping] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);
  const [isDeleteAllPopupOpen, setIsDeleteAllPopupOpen] = useState(false); // New state for Delete All popup

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://examforinstitutes.onrender.com/institute/${examId}/questions`);
        setQuestions(response.data || []);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      }
    };

    fetchQuestions();
  }, [examId]);

  const handleEditClick = (question) => {
    setIsEditing(question._id);
    setEditedQuestion({ ...question });
  };

  const editQuestion = async (questionId, updatedQuestion) => {
    try {
      await axios.post(`https://examforinstitutes.onrender.com/institute/${questionId}/edit-question`, updatedQuestion);
      setQuestions(questions.map(q => (q._id === questionId ? updatedQuestion : q)));
      setIsEditing(null);
      setEditedQuestion(null);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleSaveClick = (questionId) => {
    editQuestion(questionId, editedQuestion);
  };

  const handleDeleteClick = (questionId) => {
    setDeleteQuestionId(questionId);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.post(`https://examforinstitutes.onrender.com/institute/${deleteQuestionId}/delete-question`);
      setQuestions(questions.filter(q => q._id !== deleteQuestionId));
      setIsDeletePopupOpen(false);
      setDeleteQuestionId(null);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleDeleteAllClick = () => {
    setIsDeleteAllPopupOpen(true);
  };

  const confirmDeleteAll = async () => {
    try {
      await axios.post(`https://examforinstitutes.onrender.com/institute/${examId}/delete-all-questions`);
      setQuestions([]); // Clear questions from the state after deletion
      setIsDeleteAllPopupOpen(false);
    } catch (error) {
      console.error("Error deleting all questions:", error);
    }
  };

  return (
    <div className="exam-questions-container">
      <h2>Exam Questions for Exam: {exam}</h2>
      <div className="btns mb">
        <button className="back-btn" onClick={closeModal}>Close</button>
        <button className="delete-all-btn" onClick={handleDeleteAllClick}>Delete All Questions</button>
      </div>
      <div className="questions-list">
        {questions.length === 0 ? (
          <p className="text-center">No Questions</p>
        ) : (
          questions.map((q) => (
            <div key={q._id} className="question-card">
              {isEditing === q._id ? (
                <>
                  <input
                    type="text"
                    value={editedQuestion.questionText}
                    onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
                    placeholder="Question Text"
                  />
                  <input
                    type="text"
                    value={editedQuestion.subfield}
                    onChange={(e) => setEditedQuestion({ ...editedQuestion, type: e.target.value })}
                    placeholder="Question Type"
                  />
                  <ul className="options-list">
                    {editedQuestion.options.map((option, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const updatedOptions = [...editedQuestion.options];
                            updatedOptions[index] = e.target.value;
                            setEditedQuestion({ ...editedQuestion, options: updatedOptions });
                          }}
                          placeholder={`Option ${index + 1}`}
                        />
                      </li>
                    ))}
                  </ul>
                  <label>
                    <strong>Answer:</strong>
                    <select
                      value={editedQuestion.answer}
                      onChange={(e) => setEditedQuestion({ ...editedQuestion, answer: e.target.value })}
                    >
                      {editedQuestion.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="btns">
                    <button onClick={() => handleSaveClick(q._id)}>Save</button>
                    <button className="cancel" onClick={() => setIsEditing(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="question-text">{q.questionText}</h3>
                  <p><strong>Type:</strong> {q.subfield}</p>
                  <ul className="options-list">
                    {q.options.map((option, index) => (
                      <li key={index} className="option-item">{option}</li>
                    ))}
                  </ul>
                  <p className="correct-answer"><strong>Answer:</strong> {q.correctAnswer}</p>
                  <div className="btns">
                    <button className="edit" onClick={() => handleEditClick(q)}>Edit</button>
                    <button className="delete" onClick={() => handleDeleteClick(q._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
      {isDeletePopupOpen && (
        <div className="delete-popup">
          <div className="delete-popup-content">
            <h3>Are you sure you want to delete this question?</h3>
            <button className="confirm-delete" onClick={confirmDelete}>Yes</button>
            <button className="cancel-delete" onClick={() => setIsDeletePopupOpen(false)}>No</button>
          </div>
        </div>
      )}
      {isDeleteAllPopupOpen && (
        <div className="delete-popup">
          <div className="delete-popup-content">
            <h3>Are you sure you want to delete all questions?</h3>
            <button className="confirm-delete" onClick={confirmDeleteAll}>Yes</button>
            <button className="cancel-delete" onClick={() => setIsDeleteAllPopupOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamQuestions;
