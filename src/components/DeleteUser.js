// src/components/DeleteUser.js
import React, { useState } from 'react';
import axios from '../api/axios';

const DeleteUser = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete('/admin/deleteUser', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: { username }
            });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            localStorage.getItem('is_admin') ? console.error('Delete failed:', err.response?.data?.error || 'unknown errror') : console.error('Delete failed:', err.response?.data?.error || 'Un Authentication');

            setError(err.response?.data?.error || 'An unexpected error occurred.');
            setMessage('');
        }
    };

    return (
        <div>
            <h3>Delete User</h3>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <button type="submit">Delete</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default DeleteUser;
