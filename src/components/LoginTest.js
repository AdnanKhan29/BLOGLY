import React, { useState } from 'react';
import axios from 'axios';

function LoginTest() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponseData] = useState('Loading..');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', { username, password });
      setResponseData(response.data);
      console.log(response.data);
      if (response.data === 'User signed up successfully') {
        window.location.href = '/announcements'; // Replace '/home' with the actual path to your home page
      }
    } catch (error) {
      console.error('Error signing up: ', error);
    }
  };

  return (
    <div>
      <h3 className="text-center text-3xl p-5">Login Tester</h3>
      <form onSubmit={handleSubmit} className="text-center">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="text-center">
        <p>API Response: {responseData}</p>
      </div>
    </div>
  );
}

export default LoginTest;
