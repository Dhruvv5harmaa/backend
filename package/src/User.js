
import React, { useState } from 'react';
import axios from 'axios';

const User = ({ user, onDelete, onUpdate }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState(user.username);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/api/users/${user.id}`)
      .then(response => {
        console.log('User deleted:', user);
        onDelete(user.id);
        setShowConfirmModal(false);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/users/${user.id}`, {
      username: updatedUsername,
      email: updatedEmail,
    })
      .then(response => {
        console.log('User updated:', response.data);
        onUpdate(response.data); 
        setShowUpdateForm(false);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <p>{user.username} - {user.email}</p>
      <button onClick={() => setShowConfirmModal(true)}>Delete</button>
      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>Update</button>

      {showUpdateForm && (
        <div>
          <label>Updated Username:</label>
          <input
            type="text"
            value={updatedUsername}
            onChange={(e) => setUpdatedUsername(e.target.value)}
          />
          <label>Updated Email:</label>
          <input
            type="text"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      )}

      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this user?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
