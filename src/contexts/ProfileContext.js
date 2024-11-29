// src/context/ProfileContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [institute, setInstitute] = useState(null);
  const [examInfo, setExamInfo] = useState(null);
  const [typingSpeed, setTypingSpeed] = useState(null);
  const [obtainedMarks, setObtainedMarks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('studentToken');

      if (!token) {
        alert('Session expired. Please log in again.');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(
          'https://examforinstitutes.onrender.com/student/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(response.data.student);
        setInstitute(response.data.institute);
      } catch (err) {
        console.error('Error fetching profile:', err);
        alert('Failed to fetch profile. Please log in again.');
        navigate('/');
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <ProfileContext.Provider value={{ profile, institute, examInfo, setExamInfo, typingSpeed, setTypingSpeed, obtainedMarks, setObtainedMarks }}>
      {children}
    </ProfileContext.Provider>
  );
};
