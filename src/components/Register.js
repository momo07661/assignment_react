import React, { useState } from 'react';
import axios from '../api/axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State to hold success or error message
    const [error, setError] = useState(''); // State to hold error message

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', { username, password });
            if(response){

            }
            setMessage('Registration successful!');
            setError(''); // Clear any previous error
        } catch (err) {
            console.error('Registration failed:', err.response?.data?.error || 'Unknown error');
            setError(err.response?.data?.error || 'An unexpected error occurred.');
            setMessage(''); // Clear any previous success message
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>
            {/* Display success or error message */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
