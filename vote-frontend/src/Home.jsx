import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
            <div className="absolute top-4 left-4">
                <img src="/logo.png" alt="Company Logo" className="h-24" />
            </div>
            <div className="bg-white bg-opacity-75 shadow-md rounded-lg p-8 max-w-4xl w-full">
                <h1 className="text-4xl font-bold mb-6 text-center text-green-600">Welcome to OCP Voting App!</h1>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-lg mb-4 text-gray-700">
                            Our app allows you to easily participate in polls concerning our enterprise. Whether you are Manager or a Normal User we've got you covered! 
                        </p>
                        <p className="text-md mb-6 text-gray-600">
                            Join our community and make your voice heard in the decisions that matter to you.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                            <Link 
                                to="/login" 
                                className="bg-green-500 text-white py-3 px-6 rounded shadow hover:bg-green-600 transition duration-300"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-green-500 text-white py-3 px-6 rounded shadow hover:bg-green-600 transition duration-300"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1">
                        <img src="/voting.jpg" alt="Someone voting" className="w-full h-auto rounded-lg shadow-md" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
