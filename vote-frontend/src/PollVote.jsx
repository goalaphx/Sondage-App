import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';

const PollVote = () => {
    const { pollId } = useParams();
    const navigate = useNavigate();
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [message, setMessage] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get(`http://localhost:8000/api/poll/${pollId}`).then(response => {
            setPoll(response.data);
        });
    }, [pollId]);

    const handleVote = async () => {
        if (!selectedOption) {
            setMessage('Please Choose an Option');
            return;
        }
        if (poll) {
            try {
                await axios.post('http://localhost:8000/api/vote', {
                    poll_id: poll.id,
                    user_id: user.id,
                    option: selectedOption
                });
                setMessage('Vote cast successfully');
                setTimeout(() => {
                    navigate('/polls');
                }, 1000); // Redirect after 1 second
            } catch (error) {
                setMessage('Failed to cast vote: ' + (error.response?.data?.message || 'Please try again'));
            }
        }
    };

    const handleBackToPollList = () => {
        navigate('/polls');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        
            <button
                onClick={handleBackToPollList}
                className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded shadow-md hover:bg-red-700 transition duration-200"
            >
                Back to Poll List
            </button>
            <div className="w-full max-w-md bg-white rounded shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">{poll ? poll.question : 'Loading...'}</h2>
                {poll && (
                    <div>
                        {poll.options.map((option, index) => (
                            <div key={index} className="mb-4 flex items-center">
                                <input
                                    type="radio"
                                    id={`option-${index}`}
                                    name="poll-option"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={() => setSelectedOption(option)}
                                    className="mr-2"
                                />
                                <label htmlFor={`option-${index}`} className="text-lg">{option}</label>
                            </div>
                        ))}
                        <button
                            onClick={handleVote}
                            className="bg-green-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition"
                        >
                            Vote
                        </button>
                        {message && <p className="mt-4 text-blue-500">{message}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PollVote;
