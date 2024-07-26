import React, { useState, useEffect } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

const VoteHistory = () => {
    const [votes, setVotes] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/votes', {
            params: { user_id: user.id }
        }).then(response => {
            setVotes(response.data);
        }).catch(error => {
            console.error('Error fetching vote history:', error);
        });
    }, [user.id]);

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
                <h2 className="text-2xl font-bold mb-6">Your Vote History</h2>
                {votes.length > 0 ? (
                    <ul className="space-y-4">
                        {votes.map(vote => (
                            <li key={vote.id} className="p-4 border border-gray-300 rounded-md shadow-sm">
                                <div className="font-semibold">{vote.poll.question}</div>
                                <div className="text-gray-700">
                                    <span className="text-red-500">Option: </span>{vote.option}
                                </div> {/* Only "Option:" text in red */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">You haven't voted yet.</p>
                )}
            </div>
        </div>
    );
};

export default VoteHistory;
