import React from 'react';
import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route
                path="/dashboard"
                element={<Dashboard/>}
            />
            <Route path="*" element={<Navigate to="/dashboard"/>}/>
        </Routes>
    );
};

export default App;
