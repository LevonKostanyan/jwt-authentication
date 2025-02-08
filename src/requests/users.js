import api from "../services/api.js";

export const getUsersRequest = () => {
    return api.get('/auth/users')
}
