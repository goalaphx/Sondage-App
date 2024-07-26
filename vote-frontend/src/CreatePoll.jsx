import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreatePoll = async () => {
        if (!question || options.length < 2 || options.some(option => !option.trim())) {
            setError('Please create a valid poll with at least two options and a question.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/poll/create', { question, options });
            navigate('/manage-polls');
        } catch (error) {
            console.error('Error creating poll:', error.response || error.message);
            setError('Error creating poll. Please try again.');
        }
        setLoading(false);
    };

    const goToManagePolls = () => {
        navigate('/manage-polls');
    };

    return (
        <div className="min-h-screen p-4">
            <button
                onClick={goToManagePolls}
                className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded shadow-md hover:bg-red-700 transition duration-200"
            >
                Back to Manage Polls
            </button>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Create Poll</h1>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Poll Question"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                        placeholder={`Option ${index + 1}`}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
                <button
                    onClick={() => setOptions([...options, ''])}
                    className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600"
                >
                    Add Option
                </button>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    onClick={handleCreatePoll}
                    disabled={loading}
                    className={`w-full p-3 rounded-lg ${loading ? 'bg-gray-500' : 'bg-green-500'} text-white font-semibold`}
                >
                    {loading ? 'Creating...' : 'Create Poll'}
                </button>
            </div>
        </div>
    );
};

export default CreatePoll;
