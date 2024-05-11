"use client"

import axios from "axios";
import {useEffect} from "react";
import NewTaskForm from "@/app/(protected)/components/NewTaskForm";
import TaskList from "@/app/(protected)/components/TaskList";
import {useQuery} from "@tanstack/react-query";
import Spinner from "@/app/components/ui/Spinner";

const UpcomingTaskList = () => {
    
    const fetchUpcomingTasks = async () => {
        return await axios.get("/api/tasks/upcoming");
    }

    const { data: res, isLoading, refetch } = useQuery({queryKey: ["upcomingTasks"], queryFn: fetchUpcomingTasks});
    
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

export default UpcomingTaskList