import {create} from "zustand";
import {Task} from "@prisma/client";

export enum TaskDrawerTarget {
    UPCOMING_TASKS,
    TODAY_TASKS,
    PROJECT_TASKS
}

export interface TaskDrawerStore {
    task?: Task,
    target?: TaskDrawerTarget,
    isOpen: boolean,
    openDrawer: (task?: Task, target?: TaskDrawerTarget) => void,
    closeDrawer: () => void
}

const useTaskDrawer = create<TaskDrawerStore>((set) => ({
    task: undefined,
    target: undefined,
    isOpen: false,
    openDrawer: (task?: Task, target?: TaskDrawerTarget) => set({isOpen: true, task, target}),
    closeDrawer: () => set({isOpen: false, task: undefined, target: undefined})
}))

export default useTaskDrawer;