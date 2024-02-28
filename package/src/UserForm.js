import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UserFormContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const FormButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserForm = ({ onUserAdded }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = () => {
    if (!username || !email) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address.');
      return;
    }

    setError('');

    axios.post('http://localhost:8080/api/users', { username, email })
      .then(response => {
        const newUser = response.data;
        console.log('User added:', newUser);
        onUserAdded(newUser);

        setUsername('');
        setEmail('');
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const validateEmail = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <UserFormContainer>
      <h2>Add User</h2>
      <div>
        <FormLabel>Username:</FormLabel>
        <FormInput type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <FormLabel>Email:</FormLabel>
        <FormInput type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FormButton onClick={handleAddUser}>Add User</FormButton>
    </UserFormContainer>
  );
};

export default UserForm;
