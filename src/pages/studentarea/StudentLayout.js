import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import ExamHeader from './components/ExamHeader';
import { ProfileContext } from '../../contexts/ProfileContext';

const StudentLayout = () => {
  const { profile, institute, setExamInfo } = useContext(ProfileContext);

  if (!profile || !institute) {
    return (<div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>);
  }

  return (
    <>
      <ExamHeader
        logo={institute.logo}
        studentImage={profile.profileImage}
        shortName={institute.shortName}
        instituteName={institute.instituteName}
        StudentName={profile.studentName}
        RollNumber={profile.rollNumber}
      />
      <main>
        <Outlet /> {/* Render child components */}
      </main>
    </>
  );
};

export default StudentLayout;
