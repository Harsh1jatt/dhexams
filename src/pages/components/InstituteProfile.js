import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importing axios for API calls
import './css/InstituteProfile.css'; // Import the CSS file

function InstituteProfile() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        city: '',
        occupation: '',
        logo: '',
        instituteName: '',
        shortName: '',
        phone: '',
        iso: '',
        uniqueId: ''
    });
    const [error, setError] = useState('');  // For handling errors
    const [loading, setLoading] = useState(true); // For loading state

    // Fetch data from the backend
    useEffect(() => {
        console.log(localStorage.getItem('token'));

        // Make a GET request to fetch the institute data
        axios.get('https://examforinstitutes.onrender.com/institute/my-institute', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => {
            const { data } = response;
            console.log(data)
            setFormData({
                fullName: data.ownerName || '',
                email: data.email || '',
                contactNumber: data.phone || '',
                city: data.city || '',
                occupation: data.occupation || '',
                logo: data.logo || '',
                instituteName: data.instituteName || '',
                shortName: data.shortName || '',
                phone: data.phone || '',
                iso: data.iso || '',
                uniqueId: data.uniqueId || ''
            });
            setLoading(false); // Data has been loaded
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
            setError('Failed to load institute data. Please try again.');
            setLoading(false);
        });
    }, []); // Empty array means this effect runs only once (componentDidMount)

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove the token from localStorage
        alert('Logged out!');
        window.location.href = '/';  // Redirect to the login page
    };

    // Handle form submission (update data)
    const handleUpdate = () => {
        setLoading(true); // Set loading state
        axios.put('https://examforinstitutes.onrender.com/institute/update', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => {
            console.log('Update successful:', response.data);
            alert('Institute details updated successfully!');
            setLoading(false);  // Reset loading state
        })
        .catch(error => {
            console.error('There was an error updating the data!', error);
            setError('Failed to update institute data. Please try again.');
            setLoading(false); // Reset loading state
        });
    };

    return (
        <div className="InstituteProfile-container">
            {loading ? (
                 <div className="loading-container">
                    <div className="spinner"></div>
                    <div className="loading-text">Loading...</div>
                  </div>
                  
            ) : (
                <div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="profile">
                        <div className="logo">
                            <img src={formData.logo || 'https://via.placeholder.com/150'} alt="Institute Logo" />
                        </div>
                        <div className="details">
                            <div className="OwnerName">Institute Owner: {formData.fullName}</div>
                            <div className="InstituteName">Institute: {formData.instituteName}</div>
                            <div className="InstituteShortName">Institute ShortName: {formData.shortName}</div>
                            <div className="InstituteEmail">Email: {formData.email}</div>
                            <div className="InstitutePhone">Phone: {formData.phone}</div>
                            <div className="IsoId">Iso: {formData.uniqueId}</div>
                        </div>
                        <div className="iso">
                            <img src={formData.iso || 'https://via.placeholder.com/200x400'} alt="ISO Certificate" />
                        </div>
                    </div>
                    <div className="Edit">
                        <h1>Edit Your Details</h1>
                        <p>Institute Owner</p>
                        <input 
                            type="text" 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleChange} 
                            placeholder='Institute Owner' 
                        />
                        <p>Institute Name</p>
                        <input 
                            type="text" 
                            name="instituteName" 
                            value={formData.instituteName} 
                            onChange={handleChange} 
                            placeholder='Institute Name' 
                        />
                        <p>Institute ShortName <span>Example:- RIIT, SCABIIT etc</span></p>
                        <input 
                            type="text" 
                            name="shortName" 
                            value={formData.shortName} 
                            onChange={handleChange} 
                            placeholder='Institute ShortName' 
                        />
                        <p>Institute Phone</p>
                        <input 
                            type="text" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            placeholder='Institute Phone' 
                        />
                    <button className="update-btn min-width" onClick={handleUpdate}>Update Details</button>
                    </div>
                    <div className="note">
                        <h1>Note: </h1>
                        <p>You Cannot Update Your Logo, Iso Certificate, or email. If you have any issue please contact the developer @ harshdeepdeveloper@gmail.com</p>
                    </div>
                    <button className="logout-btn danger" onClick={handleLogout}>Logout</button>
                    
                </div>
            )}
        </div>
    );
}

export default InstituteProfile;
