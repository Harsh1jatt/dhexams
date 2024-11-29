import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../../contexts/ProfileContext';
import axios from 'axios'
import './css/Sprofile.css';

const Sprofile = () => {
  const { profile, institute } = useContext(ProfileContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('studentToken');
    try {
      await axios.post(
        'https://examforinstitutes.onrender.com/student/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem('studentToken');
      localStorage.removeItem('student');
      alert('Logout successful!');
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
      alert('Failed to log out. Please try again.');
    }
  };

  if (!profile || !institute) {
    return (<div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-text">Loading Profile....</div>
    </div>);
  }

  return (
    <div className="Sprofile">
      <div className="SProfileImage">
        <img src={profile.profileImage || 'https://via.placeholder.com/150'} alt="Profile" />
      </div>
      <div className="Sdetails">
        <div className="StudentName">
          Student Name: <span>{profile.studentName}</span>
        </div>
        <div className="Institute">
          Institute: <span>{institute.instituteName}</span>
        </div>
        <div className="RollNumber">
          Roll Number: <span>{profile.rollNumber}</span>
        </div>
        <div className="DOB">
          Date Of Birth: <span>{profile.dateOfBirth}</span>
        </div>
        <div className="Sbtns">
          <button className="Ssave-btn" onClick={() => navigate('/exams')}>
            Do Exam
          </button>
          <button className="Slogout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sprofile;
