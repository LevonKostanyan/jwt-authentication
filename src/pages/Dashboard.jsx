import React, {useEffect, useState} from "react";
import api from "../services/api";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
    const logout = useAuthStore((state) => state.logout);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/auth/users")
            .then((res) => setUsers(res.data))
            .catch(() => alert("Unauthorized"));
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>
            <ul>
                {users.length > 0 ? users.map((user) => <li key={user.id}>{user.username}</li>) : <p>No users found</p>}
            </ul>
        </div>
    );
};

export default Dashboard;
