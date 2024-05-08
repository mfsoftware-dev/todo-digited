import {create} from "zustand";
import axios from "axios";
import {ProjectExt} from "@/app/types";

export interface AuthStore {
    projects: ProjectExt[],
    fetchProjects: () => void,
}

const useAuth = create<AuthStore>((set) => ({
    projects: [],
    fetchProjects: async () => {
        console.log("OK");
        const response = await axios.get("/api/projects")
        set({ projects: (response.status !== 200) ? [] : response.data.items })
    },
}))

export default useAuth;