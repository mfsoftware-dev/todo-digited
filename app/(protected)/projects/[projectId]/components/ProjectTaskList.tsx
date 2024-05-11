"use client"

import {Project, Task} from "@prisma/client";
import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import NewTaskForm from "@/app/(protected)/components/NewTaskForm";
import TaskList from "@/app/(protected)/components/TaskList";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import Spinner from "@/app/components/ui/Spinner";

interface ProjectTaskListProps {
    project: Project
}

const ProjectTaskList = ({project}: ProjectTaskListProps) => {
    
    const fetchProjectTasks = async () => {
        return await axios.get(`/api/projects/${project.id}/tasks`);
    }

    const { data: res, isLoading, refetch } = useQuery({queryKey: ["projectTasks"], queryFn: fetchProjectTasks});

    useEffect(() => {
        fetchProjectTasks();
    }, []);
    
    return (
        <div>
            <NewTaskForm projectId={project.id} onSuccess={refetch}/>
            
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

export default ProjectTaskList