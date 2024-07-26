import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminHome = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
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
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <Link to="/manage-polls" className="bg-green-500 text-white p-4 rounded mb-4">Manage Polls</Link>
            <Link to="/manage-users" className="bg-green-500 text-white p-4 rounded">Manage Users</Link>
        </div>
    );
};

export default AdminHome;
