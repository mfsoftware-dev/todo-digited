"use client"

import axios from "axios";
import {useEffect, useState} from "react";
import {Task} from "@prisma/client";
import NewTaskForm from "@/app/(protected)/components/NewTaskForm";
import {toast} from "react-hot-toast";
import TaskList from "@/app/(protected)/components/TaskList";

const UpcomingTaskList = () => {
    
    const [taskList, setTaskList] = useState<Task[]>([]);

    const fetchUpcomingTasks = async () => {
        axios.get("/api/tasks/upcoming").then((res) => {
            if(res.status !== 200) return setTaskList([]);
            setTaskList(res.data.items);
        }).catch((error) => {
            toast.error(error.response.data);
        })
    }
    
    useEffect(() => {
        fetchUpcomingTasks();
    }, [])
    
    return (
        <div>
            <NewTaskForm onSuccess={fetchUpcomingTasks} />

            <div className={"mt-10"}>
                <TaskList taskList={taskList} onChange={fetchUpcomingTasks} />
            </div>
        </div>
    )
    
}

export default UpcomingTaskList