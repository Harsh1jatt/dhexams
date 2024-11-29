import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header2 from './components/Header2'

const InstituteLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')  // Reset error message before each attempt

    try {
      const response = await axios.post('https://examforinstitutes.onrender.com/owner/login', {
        email,
        password,
      })

      // Check if login was successful
      if (response.status === 200) {
        // Save token to localStorage
        localStorage.setItem('token', response.data.token)
        // Navigate to dashboard
        navigate('/dashboard')
      }
    } catch (error) {
      // Handle error and display message
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Invalid email or password')
      } else {
        setErrorMessage('Something went wrong. Please try again later.')
      }
    }
  }

  return (
    <div className='w-full h-screen login-container'>
      <Header2 login={'Institute'}/>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
          <button type="submit" className="btn-login">Login</button>
        </form>
        {errorMessage && <div className="error-popup">{errorMessage}</div>}
      </div>
    </div>
  )
}

export default InstituteLogin
