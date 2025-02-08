import React, {useEffect, useState} from "react";
import api from "../../services/api.js";
import useAuthStore from "../../store/authStore.js";
import "./Dashboard.css";

const Dashboard = () => {
    const logout = useAuthStore((state) => state.logout);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/auth/users")
            .then((res) => setUsers(res.data.users))
            .catch(() => alert("Unauthorized"));
    }, []);

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
