import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
    baseURL: "https://dummyjson.com",
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
            window.location.href = "/Login";
        }
        return Promise.reject(error);
    }
);

export default api;
