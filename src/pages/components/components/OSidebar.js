import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/OSidebar.css';

const OSidebar = ({ currentTab, setCurrentTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/owner-login'); // Redirect using React Router
  };

  return (
    <div className="sidebar">
      <h2>Owner Panel</h2>
      <ul>
        <li
          className={currentTab === 'ODashboard' ? 'active' : ''}
          onClick={() => setCurrentTab('ODashboard')}
        >
          Dashboard
        </li>
        <li
          className={currentTab === 'Institutes' ? 'active' : ''}
          onClick={() => setCurrentTab('Institutes')}
        >
          Institutes
        </li>
      </ul>
      <button className="close-btnadmin" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default OSidebar;
