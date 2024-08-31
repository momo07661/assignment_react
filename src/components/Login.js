import React, {useState} from 'react';
import axios from '../api/axios';
import {useNavigate} from "react-router-dom";

const Login = ({ setToken, setIsAdmin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleAdmin = ()=>{
        navigate('/admin')
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { username, password });
            setToken(response.data.token);
            if(response.data.is_admin === 1){
                setIsAdmin(true);
                handleAdmin();
            }
            setError(''); // Clear any previous errors
        } catch (err) {
            // Handle error gracefully
            if (err.response) {
                // If err.response exists, use it
                setError(err.response.data.error || 'An unexpected error occurred.');
            } else {
                // If err.response does not exist, handle it here
                setError('Network error or server is not reachable.');
            }
            console.error('Login failed:', err);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
