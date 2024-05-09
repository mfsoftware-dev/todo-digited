import {TaskPriority} from "@prisma/client";
import {MdSignalCellular0Bar, MdSignalCellular2Bar, MdSignalCellular4Bar} from "react-icons/md";

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
export const taskPriorityIcon = (priority: string) => {
    switch (priority){
        case TaskPriority.LOW: return MdSignalCellular0Bar;
        case TaskPriority.MEDIUM: return MdSignalCellular2Bar;
        case TaskPriority.HIGH: return MdSignalCellular4Bar;
        default: return MdSignalCellular0Bar;
    }
}