import React, { useState } from 'react';
import axios from '../api/axios'; // Ensure this matches your project structure

const AddMoney = () => {
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddMoney = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Clear previous messages

        try {
            const response = await axios.post('/add-money', { userId, amount }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            setMessage(response.data.message);
        } catch (err) {
            console.error('Error adding money:', err);
            setMessage(err.response?.data?.message || 'Failed to add money. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add Money to User Account</h2>
            <form onSubmit={handleAddMoney}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Add Money'}
                </button>
            </form>
            {message && <p>{message}</p>} {/* Display success or error message */}
        </div>
    );
};

export default AddMoney;
