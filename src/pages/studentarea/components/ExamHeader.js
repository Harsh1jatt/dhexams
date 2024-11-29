import React from 'react';
import './css/ExamHeader.css';

const ExamHeader = ({ logo, studentImage,shortName,instituteName, StudentName, RollNumber }) => {
  return (
    <header>
      <div className="header-left">
        <div className="profileImage">
          <img height="60" src={logo || 'https://via.placeholder.com/60'} alt="Institute Logo" />
        </div>
        <div className="Titles">
          <h2 className="title">{instituteName}</h2>
          <p className="title">Welcome to the exam portal</p>
        </div>
      </div>
      <div className="header-right">
        <div className="user-info">
          <img
            className="profileimage"
            id="userImg"
            src={studentImage}
            alt="User Profile"
          />
          <div className="details">
            <span>
              Name: <p className="userName" id="userName">{StudentName}</p>
            </span>
            <span>
              RollNo: <p className="rollNumber" id="rollNumber">{RollNumber}</p>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExamHeader;
