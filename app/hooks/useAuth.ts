import {create} from "zustand";
import {SessionUser} from "next-auth";

export interface AuthStore {
    loggedUser?: SessionUser,
    setLoggedUser: (user: SessionUser) => void
}

const useAuth = create<AuthStore>((set) => ({
    loggedUser: undefined,
    setLoggedUser: (user?: SessionUser) => set({loggedUser: user}),
}))

export default useAuth;