import React, { useState, useEffect } from 'react';
import './css/ExamPage.css';
import EditExamModal from './EditExamModal';
import ExamQuestions from './ExamQuestions';
import CreateExam from './CreateExam';
import AddTypingTest from './AddTypingTest';
import TypingTest from './TypingTest';
import CreateQuestion from './CreateQuestion';
import ViewResult from './ViewResult';
import axios from 'axios';

const Exam = ({ instituteId }) => {
  const [exams, setExams] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // Manage all modals dynamically
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [editingExam, setEditingExam] = useState(null); // For editing an exam
  const [selectedTypingTest, setSelectedTypingTest] = useState(null); // For typing test data

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`https://examforinstitutes.onrender.com/institute/${instituteId}/exams`);
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
    fetchExams();
  }, [instituteId]);

  const openModal = (modalType, examId = null) => {
    setActiveModal(modalType);
    if (examId) setSelectedExamId(examId);
  };


  const closeModal = () => {
    setActiveModal(null);
    setSelectedExamId(null);
    setSelectedTypingTest(null);
  };

  const handleSaveEditedExam = (updatedExam) => {
    setExams(exams.map((exam) => (exam._id === updatedExam._id ? updatedExam : exam)));
    closeModal();
  };

  const handleSaveNewExam = (newExam) => {
    setExams([...exams, { ...newExam, srNo: exams.length + 1 }]);
    closeModal();
  };

  const confirmDelete = async (examId) => {
    try {
      await axios.post(`https://examforinstitutes.onrender.com/institute/${examId}/delete-exam`);
      setExams(exams.filter((exam) => exam._id !== examId));
      closeModal();
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  return (
    <div id="exams">
      <h1>
        <p>Exams</p>
        <button className="btn" onClick={() => openModal('createExam')}>Create Exam</button>
      </h1>
      <div className="examsContainer">
        <table className="exam-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Exam Name</th>
              <th>Description</th>
              <th>Duration (mins)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={exam._id}>
                <td>{index + 1}</td>
                <td>{exam.examName}</td>
                <td>{exam.examDescription.length > 50 ? `${exam.examDescription.slice(0, 50)}...` : exam.examDescription}</td>
                <td>{exam.duration}</td>
                <td>
                  <button className="view-btn" onClick={() => openModal('viewQuestions', exam._id)}>View Questions</button>
                  <button className="view-btn" onClick={() => openModal('viewTyping', exam._id)}>View Typing Para</button>
                  <button className="edit-btn" onClick={() => openModal('editExam', exam._id)}>Edit</button>
                  <button className="delete-btn" onClick={() => openModal('deleteExam', exam._id)}>Delete</button>
                  <button className="edit-btn" onClick={() => openModal('addQuestion', exam._id)}>Add Questions</button>
                  <button className="edit-btn" onClick={() => openModal('addTyping', exam._id)}>Add Typing Test</button>
                  <button className="view-btn" onClick={() => openModal('viewResult', exam._id)}>View Result</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Dynamic Modal Rendering */}
      {activeModal === 'viewQuestions' && (
        <div className="modal1">
          <div className="modal-content1">
            <button className="close-btn" onClick={closeModal}>X</button>
            <ExamQuestions examId={selectedExamId} closeModal={closeModal} />
          </div>
        </div>
      )}
      {activeModal === 'viewTyping' && (
        <div className="modal1">
          <div className="modal-content1">
            <button className="close-btn" onClick={closeModal}>X</button>
            <TypingTest examId={selectedExamId} closeModal={closeModal} />
          </div>
        </div>
      )}
      {activeModal === 'createExam' && (
        <CreateExam
          show
          onClose={closeModal}
          instituteId={instituteId}
          onSave={handleSaveNewExam}
        />
      )}
      {activeModal === 'editExam' && (
        <EditExamModal
          show
          exam={exams.find((exam) => exam._id === selectedExamId)}
          onClose={closeModal}
          onSave={handleSaveEditedExam}
        />
      )}

      {activeModal === 'addQuestion' && (
        <CreateQuestion
          show
          onClose={closeModal} // Closes the modal
          examId={selectedExamId} // Passes the selected exam ID
        />
      )}

      {activeModal === 'addTyping' && (
        <AddTypingTest
          show
          onClose={closeModal}
          examId={selectedExamId}
        />
      )}
      {activeModal === 'deleteExam' && (
        <div className="modal1">
          <div className="modal-content1">
            <p>Are you sure you want to delete this exam?</p>
            <button className="btn" onClick={() => confirmDelete(selectedExamId)}>Yes</button>
            <button className="btn" onClick={closeModal}>No</button>
          </div>
        </div>
      )}
      {activeModal === 'viewResult' && (
        <div className="modal1">
          <div className="modal-content1">
            <button className="close-btn" onClick={closeModal}>X</button>
            <ViewResult
              examId={selectedExamId} // Pass examId to ViewResult component
              onClose={closeModal}    // Allow closing the modal
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Exam;
