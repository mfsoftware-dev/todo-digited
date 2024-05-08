import {FormEvent, useState} from "react";
import {IoIosAdd} from "react-icons/io";
import axios from "axios";
import {toast} from "react-hot-toast";

interface NewTaskFormProps {
    projectId?: string,
    onSuccess: () => void,
}

const NewTaskForm = ({projectId, onSuccess}: NewTaskFormProps) => {
    
    const [taskName, setTaskName] = useState("");

    const addNewTask = (event?: FormEvent<HTMLFormElement>) => {
        if(!taskName) return;
        
        if(event) event.preventDefault();

        axios.post("/api/tasks", {name: taskName, projectId: projectId}).then((res) => {
            if(res.status !== 200) return toast.error(res.statusText);
            toast.success(res.data.message);
            onSuccess();
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => {
            setTaskName("");
        })
    }
    
    return (
        <div className={"w-full rounded-md border px-4 py-3 bg-white hover:border-blue-500 hover:shadow-md transition"}>
            <div className={"flex space-x-3 items-center w-full"}>
                <div className={"hover:scale-125 hover:text-blue-500 transition cursor-pointer"} onClick={() => addNewTask()}>
                    <IoIosAdd size={20}/>
                </div>
                <form onSubmit={addNewTask} className={"flex-grow"}>
                    <input type={"text"} className={"w-full outline-none"} placeholder={"Aggiungi un nuovo task..."} value={taskName} onChange={(event) => setTaskName(event.target.value)}/>
                </form>
            </div>
        </div>
    )
}

export default NewTaskForm