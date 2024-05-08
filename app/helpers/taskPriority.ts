import {TaskPriority} from "@prisma/client";

export const taskPriorityLabel = (priority: string) => {
    switch (priority){
        case TaskPriority.LOW: return "Bassa";
        case TaskPriority.MEDIUM: return "Media";
        case TaskPriority.HIGH: return "Alta";
        default: return "Bassa";
    }
}
export const taskPriorityColor = (priority: string) => {
    switch (priority){
        case TaskPriority.LOW: return "#3B82F6";
        case TaskPriority.MEDIUM: return "#FF941A";
        case TaskPriority.HIGH: return "#9B1616";
        default: return "#3B82F6";
    }
}