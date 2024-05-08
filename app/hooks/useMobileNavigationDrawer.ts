import {create} from "zustand";
import {Task} from "@prisma/client";

export interface MobileNavigationDrawerStore {
    isOpen: boolean,
    openDrawer: () => void,
    closeDrawer: () => void
}

const useMobileNavigationDrawer = create<MobileNavigationDrawerStore>((set) => ({
    isOpen: false,
    openDrawer: () => set({isOpen: true}),
    closeDrawer: () => set({isOpen: false})
}))

export default useMobileNavigationDrawer;