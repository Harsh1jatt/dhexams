import React, { useState, useEffect } from 'react';
import './css/Students.css';

const EditStudentModal = ({ show, onClose, student, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    dob: '',
    image: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.studentName || '',
        rollNo: student.rollNumber || '',
        dob: student.dateOfBirth || '',
        image: student.profileImage || ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedStudent = { ...student, ...formData };
    onSave(updatedStudent);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-s">
        <h2>Edit Student</h2>
        <form>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Roll Number:</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
          />
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <label>Image:</label>
          <input type="file" onChange={(e) => setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) })} />
          {formData.image && <img src={formData.image} alt="Preview" className="preview-image" />}
          <div className="btns">
            <button type="button" onClick={handleSave}>Save</button>
            <button className="danger" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
