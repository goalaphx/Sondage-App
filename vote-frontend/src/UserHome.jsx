// UserHome.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center ">
             <div className="absolute top-0 left-50 m-4">
                <img src="/logo.png" alt="Company Logo" className="h-24" />
            </div>
            <div className="absolute top-0 right-0 m-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white p-2 rounded"
                >
                    Logout
                </button>
            </div>
            <h1 className="text-4xl font-bold mb-8">Welcome, {user.name}</h1>
            <button onClick={() => navigate('/polls')} className="bg-green-500 text-white p-4 rounded mb-4">Start Voting</button>
            <button onClick={() => navigate('/vote-history')} className="bg-green-500 text-white p-4 rounded">Your Votes</button>
        </div>
    );
};

export default UserHome;
