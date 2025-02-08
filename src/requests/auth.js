import api from "../services/api.js";

export const loginRequest = (data) => {
    return api.post('/auth/login', data)
}

export const refreshTokenRequest = (refreshToken) => {
    return api.post('/auth/refresh', {refreshToken})
}
