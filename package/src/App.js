

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import UserList from './UserList';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleUserAdded = (newUser) => {
    
    setUsers([...users, newUser]);
  };

  const handleUserUpdated = (updatedUser) => {
   
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <div className="App">
      {/* UserForm component for adding new users */}
      <UserForm onUserAdded={handleUserAdded} />

      {/* UserList component for displaying the list of users */}
      <UserList users={users} onUserUpdated={handleUserUpdated} />
    </div>
  );
};

export default App;
