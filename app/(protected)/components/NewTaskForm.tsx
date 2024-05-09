import {FormEvent, useState} from "react";
import {IoIosAdd} from "react-icons/io";
import axios from "axios";
import {toast} from "react-hot-toast";
import {AiOutlineLoading} from "react-icons/ai";
import Select from "@/app/components/input/Select";
import {formattedTaskPriority} from "@/app/helpers/taskPriority";
import {TaskPriority} from "@prisma/client";

interface NewTaskFormProps {
    projectId?: string,
    onSuccess: () => void,
}

const NewTaskForm = ({projectId, onSuccess}: NewTaskFormProps) => {
    
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        name: "",
        priority: TaskPriority.LOW
    })

    const addNewTask = (event?: FormEvent<HTMLFormElement>) => {
        if(!formData.name || !formData.priority) return;
        
        if(event) event.preventDefault();
        
        setIsLoading(true);

        axios.post("/api/tasks", {...formData, projectId: projectId}).then((res) => {
            if(res.status !== 200) return toast.error(res.statusText);
            toast.success(res.data.message);
            onSuccess();
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => {
            setFormData({
                name: "",
                priority: TaskPriority.LOW
            })
            setIsLoading(false);
        })
    }
    
    const setData = (key: string, value: string) => {
        setFormData((current) => ({
            ...current,
            [key]: value
        }))
    }
    
    return (
        <div className={"w-full rounded-md border px-4 py-1 bg-white hover:border-blue-500 hover:shadow-md transition"}>
            <div className={"flex items-center w-full"}>
                <div className={"hover:scale-125 hover:text-blue-500 transition cursor-pointer"}>
                    {isLoading ? <AiOutlineLoading className={"animate-spin"} size={20}/> : <IoIosAdd size={20} onClick={addNewTask.bind(this, undefined)}/>}
                </div>
                <form onSubmit={addNewTask} className={"flex space-x-3 flex-grow ms-2"}>
                    <input type={"text"} disabled={isLoading} className={"w-full outline-none py-2 px-4 rounded-md"} placeholder={"Aggiungi un nuovo task..."} value={formData.name} onChange={(event) => setData("name", event.target.value)}/>
                    <select name={"priority"} value={formData.priority} className={"outline-none"} onChange={(event) => setData("priority", event.target.value)}>
                        {formattedTaskPriority.map((priority) => <option key={priority.value} value={priority.value}>{priority.label}</option>)}
                    </select>
                </form>
            </div>
        </div>
    )
}

export default NewTaskForm