import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; 
import { setCredentials } from '../store/authSlice';
import API from '../api/axiosConfig';

const Login = () => {
    const [usernameInput, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sends 'username' to match your Java AuthenticationRequest DTO
            const response = await API.post('/auth/login', { 
                username: usernameInput, 
                password 
            });
            
            // Map the flat backend response to the object structure expected by Redux
            dispatch(setCredentials({ 
                user: { username: response.data.username }, 
                token: response.data.token 
            }));
            
            alert('Vault Unlocked!');
            navigate('/dashboard'); 
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
                        type="text" // Allows login without @ validation
                        placeholder="Agent Username"
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setUsernameInput(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Access Key"
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold transition-all">
                        Authenticate
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/register" className="text-blue-400 hover:text-blue-300 text-sm underline">
                        Request Access Key
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;