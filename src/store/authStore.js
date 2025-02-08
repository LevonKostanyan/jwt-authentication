import {create} from "zustand";
import {storageAccessTokenKey, storageRefreshTokenKey} from "../services/api.js";
import {persist} from "zustand/middleware";

const useAuthStore = create()(persist((set) => ({
    user: null,
    login: (user) => {
        set((state) => {
            localStorage.setItem(storageAccessTokenKey, user.accessToken);
            localStorage.setItem(storageRefreshTokenKey, user.refreshToken);
            return {
                ...state,
                user: {
                    ...state.user,
                    ...user
                },
            }
        })
    },
    logout: () => {
        localStorage.removeItem(storageAccessTokenKey);
        localStorage.removeItem(storageRefreshTokenKey);
        set(() => ({user: null}));
    },
}), {
    name: 'Auth Store'
}));

export default useAuthStore;
