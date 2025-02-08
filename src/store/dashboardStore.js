import {create} from "zustand";
import {getUsersRequest} from "../requests/users.js";

const useDashboardStore = create((set) => ({
    users: [],
    fetchUsers: async () => {
        const {users} = await getUsersRequest();
        set({users});
    },
}));

export default useDashboardStore;
