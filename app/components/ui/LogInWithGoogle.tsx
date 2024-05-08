"use client"

import {FcGoogle} from "react-icons/fc";

interface LogInWithGoogleProps {
    onClick: () => void,
    disabled?: boolean
}

const LogInWithGoogle = ({onClick, disabled}: LogInWithGoogleProps) => {
    return (
        <div onClick={onClick} className={`mt-5 rounded-full bg-white border hover:scale-105 hover:shadow-md flex space-x-3 items-center justify-center px-4 py-2 transition ${disabled ? "cursor-not-allowed opacity-95" : "cursor-pointer opacity-100"}`}>
            <FcGoogle size={25}/>
            <p className={"text-sm font-semibold"}>Accedi con Google</p>
        </div>
    )
}

export default LogInWithGoogle