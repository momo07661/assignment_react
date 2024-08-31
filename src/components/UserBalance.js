import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const UserBalance = () => {
    const [balance, setBalance] = useState(null);
    const [stocks, setStocks] = useState([]);
    const [message, setMessage] = useState('');

    const fetchBalanceAndStocks = async () => {
        try {
            // Fetch user balance
            const balanceResponse = await axios.get('/balance', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            setBalance(balanceResponse.data.balance);

            // Fetch owned stocks
            const stocksResponse = await axios.get('/owned-stocks', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            setStocks(stocksResponse.data.stocks);

        } catch (error) {
            console.error('Error fetching balance or stocks:', error);
            setMessage('Failed to fetch balance or stocks.');
        }
    };

    useEffect(() => {
        fetchBalanceAndStocks();
    }, []);

    return (
        <div>
            <h2>Your Account</h2>

            {message && <p>{message}</p>} {/* Display error message if any */}

            {balance !== null ? (
                <div>
                    <p>Current Balance: ${balance}</p>
                </div>
            ) : (
                <>
                    {message === "Failed to fetch balance or stocks." ? <></> :<p>Loading balance...</p>}
                </>
            )}

            <h3>Your Stocks</h3>
            {stocks.length > 0 ? (
                <ul>
                    {stocks.map((stock, index) => (
                        <li key={index}>
                            {stock.symbol}: {stock.shares} shares
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{stocks.length === 0 ? 'You do not own any stocks.' : 'Loading stocks...'}</p>
            )}
        </div>
    );
};

export default UserBalance;
