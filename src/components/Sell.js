import React, { useState } from 'react';
import axios from '../api/axios';

const Sell = () => {
    const [symbol, setSymbol] = useState('');
    const [shares, setShares] = useState('');
    const [error, setError] = useState('');

    const handleSell = async () => {
        // e.preventDefault();
        try {
            const response = await axios.post('/sell', { symbol, shares }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Sale successful: ' + response.data.message);
            setError(''); // Clear any previous errors
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'An unexpected error occurred.';
            alert('Sale failed: ' + errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <div>
            <form onSubmit={handleSell}>
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
                <button type="submit">Sell</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Sell;
