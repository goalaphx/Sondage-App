import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';

const ManagePolls = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const response = await axios.get('/api/polls');
            setPolls(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching polls:', error);
            setPolls([]);
        }
    };

    const handleDeletePoll = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/api/poll/${id}`);
            fetchPolls();
        } catch (error) {
            console.error('Error deleting poll:', error);
        }
        setLoading(false);
    };

    const handleCheckPoll = (id) => {
        navigate(`/polls/${id}`);
    };

    const goToAdminPage = () => {
        navigate('/admin-home');
    };

    return (
        <div className="min-h-screen p-6 ">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Polls</h1>
                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => navigate('/create-poll')}
                        className="bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 transition-colors"
                    >
                        Create Poll
                    </button>
                    <button
                        onClick={goToAdminPage}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        Back to Admin Page
                    </button>
                </div>
                {polls.length === 0 ? (
                    <p className="text-center text-gray-500">There are no polls</p>
                ) : (
                    <ul className="space-y-4">
                        {polls.map((poll) => (
                            <li key={poll.id} className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{poll.question}</h2>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleCheckPoll(poll.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition-colors"
                                    >
                                        Check
                                    </button>
                                    <button
                                        onClick={() => handleDeletePoll(poll.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ManagePolls;
