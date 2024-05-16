import axios from 'axios';
import React, { useState } from 'react';
import { useLoginStore } from '../store';
import QuestionsPage from './QuestionsPage';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const handleLogin = useLoginStore(state => state.handleLogin)
    const getPfp = useLoginStore(state => state.getPfp)
    const handleClickLogin =  () => {
        handleLogin(username)
        getPfp(username)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-950">
            <div className="bg-zinc-900 rounded-lg py-12 px-9 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-white">Login to Instagram</h2>
                <input
                    type="text"
                    className="w-full px-4 py-2 bg-zinc-800 text-white rounded mb-4 focus:outline-none focus:bg-zinc-700"
                    placeholder="Enter your Instagram username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded text-white font-semibold focus:outline-none hover:opacity-90 transition-opacity"
                    onClick={handleClickLogin}
                >
                    Login
                </button>
            </div>
            {/* <QuestionsPage/> */}
        </div>
    );
};

export default LoginPage;
