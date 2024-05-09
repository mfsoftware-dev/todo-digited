"use client"

import {Task} from "@prisma/client";
import {Checkbox} from "@headlessui/react";
import {FaEdit} from "react-icons/fa";
import TaskPriorityTag from "@/app/components/ui/TaskPriorityTag";

interface TaskCardProps {
    task: Task,
    onToggleStatus: () => void,
    onEditTask: () => void,
}

const TaskCard = ({task, onToggleStatus, onEditTask}: TaskCardProps) => {
    return (
        <div className={"w-full flex flex-col space-y-3"}>
            <div className={"flex space-x-3 items-center justify-between"}>
                <div className={"flex flex-grow space-x-3 items-center cursor-pointer group"} onClick={onToggleStatus}>
                    <Checkbox checked={task.completed} onChange={onToggleStatus} className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500 cursor-pointer group-hover:bg-blue-500 transition">
                        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100 group-hover:opacity-100" viewBox="0 0 14 14" fill="none">
                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Checkbox>
                    <div className={"w-full flex space-x-3 items-center"}>
                        <p className={`text-base group-hover:text-gray-300 group-hover:line-through transition ${task.completed && "line-through text-gray-300"}`}>{task.name}</p>
                        <TaskPriorityTag priority={task.priority}/>
                    </div>
                </div>
                <FaEdit size={15} className={"group-hover:text-blue-500 transition"} onClick={onEditTask}/>
            </div>
            <hr/>
        </div>
    )
}

export default TaskCard