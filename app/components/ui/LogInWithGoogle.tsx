"use client"

import styles from "../../styles/ui/googleLogIn.module.scss";

import {FcGoogle} from "react-icons/fc";

interface LogInWithGoogleProps {
    onClick: () => void,
    disabled?: boolean
}

const LogInWithGoogle = ({onClick, disabled}: LogInWithGoogleProps) => {
    return (
        <div onClick={onClick} className={`${styles.container} ${disabled ? styles.disabled : styles.enabled}`}>
            <FcGoogle size={25} className={styles.icon}/>
            <p className={styles.label}>Accedi con Google</p>
        </div>
    )
}

export default LogInWithGoogle