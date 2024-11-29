import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Exams from './components/Exams';
import ExamQuestions from './components/ExamQuestions';
import './components/css/Admin.css';
import AdminHeader from './components/AdminHeader';
import InstituteProfile from './components/InstituteProfile';

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState('Dashboard');
  const [instituteId, setInstituteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { examId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found. Please log in again.');
      setLoading(false);
      return;
    }

    axios
      .get('https://examforinstitutes.onrender.com/institute/my-institute', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;

        if (data && data._id) {
          setInstituteId(data._id); // Extract institute ID
          setLoading(false);
        } else {
          throw new Error('Invalid response data');
        }
      })
      .catch((error) => {
        console.error('Error fetching institute data:', error);
        setError('Failed to load institute data. Please try again.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'Dashboard':
        return <Dashboard instituteId={instituteId} />;
      case 'Students':
        return <Students instituteId={instituteId} />;
      case 'Exams':
        return <Exams instituteId={instituteId} />;
      case 'Settings':
        return <InstituteProfile />;
      default:
        return <Dashboard instituteId={instituteId} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="content-area">
        <AdminHeader />
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
