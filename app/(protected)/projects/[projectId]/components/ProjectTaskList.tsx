"use client"

import {Project, Task} from "@prisma/client";
import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import NewTaskForm from "@/app/(protected)/components/NewTaskForm";
import TaskList from "@/app/(protected)/components/TaskList";

interface ProjectTaskListProps {
    project: Project
}

const ProjectTaskList = ({project}: ProjectTaskListProps) => {

    const [taskList, setTaskList] = useState<Task[]>([]);

    const fetchProjectTasks = async () => {
        axios.get(`/api/projects/${project.id}/tasks`).then((res) => {
            if(res.status !== 200) return setTaskList([]);
            setTaskList(res.data.items);
        }).catch((error) => {
            toast.error(error.response.data);
        })
    }

    useEffect(() => {
        fetchProjectTasks();
    }, []);
    
    return (
        <div>
            <NewTaskForm projectId={project.id} onSuccess={fetchProjectTasks}/>
            
            <div className={"mt-10"}>
                <TaskList taskList={taskList} onChange={fetchProjectTasks}/>
            </div>
        </div>
    )
}

export default ProjectTaskList