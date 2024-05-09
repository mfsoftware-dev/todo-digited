"use client"

import axios from "axios";
import {useEffect, useState} from "react";
import {Task} from "@prisma/client";
import NewTaskForm from "@/app/(protected)/components/NewTaskForm";
import {toast} from "react-hot-toast";
import TaskList from "@/app/(protected)/components/TaskList";

const TodayTaskList = () => {

    const [taskList, setTaskList] = useState<Task[]>([]);

    const fetchTodayTasks = async () => {
        axios.get("/api/tasks/today").then((res) => {
            if(res.status !== 200) return setTaskList([]);
            setTaskList(res.data.items);
        }).catch((error) => {
            toast.error(error.response.data);
        })
    }

    useEffect(() => {
        fetchTodayTasks();
    }, [])

    return (
        <div>
            <NewTaskForm onSuccess={fetchTodayTasks} />

            <div className={"mt-10"}>
                <TaskList taskList={taskList} onChange={fetchTodayTasks} />
            </div>
        </div>
    )

}

export default TodayTaskList