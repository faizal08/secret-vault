import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; 
import { setCredentials } from '../store/authSlice';
import API from '../api/axiosConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending request to your Spring Boot backend
      const response = await API.post('/auth/login', { username: email, password });
      
      // Saving user data and token to Redux and LocalStorage
      dispatch(setCredentials({ 
        user: response.data.user, 
        token: response.data.token 
      }));
      
      alert('Vault Unlocked!');
      navigate('/dashboard'); // Move user to the dashboard after success
    } catch (error) {
      console.error(error);
      alert('Access Denied: Check your credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500 tracking-widest">SECRET VAULT</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Agent Email"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Access Key"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            New operative?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4">
              Request Access Key
            </Link>
          </p>
        </div>
      </div>
      
      <p className="mt-8 text-gray-600 text-xs tracking-tighter uppercase">
        Encrypted End-to-End Environment
      </p>
    </div>
  );
};

export default Login;