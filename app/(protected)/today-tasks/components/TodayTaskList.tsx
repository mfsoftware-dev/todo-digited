"use client"

import axios from "axios";
import {useEffect, useState} from "react";
import {Task} from "@prisma/client";
import NewTaskForm from "@/app/(protected)/components/NewTaskForm";
import {toast} from "react-hot-toast";
import TaskList from "@/app/(protected)/components/TaskList";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import Spinner from "@/app/components/ui/Spinner";

const TodayTaskList = () => {

    const [taskList, setTaskList] = useState<Task[]>([]);

    const fetchTodayTasks = async () => {
        return await axios.get("/api/tasks/today");
    }

    const { data: res, isLoading, refetch } = useQuery({queryKey: ["todayTasks"], queryFn: fetchTodayTasks});

    useEffect(() => {
        fetchTodayTasks();
    }, [])

    return (
        <div>
            <NewTaskForm onSuccess={refetch}/>

            <div className={"mt-10"}>
                {isLoading ? (
                    <Spinner message={"Recupero i task..."}/>
                ) : (
                    <>
                        {res && res.data.items && (<TaskList taskList={res.data.items} onChange={refetch}/>)}
                    </>
                )}
            </div>
        </div>
    )

}

export default TodayTaskList