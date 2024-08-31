import React, { useState } from 'react';
import axios from '../api/axios';

const Buy = () => {
    const [symbol, setSymbol] = useState('');
    const [shares, setShares] = useState('');
    const [error, setError] = useState('');

    const handleBuy = async () => {
        // e.preventDefault();
        try {
            const response = await axios.post('/buy', { symbol, shares }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Purchase successful: ' + response.data.message);
            setError(''); // Clear any previous errors
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'An unexpected error occurred.';
            alert('Purchase failed: ' + errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <div>
            <form onSubmit={handleBuy}>
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Stock Symbol"
                />
                <input
                    type="number"
                    value={shares}
                    onChange={(e) => setShares(e.target.value)}
                    placeholder="Number of Shares"
                />
                <button type="submit">Buy</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Buy;
