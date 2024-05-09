"use client"

import {Task, TaskPriority} from "@prisma/client";
import TaskCard from "@/app/(protected)/components/TaskCard";
import axios from "axios";
import toast from 'react-hot-toast';
import useTaskDrawer from "@/app/hooks/task/useTaskDrawer";
import {taskPriorityColor, taskPriorityIcon, taskPriorityLabel} from "@/app/helpers/taskPriority";
import useProjectStore from "@/app/hooks/project/useProjectStore";
import TaskDrawer from "@/app/(protected)/components/TaskDrawer";

interface TaskListProps {
    taskList: Task[],
    onChange: () => void,
}

const TaskList = ({taskList, onChange}: TaskListProps) => {
    
    const {fetchProjects} = useProjectStore();
    const taskDrawer = useTaskDrawer();

    const toggleTaskStatus = (taskId: string) => {
        axios.patch(`/api/tasks/${taskId}/toggle-status`).then((res) => {
            if(res.status !== 200) return toast.error(res.statusText);
            toast.success(res.data.message);
            fetchProjects();
            onChange();
        }).catch((error) => {
            toast.error(error.response.data);
        })
    }
    
    return (
        <>
            <div className={"mt-10 flex flex-col space-y-10 space-x-0 md:flex-row md:space-x-10 md:space-y-0 justify-evenly"}>
                {Object.keys(TaskPriority).map((priority) => {
                    const PriorityIcon = taskPriorityIcon(priority);
                    const filteredTasks = taskList.filter((task) => task.priority === priority);
                    return (
                        <div key={priority} className={"flex flex-col w-full"}>
                            
                            <div style={{backgroundColor: taskPriorityColor(priority)}} className={"opacity-90 flex space-x-3 items-center justify-center px-4 py-2 rounded-lg shadow-md"}>
                                <PriorityIcon className={"text-white"}/>
                                <span className={"text-base text-white font-bold"}>Priorità {taskPriorityLabel(priority)}</span>
                            </div>
                            
                            {filteredTasks.length > 0 && (
                                <div className={"flex flex-col space-y-5 mt-7"}>
                                    {taskList.filter((task) => task.priority === priority).map((task) => {
                                        return <TaskCard key={task.id} task={task} onToggleStatus={toggleTaskStatus.bind(this, task.id)} onEditTask={taskDrawer.openDrawer.bind(this, task)}/>
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <TaskDrawer onChange={() => {
                fetchProjects();
                onChange();
            }}/>
        </>
    )
}

export default TaskList