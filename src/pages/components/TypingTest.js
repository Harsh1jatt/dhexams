import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ExamQuestions.css';

const TypingTest = ({ examId, title, closeModal }) => {
  const [typingTest, setTypingTest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTest, setEditedTest] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  useEffect(() => {
    const fetchTypingTest = async () => {
      try {
        const response = await axios.get(`https://examforinstitutes.onrender.com/institute/${examId}/typing-test`);
        setTypingTest(response.data.typingTest); // Set the single object
        console.log(response.data.typingTest);
      } catch (error) {
        console.error("Error fetching typing test:", error);
        setTypingTest(null);
      }
    };

    fetchTypingTest();
  }, [examId]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTest({ ...typingTest });
  };

  const editTypingTest = async (updatedTest) => {
    try {console.log(editedTest)

      await axios.post(`https://examforinstitutes.onrender.com/institute/${editedTest._id}/edit-typingtest`, updatedTest);
      setTypingTest(updatedTest);
      setIsEditing(false);
      setEditedTest(null);
    } catch (error) {
      console.error("Error updating typing test:", error);
    }
  };

  const handleSaveClick = () => {
    editTypingTest(editedTest);
  };

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.post(`https://examforinstitutes.onrender.com/institute/${examId}/delete-typing-test`);
      setTypingTest(null); // Clear the state after deletion
      setIsDeletePopupOpen(false);
    } catch (error) {
      console.error("Error deleting typing test:", error);
    }
  };

  return (
    <div className="typing-test-container">
      <h2>Typing Test Features for: {title}</h2>
      <div className="btns">
        <button className="back-btn" onClick={closeModal}>Close</button>
      </div>
      {typingTest ? (
        <div className="typing-test-card">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedTest.title}
                onChange={(e) => setEditedTest({ ...editedTest, title: e.target.value })}
                placeholder="Test Name"
              />
              <textarea
                value={editedTest.passage}
                onChange={(e) => setEditedTest({ ...editedTest, passage: e.target.value })}
                placeholder="Test Passage"
              />
              <input
                type="number"
                value={editedTest.duration}
                onChange={(e) => setEditedTest({ ...editedTest, duration: e.target.value })}
                placeholder="Duration (in minutes)"
              />
              <div className="btns">
                <button onClick={handleSaveClick}>Save</button>
                <button className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </>
          ) : (
            <div className='typingtest'>
              <h3 className="test-name"><strong>Title:</strong> {typingTest.title}</h3>
              <p><strong>Passage:</strong> {typingTest.passage}</p>
              <p><strong>Duration:</strong> {typingTest.duration} minutes</p>
              <div className="btns">
                <button className="edit" onClick={handleEditClick}>Edit</button>
                <button className="delete" onClick={handleDeleteClick}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className='no-students'>No typing test available.</p>
      )}
      {isDeletePopupOpen && (
        <div className="delete-popup">
          <div className="delete-popup-content">
            <h3>Are you sure you want to delete this typing test?</h3>
            <button className="confirm-delete" onClick={confirmDelete}>Yes</button>
            <button className="cancel-delete" onClick={() => setIsDeletePopupOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
