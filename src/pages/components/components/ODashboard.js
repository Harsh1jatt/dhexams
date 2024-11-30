import React, { useState } from 'react';
import axios from 'axios';
import './css/ODashboard.css';

const ODashboard = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    password: '',
    email: '',
    phone: '',
    uniqueId: '',
    instituteName: '',
    shortName: '',
    iso: null,
    logo: null,
  });
  const [previewIso, setPreviewIso] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, [name]: file }));
      if (name === 'iso') setPreviewIso(URL.createObjectURL(file));
      if (name === 'logo') setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleCreateInstitute = async () => {
    const instituteFormData = new FormData();
    instituteFormData.append('ownerName', formData.ownerName);
    instituteFormData.append('password', formData.password);
    instituteFormData.append('email', formData.email);
    instituteFormData.append('phone', formData.phone);
    instituteFormData.append('uniqueId', formData.uniqueId);
    instituteFormData.append('instituteName', formData.instituteName);
    instituteFormData.append('shortName', formData.shortName);
    if (formData.iso) instituteFormData.append('iso', formData.iso);
    if (formData.logo) instituteFormData.append('logo', formData.logo);

    try {
      const response = await axios.post(
        'https://examforinstitutes.onrender.com/owner/create-institute',
        instituteFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage(response.data.message || 'Institute created successfully.');
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          'Failed to create institute. Please try again.'
      );
    }
  };

  return (
    <div className="odashboard-container">
      <h1>Welcome to the Owner Dashboard</h1>
      <p>Manage your institutes and their details here.</p>

      <div className="create-institute-form">
        <h2>Create New Institute</h2>
        <form>
          <label>
            Owner Name:
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Unique ID:
            <input
              type="text"
              name="uniqueId"
              value={formData.uniqueId}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Institute Name:
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Short Name:
            <input
              type="text"
              name="shortName"
              value={formData.shortName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            ISO Certificate:
            <input type="file" name="iso" accept="image/*" onChange={handleFileChange} />
            {previewIso && <img src={previewIso} alt="ISO Preview" className="preview-image" />}
          </label>

          <label>
            Logo:
            <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
            {previewLogo && <img src={previewLogo} alt="Logo Preview" className="preview-image" />}
          </label>

          <button type="button" onClick={handleCreateInstitute} className="create-btn">
            Create Institute
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ODashboard;
