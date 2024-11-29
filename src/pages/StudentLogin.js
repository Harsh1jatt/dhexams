import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header1 from './components/Header1';

const StudentLogin = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rollNumber || !password) {
      setError('Both Roll Number and Password are required');
      return;
    }

    try {
      const response = await axios.post(
        'https://examforinstitutes.onrender.com/student/login',
        {
          rollNumber,
          password,
        }
      );
      console.log(response.data)
      if (response.status === 200) {
        const { token, student } = response.data;

        if (!token) {
          setError('Token is missing. Please contact support.');
          return;
        }

        // Store the token and student details
        localStorage.setItem('studentToken', token);
        localStorage.setItem('student', JSON.stringify(student));

        // Redirect to profile page
        navigate('/profile');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'Login failed');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-full h-screen login-container">
      <Header1 />
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="rollNo">Roll Number</label>
            <input
              type="text"
              id="rollNo"
              name="rollNumber"
              placeholder="Enter your Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
