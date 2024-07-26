import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center ">
             <div className="absolute top-0 left-50 m-4">
                <img src="/logo.png" alt="Company Logo" className="h-24" />
            </div>
            <h1 className="text-4xl font-bold mb-8">Welcome to My Voting App!</h1>
            <div className="flex flex-col gap-4">
                <Link 
                    to="/login" 
                    className="bg-green-500 text-white p-4 rounded border border-transparent hover:border-blue-700 flex items-center justify-center"
                >
                    Login
                </Link>
                <Link 
                    to="/register" 
                    className="bg-green-500 text-white p-4 rounded border border-transparent hover:border-green-700 flex items-center justify-center"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;
