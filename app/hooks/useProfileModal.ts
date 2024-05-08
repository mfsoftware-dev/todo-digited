import {create} from "zustand";
import {Task} from "@prisma/client";

export interface ProfileModalStore {
    isOpen: boolean,
    openModal: () => void,
    closeModal: () => void
}

const useTaskDrawer = create<ProfileModalStore>((set) => ({
    isOpen: false,
    openModal: () => set({isOpen: true}),
    closeModal: () => set({isOpen: false})
}))

export default useTaskDrawer;