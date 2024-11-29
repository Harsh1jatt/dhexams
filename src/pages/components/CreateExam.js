import React, { useState } from 'react';
import axios from 'axios';
import './css/CreateExam.css';

const CreateExam = ({ show, onClose, onSave, instituteId }) => {
  const [examData, setExamData] = useState({
    examName: '',
    examDescription: '',
    duration: '',
  });

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://examforinstitutes.onrender.com/institute/${instituteId}/exam`,
        {
          examName: examData.examName,
          examDescription: examData.examDescription,
          duration: examData.duration,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      onSave(response.data); // Pass the newly created exam data to the parent component
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error('Error creating exam:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Create New Exam</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Exam Name:
            <input
              type="text"
              name="examName"
              value={examData.examName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Exam Description:
            <input
              type="text"
              name="examDescription"
              value={examData.examDescription}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Duration (in minutes):
            <input
              type="number"
              name="duration"
              value={examData.duration}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="save-btn">Save Exam</button>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
