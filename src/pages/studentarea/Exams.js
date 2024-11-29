import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './css/Exams.css';
import { ProfileContext } from '../../contexts/ProfileContext';

const Exams = () => {
  const { examInfo, setExamInfo } = useContext(ProfileContext); // Access setExamInfo from context
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      const studentData = localStorage.getItem('student');

      if (!studentData) {
        alert('Session expired. Please log in again.');
        window.location.href = '/'; // Redirect to login
        return;
      }

      const { institute } = JSON.parse(studentData);

      try {
        const response = await axios.get(
          `https://examforinstitutes.onrender.com/institute/${institute}/exams`
        );
        setExams(response.data);
      } catch (err) {
        console.error('Error fetching exams:', err);
        setError('Failed to fetch exams. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleStartExam = (examId) => {
    const selectedExam = exams.find((exam) => exam._id === examId);
  
    if (selectedExam) {
      const typingTestValue = selectedExam.typingTest && selectedExam.typingTest !== '' ? true : false;
      setExamInfo(typingTestValue);
  
      // Store examInfo in localStorage
      localStorage.setItem('examInfo', JSON.stringify(typingTestValue));
      localStorage.setItem('examId', selectedExam._id);
      localStorage.setItem('examDuration', selectedExam.duration);
      // console.log(selectedExam._id)
      setTimeout(() => {
        window.location.href = '/rules';
      }, 500);
    }
  };
  
  

  if (loading) {
    return (<div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>);
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="SelectExam" id="select-exam-section">
      <div className="exam-options">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div key={exam._id} className="exam-card">
              <h2>{exam.examName}</h2>
              <p>{exam.examDescription}</p>
              <button
                className="btn-select"
                onClick={() => handleStartExam(exam._id)}
              >
                Start {exam.title} Exam
              </button>
            </div>
          ))
        ) : (
          <div className="no-exams">No exams available for this institute.</div>
        )}
      </div>
    </div>
  );
};

export default Exams;
