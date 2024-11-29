import React, { useState } from 'react';
import '../components/components/css/Institutes.css';
import ODashboard from './components/ODashboard.js';
import Institutes from './components/Institutes.js';
import OSidebar from './components/OSidebar.js';

const OwnerDashboard = () => {
  const [currentTab, setCurrentTab] = useState('Dashboard');

  const renderContent = () => {
    switch (currentTab) {
      case 'ODashboard':
        return <ODashboard />;
      case 'Institutes':
        return <Institutes />;
      default:
        return <ODashboard />;
    }
  };

  return (
    <div className="dashboard-container">
      <OSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default OwnerDashboard;
