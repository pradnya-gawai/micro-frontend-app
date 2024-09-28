import React, { useState } from 'react';
import axios from 'axios';
import { setAuthToken } from './axiosConfig';  // Central Axios config with setAuthToken
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css'; // Import the CSS file

const LoginComponent = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // For navigation after login

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://qa-app.mewurk.com/api/v1/userservice/account/login', {
        username,
        password,
      });

      // Assume the token is in response.data.token
      const token = response?.data?.data?.token;
      console.log(response?.data?.data.token, "response");
      // Store the token in local storage or context
      localStorage.setItem('token', token);

      // Set token in the Axios instance
      setAuthToken(token);

      // Call the onLoginSuccess prop to update login status
      onLoginSuccess();

      // Navigate to the task page after successful login (optional)
      navigate('/leave');

    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">User Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginComponent;
