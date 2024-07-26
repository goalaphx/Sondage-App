// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminHome from './AdminHome';
import ManagePolls from './ManagePolls';
import ManageUsers from './ManageUsers';
import CreatePoll from './CreatePoll';
import PollDetails from './PollDetails';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import UserHome from './UserHome';
import PollList from './PollList';
import PollVote from './PollVote';
import VoteHistory from './VoteHistory';
import ProtectedRoute from './ProtectedRoute';
import { isAdmin, isNormalUser } from './Auth';

const App = () => {
    return (
        <Router>
            <div className="App bg-foggy min-h-screen flex flex-col">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes for Admin */}
                <Route
                    path="/admin-home"
                    element={
                        <ProtectedRoute
                            element={AdminHome}
                            requiredRole="Admin"
                        />
                    }
                />
                <Route
                    path="/manage-polls"
                    element={
                        <ProtectedRoute
                            element={ManagePolls}
                            requiredRole="Admin"
                        />
                    }
                />
                <Route
                    path="/manage-users"
                    element={
                        <ProtectedRoute
                            element={ManageUsers}
                            requiredRole="Admin"
                        />
                    }
                />
                <Route
                    path="/create-poll"
                    element={
                        <ProtectedRoute
                            element={CreatePoll}
                            requiredRole="Admin"
                        />
                    }
                />
                <Route
                    path="/polls/:id"
                    element={
                        <ProtectedRoute
                            element={PollDetails}
                            requiredRole="Admin"
                        />
                    }
                />

                {/* Protected Routes for Normal Users */}
                <Route
                    path="/user-home"
                    element={
                        <ProtectedRoute
                            element={UserHome}
                            requiredRole="Normal User"
                        />
                    }
                />
                <Route
                    path="/polls"
                    element={
                        <ProtectedRoute
                            element={PollList}
                            requiredRole="Normal User"
                        />
                    }
                />
                <Route
                    path="/poll/:pollId"
                    element={
                        <ProtectedRoute
                            element={PollVote}
                            requiredRole="Normal User"
                        />
                    }
                />
                <Route
                    path="/vote-history"
                    element={
                        <ProtectedRoute
                            element={VoteHistory}
                            requiredRole="Normal User"
                        />
                    }
                />


            </Routes>
            </div>
        </Router>
    );
};

export default App;
