import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    };

    const handleDeleteUser = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/api/user/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        setLoading(false);
    };

    const handlePromoteUser = async (id) => {
        setLoading(true);
        try {
            await axios.put(`/api/user/${id}/promote`);
            fetchUsers();
        } catch (error) {
            console.error('Error promoting user:', error);
        }
        setLoading(false);
    };

    const goToAdminPage = () => {
        navigate('/admin-home');
    };

    return (
        <div className="min-h-screen p-4 ">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <button
                onClick={goToAdminPage}
                className="bg-blue-500 text-white p-2 rounded mb-4"
            >
                Back to Admin Page
            </button>
            {users.length === 0 ? (
                <p>No users available.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="border p-4 mb-2 rounded bg-white shadow">
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-gray-700">Email: {user.email}</p>
                            <p className={`text-sm ${user.role === 'Admin' ? 'text-green-500' : 'text-gray-500'}`}>
                                Role: {user.role}
                            </p>
                            {user.role !== 'Admin' && (
                                <button
                                    onClick={() => handlePromoteUser(user.id)}
                                    className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600"
                                >
                                    Promote
                                </button>
                            )}
                            <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ManageUsers;
