import {create} from "zustand";
import {Project} from "@prisma/client";

export interface DeleteProjectModalStore {
    project?: Project,
    isOpen: boolean,
    openModal: (project?: Project) => void,
    closeModal: () => void
}

const useDeleteProjectModal = create<DeleteProjectModalStore>((set) => ({
    project: undefined,
    isOpen: false,
    openModal: (project?: Project) => set({isOpen: true, project: project}),
    closeModal: () => set({isOpen: false, project: undefined})
}))

export default useDeleteProjectModal;