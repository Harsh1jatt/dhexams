import React, { useState, useEffect } from 'react';
import './css/Students.css';
import axios from 'axios';

const ViewResult = ({ instituteId, examId }) => {
    const [students, setStudents] = useState([]);
    const [examName, setExamName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`https://examforinstitutes.onrender.com/institute/${examId}/results`);
                const { examName, results } = response.data;

                setExamName(examName); // Save exam name
                setStudents(results); // Save students' results
            } catch (err) {
                console.error("Error fetching results:", err);
                setError("Failed to load results. Please try again later.");
            }
        };

        fetchResults();
    }, [examId]);

    return (
        <div id="students">
            <h1>
                <p>Results for {examName || 'Exam'}</p>
            </h1>
            <div className="studentsContainer">
                <div className="student-card">
                    <div className="student-card-content">
                        <div className="student-header">
                            <h2 className="student-title">Students Result</h2>
                        </div>
                        <div className="table-container">
                            {error ? (
                                <p className="error-message">{error}</p>
                            ) : students.length === 0 ? (
                                <p className="no-students">No Results are Available</p>
                            ) : (
                                <table className="student-table">
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Roll Number</th>
                                            <th>Result</th>
                                            <th>Marks</th>
                                            {/* Conditionally render WPM header */}
                                            {students.some(student => student.wpm !== undefined) && <th>WPM</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => (
                                            <tr key={student._id}>
                                                <td>{index + 1}</td>
                                                <td className="image-cell">
                                                    <img
                                                        src={student.profileImage}
                                                        alt="Student"
                                                        className="student-image"
                                                    />
                                                </td>
                                                <td>{student.studentName}</td>
                                                <td>{student.RollNumber}</td>
                                                <td>{student.pass ? 'Pass' : 'Fail'}</td>
                                                <td>{student.marks}</td>
                                                {/* Conditionally render WPM field */}
                                                {student.wpm !== undefined && <td>{student.wpm}</td>}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewResult;
