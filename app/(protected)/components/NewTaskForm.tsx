import {FormEvent, useState} from "react";
import {IoIosAdd} from "react-icons/io";
import axios from "axios";
import {toast} from "react-hot-toast";
import {AiOutlineLoading} from "react-icons/ai";

interface NewTaskFormProps {
    projectId?: string,
    onSuccess: () => void,
}

const NewTaskForm = ({projectId, onSuccess}: NewTaskFormProps) => {
    
    const [taskName, setTaskName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const addNewTask = (event?: FormEvent<HTMLFormElement>) => {
        if(!taskName) return;
        
        if(event) event.preventDefault();
        
        setIsLoading(true);

        axios.post("/api/tasks", {name: taskName, projectId: projectId}).then((res) => {
            if(res.status !== 200) return toast.error(res.statusText);
            toast.success(res.data.message);
            onSuccess();
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => {
            setTaskName("");
            setIsLoading(false);
        })
    }
    
    return (
        <div className={"w-full rounded-md border px-4 py-1 bg-white hover:border-blue-500 hover:shadow-md transition"}>
            <div className={"flex items-center w-full"}>
                <div className={"hover:scale-125 hover:text-blue-500 transition cursor-pointer"}>
                    {isLoading ? <AiOutlineLoading className={"animate-spin"} size={20}/> : <IoIosAdd size={20} onClick={addNewTask.bind(this, undefined)}/>}
                </div>
                <form onSubmit={addNewTask} className={"flex-grow ms-2"}>
                    <input type={"text"} disabled={isLoading} className={"w-full outline-none py-2 px-4 rounded-md"} placeholder={"Aggiungi un nuovo task..."} value={taskName} onChange={(event) => setTaskName(event.target.value)}/>
                </form>
            </div>
        </div>
    )
}

export default NewTaskForm