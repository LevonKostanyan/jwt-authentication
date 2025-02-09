import axios from 'axios';
import {refreshTokenRequest} from "../requests/auth.js";
import useAuthStore from "../store/authStore.js";

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'},
});

export const storageAccessTokenKey = 'at';
export const storageRefreshTokenKey = 'rt';

let isRefreshing = false;
let refreshQueue = [];

api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem(storageAccessTokenKey);
        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`,
                ...config.headers
            }
        }
        return config;
    },
    function (error) {
        console.log('[Request Error]', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function (res) {
        return res.data;
    },
    async function (error) {
        const authStore = useAuthStore.getState()

        const refreshToken = localStorage.getItem(storageRefreshTokenKey);
        if (!refreshToken) {
            authStore.logout();
            return Promise.reject(error);
        }

        const originalRequest = error.config;
        if (error.response.status === 401) {
            originalRequest._retry = true;
            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshQueue.push(() => {
                        originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem(storageAccessTokenKey)}`;
                        resolve(api(originalRequest));
                    });
                });
            }
        }

        if (isRefreshing) {
            authStore.logout();
            return Promise.reject(error);
        }

        isRefreshing = true;

        const tokens = await refreshTokenRequest(refreshToken);
        if (tokens) {
            authStore.login(tokens)
            return api(originalRequest);
        } else {
            authStore.logout();
            return Promise.reject(error);
        }
    },
);

export default api;
