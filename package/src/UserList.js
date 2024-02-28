import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ onUserDeleted, onUserUpdated }) => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleDelete = (deletedUserId) => {
    axios.delete(`http://localhost:8080/api/users/${deletedUserId}`)
      .then(response => {
        console.log('User deleted:', deletedUserId);
        fetchUsers();
        onUserDeleted();
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleUpdate = (userId) => {
    const updatedUser = users.find(user => user.id === userId);
    setEditedUser(updatedUser);
  };

  const handleCancelUpdate = () => {
    setEditedUser(null);
  };

  const handleSaveUpdate = () => {
    axios.put(`http://localhost:8080/api/users/${editedUser.id}`, editedUser)
      .then(response => {
        console.log('User updated:', editedUser);
        fetchUsers();
        onUserUpdated();
        setEditedUser(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h2>User List</h2>
      {users.map(user => (
        <div key={user.id}>
          {editedUser && editedUser.id === user.id ? (
            <div>
              <p>
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                />
                {' - '}
                <input
                  type="text"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
              </p>
              <button onClick={handleSaveUpdate}>Save Update</button>
              <button onClick={handleCancelUpdate}>Cancel Update</button>
            </div>
          ) : (
            <div>
              <p>{user.username} - {user.email}</p>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
              <button onClick={() => handleUpdate(user.id)}>Update</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
