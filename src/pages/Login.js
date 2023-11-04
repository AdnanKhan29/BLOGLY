import React from "react";
import loginImg from "../components/login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponseData] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { username, password });
      const responseData = response.data;
      const parts = responseData.split(":");
      if (parts[0] === 'Login Successful') {
        const receivedUsername = parts[1];
        const receivedEmail = parts[2];
        sessionStorage.setItem('username', receivedUsername);
        sessionStorage.setItem('email', receivedEmail);
        window.location.href = '/announcements'; // Replace '/announcements' with the actual path to your announcements page
      } else {
        // Handle other cases or display the response data as an error
        console.log(responseData);
      }
    } catch (error) {
      console.error('Error signing up: ', error);
    }
  };


  // Function to handle the back button click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>
      <div className="bg-white dark:bg-black flex flex-col justify-center">
        <div className="text-left ml-5">
          <button
            onClick={handleBackClick}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-150  p-8 px-8 shadow-2xl">
          <h2 className="text-4xl dark:text-white font-bold text-center">
            SIGN IN
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Username</label>
            <input
              className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg bg-gray-100 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <a className="text-blue-500" href="/signup">Signup Instead</a>
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
            LOGIN
          </button>
          <p className="text-center text-red-600">{responseData}</p>
        </form>
      </div>
    </div>
  );
}
