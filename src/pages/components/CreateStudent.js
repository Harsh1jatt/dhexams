import React, { useState } from 'react';
import axios from 'axios';
import './css/CreateStudent.css';

const CreateStudent = ({ show, onClose, onSave, instituteId }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    rollNo: '',
    dateOfBirth: '',
    profileImage: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, profileImage: file })); // Use `profileImage` key here
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('rollNumber', formData.rollNo);
    formDataToSend.append('dateOfBirth', formData.dateOfBirth);
    if (formData.profileImage) {
      formDataToSend.append('image', formData.profileImage); // Match with backend key "image"
    }
    
    try {
      const response = await axios.post(
        `https://examforinstitutes.onrender.com/institute/${instituteId}/student`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Error registering student:', error);
    }
  };
  

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Add New Student</h2>
        
        <form className="form">
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          
          <label>
            Password:
            <div className="password-field">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword((prev) => !prev)}
                className="reveal-btn"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          
          <label>
            Roll No:
            <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
          </label>
          
          <label>
            Date of Birth:
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </label>
          
          <label>
            Profile Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && <img src={previewImage} alt="Preview" className="image-preview" />}
          </label>
          
          <button type="button" onClick={handleSave} className="save-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
