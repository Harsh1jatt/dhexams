import React from 'react';

const Sidebar = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li onClick={() => setCurrentTab('Dashboard')} className={currentTab === 'Dashboard' ? 'active' : ''}>Dashboard</li>
        <li onClick={() => setCurrentTab('Students')} className={currentTab === 'Students' ? 'active' : ''}>Students</li>
        <li onClick={() => setCurrentTab('Exams')} className={currentTab === 'Exams' ? 'active' : ''}>Exams</li>
        <li onClick={() => setCurrentTab('Settings')} className={currentTab === 'Settings' ? 'active' : ''}>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
