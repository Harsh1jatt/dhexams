import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Institutes.css';

const Institutes = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5); // Show first 5 institutes initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [formData, setFormData] = useState({}); // For editing institute data

  useEffect(() => {
    const fetchInstitutes = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          'https://examforinstitutes.onrender.com/owner/institutes',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInstitutes(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching institutes:', err.response || err.message);
        setError(
          err.response?.data?.message || 'Failed to load institutes. Please try again.'
        );
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  const handleEditClick = (institute) => {
    setSelectedInstitute(institute);
    setFormData({
      ...institute,
      iso: null,
      logo: null,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstitute(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, [name]: file }));
    }
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    try {
      const updatedFormData = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          updatedFormData.append(key, formData[key]);
        }
      }

      const response = await axios.post(
        `https://examforinstitutes.onrender.com/owner/${selectedInstitute._id}/edit`,
        updatedFormData,
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(response.data.message);
      setInstitutes((prev) =>
        prev.map((institute) =>
          institute._id === selectedInstitute._id ? { ...institute, ...formData } : institute
        )
      );
      handleCloseModal();
    } catch (err) {
      console.error('Error saving changes:', err.response || err.message);
      setError(err.response?.data?.message || 'Failed to save changes. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this institute? This action cannot be undone.'
    );

    if (!confirmation) return;

    const token = localStorage.getItem('token');

    try {
      await axios.post(`https://examforinstitutes.onrender.com/owner/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInstitutes((prev) => prev.filter((institute) => institute._id !== id));
      console.log('Institute deleted successfully');
    } catch (err) {
      console.error('Error deleting institute:', err.response || err.message);
      setError(err.response?.data?.message || 'Failed to delete the institute. Please try again.');
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading Institutes...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="institutesContainer">
      <div className="institutes-card">
        <div className="institutes-card-content adminok">
          <div className="institutes-header">
            <h1 className="institutes-title admin">Institutes Info</h1>
          </div>
          <div className="table-container">
            {institutes.length === 0 ? (
              <p className="no-institutes">No Institutes are Registered</p>
            ) : (
              institutes.slice(0, visibleCount).map((institute) => (
                <div key={institute._id}>
                  <div className="profile adminp1">
                    <div className="logo">
                      <img
                        src={institute.logo || 'https://via.placeholder.com/150'}
                        alt="Institute Logo"
                      />
                    </div>
                    <div className="details">
                      <div className="OwnerName">Institute Owner: {institute.ownerName}</div>
                      <div className="InstituteName">Institute: {institute.instituteName}</div>
                      <div className="instituteshortName">Short Name: {institute.shortName}</div>
                      <div className="InstituteEmail">Email: {institute.email}</div>
                      <div className="InstitutePhone">Phone: {institute.phone}</div>
                      <div className="IsoId">ISO ID: {institute.uniqueId}</div>
                      <button
                        onClick={() => handleEditClick(institute)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(institute._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="iso">
                      <img
                        src={institute.iso || 'https://via.placeholder.com/200x400'}
                        alt="ISO Certificate"
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            )}
          </div>
          {visibleCount < institutes.length && (
            <button onClick={handleViewMore} className="view-more-btn">
              View More
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal3">
          <div className="modal-content3">
            <h2>Edit Institute</h2>
            <form>
              <label>
                Owner Name:
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Institute Name:
                <input
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Short Name:
                <input
                  type="text"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phone:
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Unique ID:
                <input
                  type="text"
                  name="uniqueId"
                  value={formData.uniqueId}
                  onChange={handleChange}
                />
              </label>
              <label>
                ISO Certificate:
                <input type="file" name="iso" accept="image/*" onChange={handleFileChange} />
              </label>
              <label>
                Logo:
                <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
              </label>
              <div className="modal-buttons">
                <button type="button" onClick={handleSaveChanges} className="save-btnadmin">
                  Save
                </button>
                <button type="button" onClick={handleCloseModal} className="close-btnadmin">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Institutes;
