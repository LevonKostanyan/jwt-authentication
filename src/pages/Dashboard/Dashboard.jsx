import React, {useEffect} from "react";
import "./Dashboard.css";
import useDashboardStore from "../../store/dashboardStore.js";
import useAuthStore from "../../store/authStore.js";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const {fetchUsers, users} = useDashboardStore();
    const {logout, user} = useAuthStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            fetchUsers()
        } else {
            navigate('/login')
        }
    }, [user]);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-header">User Dashboard</h2>
            <ul className="user-list">
                {users.length > 0 ? users.map((user) => (
                    <li key={user.id} className="user-item">
                        <div className="user-info">
                            <img src={user.image} alt={user.username} className="user-avatar"/>
                            <span>{user.firstName} {user.lastName} </span>
                        </div>
                        <span>@{user.username}</span>
                    </li>
                )) : <p>No users found</p>}
            </ul>
            <button className="logout-button" onClick={() => {
                logout();
                navigate("/login");
            }}>
                Logout
            </button>
        </div>
    )
        ;
};

export default Dashboard;
