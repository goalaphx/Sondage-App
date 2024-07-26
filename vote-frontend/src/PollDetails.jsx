import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';

const PollDetails = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPoll();
    }, [id]);

    const fetchPoll = async () => {
        try {
            const response = await axios.get(`/api/poll/${id}`);
            setPoll(response.data);
        } catch (error) {
            console.error('Error fetching poll details:', error);
        }
    };

    const goBackToManagePolls = () => {
        navigate('/manage-polls'); // Navigate back to Manage Polls
    };

    // Function to calculate total votes
    const getTotalVotes = () => {
        if (poll && poll.vote_counts) {
            return Object.values(poll.vote_counts).reduce((total, count) => total + count, 0);
        }
        return 0;
    };

    // Function to calculate the percentage of votes for a specific option
    const getPercentage = (option) => {
        const totalVotes = getTotalVotes();
        if (totalVotes === 0) return 0;
        return ((poll.vote_counts[option] || 0) / totalVotes) * 100;
    };

    return (
        <div className="min-h-screen p-4">
            
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-4 text-center">{poll ? poll.question : 'Loading...'}</h1>
                {poll && (
                    <ul className="space-y-2">
                        {poll.options.map((option, index) => (
                            <li key={index} className="p-4 border border-gray-300 rounded-md shadow-sm">
                                <div className="font-semibold text-lg">{option}</div>
                                <div className="text-gray-700 mt-1">
                                    {poll.vote_counts && poll.vote_counts[option] ? poll.vote_counts[option] : 0} votes
                                </div>
                                <div className="text-gray-500 mt-1">
                                    {getPercentage(option).toFixed(2)}%
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    onClick={goBackToManagePolls}
                    className="bg-blue-500 text-white p-2 rounded mt-4 w-full hover:bg-blue-600 transition-colors"
                >
                    Back to Manage Polls
                </button>
            </div>
        </div>
    );
};

export default PollDetails;
