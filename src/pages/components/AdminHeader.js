import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './css/Admin.css';
import './css/AdminHeader.css';
import { IoLogOutOutline } from "react-icons/io5";
import { MdHelp } from "react-icons/md";
import axios from 'axios';  // Import axios for API calls

const AdminHeader = () => {
  const navigate = useNavigate();  // Initialize useNavigate
  const [ownerName, setOwnerName] = useState('');  // State to store owner name
  const [logo, setLogo] = useState('');  // State to store owner name

  // Function to handle logout
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Navigate to the login page
    navigate('/');
  };

  // Fetch the InstituteOwner name from the backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://examforinstitutes.onrender.com/institute/my-institute', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        const owner = response.data.ownerName;  // Assuming 'ownerName' exists in the response data
        const logo = response.data.logo;
        setLogo(logo)
        setOwnerName(owner || 'Institute Owner');
      })
      .catch(error => {
        console.error('Error fetching institute data:', error);
      });
    }
  }, []); // Empty array ensures this runs only once on mount

  const Greeting = () => {
    const hour = new Date().getHours();
    const greeting =
      hour < 5 ? 'Good Night' :
        hour < 12 ? 'Good Morning' :
          hour < 17 ? 'Good Afternoon' :
            hour < 21 ? 'Good Evening' :
              'Good Night';

    return <b>{greeting}, {ownerName}</b>;  // Display the dynamically fetched owner name
  };
  const getFormattedDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    return today.toLocaleDateString('en-GB', options).replace(',', '').replace(' ', '-');
  };
  
  return (
    <header id="header" className="header">
      <div className="greeting">
        <b>{Greeting()}</b>
        <b className="date">{getFormattedDate()}</b>
      </div>
      <div className="adminaction">
        <div className="instituteLogo">
          <img src={logo} alt="Institute Logo" />
        </div>
        <div className="logout" onClick={handleLogout}><IoLogOutOutline /></div>
      </div>
    </header>
  );
}

export default AdminHeader;
