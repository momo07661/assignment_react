import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {HomePage} from "./pages/home";
import {AdminPage} from "./pages/admin";


const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        setToken(undefined);
        setIsAdmin('');
    };

    const handleSetToken = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const handleSetIsAdmin = (isAdmin)=>{
        localStorage.setItem('isAdmin', isAdmin);
        setIsAdmin(isAdmin);
    }

    return (
        <Router>

            <Routes>
                <Route path="/home" element={<HomePage setToken={handleSetToken} token={token} setIsAdmin={handleSetIsAdmin} isAdmin={isAdmin}/>} />
                <Route path="/admin" element={<AdminPage isAdmin={isAdmin} token={token}/>} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
            {token && <button onClick={handleLogout}>Logout</button>}
        </Router>
    );
};

export default App;
