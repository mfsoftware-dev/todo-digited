"use client"

import axios from "axios";
import {useEffect, useState} from "react";
import {Task} from "@prisma/client";
import {toast} from "react-hot-toast";
import TaskList from "@/app/(protected)/components/TaskList";

const OldTaskList = () => {

    const [taskList, setTaskList] = useState<Task[]>([]);

    const fetchOldTasks = async () => {
        axios.get("/api/tasks/old").then((res) => {
            if(res.status !== 200) return setTaskList([]);
            setTaskList(res.data.items);
        }).catch((error) => {
            toast.error(error.response.data);
        })
    }

    useEffect(() => {
        fetchOldTasks();
    }, [])

    return (
        <div className={"mt-10"}>
            <TaskList taskList={taskList} onChange={fetchOldTasks}/>
        </div>
    )

}

export default OldTaskList