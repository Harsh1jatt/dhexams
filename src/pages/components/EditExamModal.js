// EditExamModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ExamPage.css';

const EditExamModal = ({ show, exam, onClose, onSave }) => {
  const [examName, setExamName] = useState('');
  const [examDescription, setExamDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [maxMarks, setMaxMarks] = useState('');
  const [passMarks, setPassMarks] = useState('');

  useEffect(() => {
    if (exam) {
      setExamName(exam.examName || '');
      setExamDescription(exam.examDescription || '');
      setDuration(exam.duration || '');
    }
  }, [exam]);

  const handleSaveClick = async () => {
    const updatedExam = {
      examName,
      examDescription,
      duration,
    };

    try {
      // Sending updated exam data to the backend
      const response = await axios.post(
        `https://examforinstitutes.onrender.com/institute/${exam._id}/edit-exam`,
        updatedExam
      );
      onSave(response.data.exam);
    } catch (error) {
      console.error("Error updating exam:", error);
    }

    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-2">
        <h2>Edit Exam</h2>
        <form>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="Exam Name"
          />
          <input
            type="text"
            value={examDescription}
            onChange={(e) => setExamDescription(e.target.value)}
            placeholder="Exam Description"
          />
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (mins)"
          />
          <div className="btns">
            <button type="button" onClick={handleSaveClick}>
              Save
            </button>
            <button type="button" className="danger" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExamModal;
