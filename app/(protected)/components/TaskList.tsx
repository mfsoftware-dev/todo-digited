"use client"

import {Task, TaskPriority} from "@prisma/client";
import TaskCard from "@/app/(protected)/components/TaskCard";
import axios from "axios";
import toast from 'react-hot-toast';
import useTaskDrawer from "@/app/hooks/task/useTaskDrawer";
import {useMemo, useState} from "react";
import {taskPriorityColor, taskPriorityLabel} from "@/app/helpers/taskPriority";
import useProjectStore from "@/app/hooks/project/useProjectStore";
import TaskDrawer from "@/app/(protected)/components/TaskDrawer";

interface TaskListProps {
    list: Task[],
    onChange: () => void,
}

const TaskList = ({list, onChange}: TaskListProps) => {
    
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
    
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
    
    const filteredList = useMemo(() => {
        if(!selectedPriority) return list;
        return list.filter((task) => task.priority === selectedPriority);
    }, [list, selectedPriority])
    
    return (
        <>
            <div className={"flex flex-col"}>
                <div className={"flex space-x-2 items-center"}>
                    {Object.keys(TaskPriority).map((priority) => {
                        return (
                            <div key={priority} className={"px-4 h-7 flex items-center justify-center rounded-full font-bold hover:shadow-md transition cursor-pointer text-white"} style={{backgroundColor: taskPriorityColor(priority)}} onClick={() => setSelectedPriority(priority)}>
                                <span className={"text-xs"}>{taskPriorityLabel(priority)}</span>
                            </div>
                        )
                    })}
                </div>
                <div className={"mt-10"}>
                    {filteredList && filteredList.length > 0 && (
                        <div className={"flex flex-col space-y-5"}>
                            {filteredList.map((task) => {
                                return <TaskCard key={task.id} task={task} onToggleStatus={() => toggleTaskStatus(task.id)} onView={() => taskDrawer.openDrawer(task)}/>
                            })}
                        </div>
                    )}
                </div>
            </div>

            <TaskDrawer onChange={onChange}/>
        </>
    )
}

export default TaskList