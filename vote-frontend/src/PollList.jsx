import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';

const PollList = () => {
    const [polls, setPolls] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get('http://localhost:8000/api/polls/not-voted', {
            params: { user_id: user.id }
        }).then(response => {
            setPolls(response.data);
        }).catch(error => {
            console.error('Error fetching polls:', error);
        });
    }, [user.id]);

    const handlePollClick = (poll) => {
        navigate(`/poll/${poll.id}`);
    };

    const handleBackToHome = () => {
        navigate('/user-home'); // Assuming /user-home is the route for UserHome
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            
            <button
                onClick={handleBackToHome}
                className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded shadow-md hover:bg-red-700 transition duration-200"
            >
                Back to Home
            </button>
            <div className="w-full max-w-md bg-white rounded shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Available Polls</h2>
                {polls.length === 0 ? (
                    <p className="text-gray-500">There are no polls available for you to vote on.</p>
                ) : (
                    <ul>
                        {polls.map(poll => (
                            <li
                                key={poll.id}
                                onClick={() => handlePollClick(poll)}
                                className="cursor-pointer mb-2 p-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                            >
                                {poll.question}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PollList;
