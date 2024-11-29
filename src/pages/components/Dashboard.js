import React, { useEffect, useState } from 'react';
import { PiStudentBold, PiExamBold } from "react-icons/pi";
import './css/Dashboard.css';
import sdeoc from './assets/sdeoc.png';
import Students from './Students';
import Exam from './Exams';
import axios from 'axios';

const Dashboard = () => {
  const [instituteId, setInstituteId] = useState(null);
  const [studentCount, setStudentCount] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Error handling state

  useEffect(() => {
    // Fetch the institute data and set the necessary states
    const fetchInstituteData = async () => {
      try {
        setLoading(true); // Start loading before the request
        const response = await axios.get('https://examforinstitutes.onrender.com/institute/my-institute', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }) // Replace with actual endpoint
        const institute = response.data;
        setInstituteId(institute._id); // Set instituteId
        setStudentCount(institute.students.length); // Assuming students are part of the institute data
        setExamCount(institute.exams.length); // Assuming exams are part of the institute data
      } catch (error) {
        setError("Failed to load institute data"); // Set error if something goes wrong
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    fetchInstituteData();
  }, []);

  // Show loading or error message while fetching data
  if (loading) {
    return (<div className="loading-container">
    <div className="spinner"></div>
    <div className="loading-text">Loading...</div>
  </div>);
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboardPage">
      <div id="dashboard">
        <div className="left">
          <h1>Check And Manage Your Students And Exams</h1>
          <p>Manage your students and exams effortlessly with our user-friendly platform. Create or delete exams and register students for exams.</p>
          <div className="cose">
            <div className="exams">
              <div className="icon">
                <PiExamBold fontSize={50} />
              </div>
              <div className="data">
                <p id="headtext">Total Exams</p>
                <p id="examCount">{examCount}</p>
              </div>
            </div>
            <div className="student">
              <div className="icon">
                <PiStudentBold fontSize={50} />
              </div>
              <div className="data">
                <p id="headtext2">Total Students</p>
                <p id="studentCount">{studentCount}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <img src={sdeoc} alt="Image" />
        </div>
      </div>
      {instituteId && <Students instituteId={instituteId} />} {/* Ensure Students component is rendered once instituteId is fetched */}
      <Exam instituteId={instituteId} />
    </div>
  );
};

export default Dashboard;
