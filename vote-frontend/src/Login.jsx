import React, { useState } from 'react';
import axios from './axios'; 
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            const user = response.data.user;
            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(user));
            // Navigate based on user role
            if (user.role === 'Normal User') {
                navigate('/user-home');
            } else if (user.role === 'Admin') {
                navigate('/admin-home');
            }
        } catch (error) {
            setError('Login failed: ' + (error.response?.data?.message || 'Invalid credentials'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="absolute top-0 left-50 m-4">
                <img src="/logo.png" alt="Company Logo" className="h-24" />
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Login</button>
                <Link to="/register" className="block text-center text-green-500 mt-4">Need an Account?</Link>
                <Link to="/" className="block text-center text-green-500 mt-4">Home</Link>
            </form>
        </div>
    );
};

export default Login;
