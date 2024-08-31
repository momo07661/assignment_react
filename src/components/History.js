import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to fetch trade history
    const fetchHistory = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:3000/history', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
            setError('Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    // Fetch history on component mount
    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div>
            <h3>Transaction History</h3>
            <button onClick={fetchHistory} disabled={loading}>
                {loading ? 'Refreshing...' : 'Refresh History'}
            </button>
            {error && <p>{error}</p>}
            <ul>
                {history.map((item, index) => (
                    <li key={index}>
                        {item.symbol}: [ {item.shares} shares @ ${item.price} on {item.time}]
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;
