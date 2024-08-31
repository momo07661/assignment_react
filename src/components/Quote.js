import React, { useState } from 'react';
import axios from '../api/axios'; // Make sure this path matches your project structure

const Quote = () => {
    const [symbol, setSymbol] = useState('');
    const [quote, setQuote] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading status

    const handleGetQuote = async () => {
        setMessage(''); // Clear previous messages
        setLoading(true); // Set loading to true when starting the request
        try {
            const response = await axios.post('/quote', { symbol });
            setQuote(response.data);
            setMessage(`Quote for ${symbol} fetched successfully.`);
        } catch (error) {
            console.error('Error fetching quote:', error);
            setMessage('Failed to fetch quote. Please check the stock symbol and try again.');
        } finally {
            setLoading(false); // Set loading to false when the request is complete
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter stock symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                disabled={loading} // Disable input while loading
            />
            <button onClick={handleGetQuote} disabled={loading}>
                {loading ? 'Loading...' : 'Get Quote'} {/* Show loading text on the button */}
            </button>

            {message && <p>{message}</p>} {/* Display message prompt */}

            {quote && !loading && ( // Only display the quote if not loading
                <div>
                    <h3>Quote for {symbol}:</h3>
                    <p>Price: ${quote.price}</p>
                    {/* other thing may be added */}
                </div>
            )}
        </div>
    );
};

export default Quote;
