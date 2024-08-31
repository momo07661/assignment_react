import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    },
});

export default axiosInstance;
