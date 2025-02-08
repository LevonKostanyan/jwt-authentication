import React from 'react';
import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/dashboard"/>}/>
        </Routes>
    );
};

export default App;
