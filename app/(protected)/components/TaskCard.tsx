"use client"

import {Task} from "@prisma/client";
import {FaEdit} from "react-icons/fa";
import Checkbox from "@/app/components/input/Checkbox";

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
                    <Checkbox checked={task.completed} />
                    <div className={"w-full flex space-x-3 items-center"}>
                        <p className={`text-base group-hover:text-gray-300 group-hover:line-through transition ${task.completed && "line-through text-gray-300"}`}>{task.name}</p>
                    </div>
                </div>
                <FaEdit size={15} className={"hover:text-blue-500 hover:scale-110 cursor-pointer transition"} onClick={onEditTask}/>
            </div>
            <hr/>
        </div>
    )
}

export default TaskCard