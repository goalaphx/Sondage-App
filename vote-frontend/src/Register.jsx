import React, { useState } from 'react';
import axios from './axios'; // Import your configured Axios
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        setSuccess(''); // Reset success message
        try {
            const response = await axios.post('http://localhost:8000/api/register', { name, email, password, password_confirmation: passwordConfirm });
            setSuccess(response.data.message);
        } catch (error) {
            setError('Registration failed: ' + (error.response?.data?.message || 'Please try again'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="absolute top-0 left-50 m-4">
                <img src="/logo.png" alt="Company Logo" className="h-24" />
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
                <Link to="/" className="block text-center text-green-500 mt-4">Home</Link>
            </form>
        </div>
    );
};

export default Register;
