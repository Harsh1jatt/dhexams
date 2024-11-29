import React, { useState, useEffect } from 'react';
import './css/Students.css';
import axios from 'axios';
import EditStudentModal from './EditStudentModal';
import CreateStudent from './CreateStudent';

const Students = ({ instituteId }) => {
  const [students, setStudents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`https://examforinstitutes.onrender.com/institute/${instituteId}/students`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [instituteId]);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleSave = async (updatedStudent) => {
    try {
      const response = await axios.post(`https://examforinstitutes.onrender.com/institute/${updatedStudent._id}/edit-student`, {
        name: updatedStudent.name,
        rollNumber: updatedStudent.rollNo,
        dateOfBirth: updatedStudent.dob,
      });
      const updatedStudents = students.map((s) =>
        s._id === updatedStudent._id ? response.data.student : s
      );
      setStudents(updatedStudents);
      setShowEditModal(false);
      alert("Student details updated successfully");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student details.");
    }
  };

  const handleDeleteClick = async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        await axios.post(`https://examforinstitutes.onrender.com/institute/${studentId}/delete-student`);
        setStudents((prevStudents) => prevStudents.filter((s) => s._id !== studentId));
        alert("Student deleted successfully.");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  const handleAddStudent = async (newStudent) => {
    try {
      const response = await axios.post(`https://examforinstitutes.onrender.com/institute/${instituteId}/student/`, newStudent);
      setStudents((prevStudents) => [...prevStudents, response.data.student]);
      setShowCreateModal(false);
      alert("Student added successfully");
    } catch (error) {
      console.error("Error adding student:", error);
      // alert("Failed to add student.");
    }
  };

  return (
    <div id="students">
      <h1>
        <p>Students</p>
        <button className="btn" onClick={() => setShowCreateModal(true)}>
          Add Student
        </button>
      </h1>
      <div className="studentsContainer">
        <div className="student-card">
          <div className="student-card-content">
            <div className="student-header">
              <h2 className="student-title">Students Info</h2>
            </div>
            <div className="table-container">
              {students.length === 0 ? (
                <p className="no-students">No Students are Registered</p>
              ) : (
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Roll Number</th>
                      <th>Password</th>
                      <th>Date of Birth</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0, visibleCount).map((student, index) => (
                      <tr key={student._id}>
                        <td>{index + 1}</td>
                        <td className="image-cell">
                          <img src={student.profileImage} alt="Student" className="student-image" />
                        </td>
                        <td>{student.studentName}</td>
                        <td>{student.rollNumber}</td>
                        <td>{student.secCode}</td>
                        <td>{new Date(student.dateOfBirth).toLocaleDateString('en-GB')}</td>

                        <td className="action-buttons">
                          <button className="edit-btn" onClick={() => handleEditClick(student)}>
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteClick(student._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {visibleCount < students.length && (
              <button onClick={handleViewMore} className="view-more-btn">
                View More
              </button>
            )}
          </div>
        </div>
      </div>
      {showEditModal && (
        <EditStudentModal
          show={showEditModal}
          student={selectedStudent}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
      {showCreateModal && (
        <CreateStudent
          instituteId={instituteId}
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={handleAddStudent}
        />
      )}
    </div>
  );
};

export default Students;
