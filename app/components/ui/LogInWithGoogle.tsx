"use client"

import sharedStyles from "@/app/styles/ui/shared.module.scss";
import styles from "@/app/styles/ui/LogInWithGoogle.module.scss";

import {FcGoogle} from "react-icons/fc";

interface LogInWithGoogleProps {
    onClick: () => void,
    disabled: boolean
}

const LogInWithGoogle = ({onClick, disabled}: LogInWithGoogleProps) => {
    return (
        <div onClick={onClick} className={`${styles.container} ${disabled ? sharedStyles.disabled : sharedStyles.enabled}`}>
            <FcGoogle size={25}/>
            <p>Accedi con Google</p>
        </div>
    )
}

export default LogInWithGoogle