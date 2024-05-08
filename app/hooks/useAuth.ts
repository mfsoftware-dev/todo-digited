import {create} from "zustand";
import {SessionUser} from "next-auth";
import axios from "axios";

export interface AuthStore {
    loggedUser?: SessionUser,
    fetchLoggedUser: () => void
}

const useAuth = create<AuthStore>((set) => ({
    loggedUser: undefined,
    fetchLoggedUser: async () => {
        const response = await axios.get("/api/profile");
        set({loggedUser: (response.status !== 200 ? undefined : response.data.loggedUser)});
    }
}))

export default useAuth;