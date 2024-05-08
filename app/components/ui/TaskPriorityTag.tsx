"use client"

import {TaskPriority} from "@prisma/client";
import {taskPriorityColor, taskPriorityLabel} from "@/app/helpers/taskPriority";

interface TaskPriorityTagProps {
    priority: TaskPriority,
}

const TaskPriorityTag = ({priority}: TaskPriorityTagProps) => {
    return (
        <div key={priority} className={"px-2 h-5 flex items-center justify-center leading-none rounded-full hover:text-white hover:bg-blue-500 transition cursor-pointer text-white font-semibold"} style={{backgroundColor: taskPriorityColor(priority)}}>
            <span className={"text-[10px]"}>{taskPriorityLabel(priority)}</span>
        </div>
    )
}

export default TaskPriorityTag