"use client"

import {TaskPriority} from "@prisma/client";
import {taskPriorityColor, taskPriorityLabel} from "@/app/helpers/taskPriority";
import styles from "../../styles/ui/taskPriorityTag.module.scss"

interface TaskPriorityTagProps {
    priority: TaskPriority,
}

const TaskPriorityTag = ({priority}: TaskPriorityTagProps) => {
    return (
        <div key={priority} className={styles.container} style={{backgroundColor: taskPriorityColor(priority)}}>
            <span className={styles.label}>{taskPriorityLabel(priority)}</span>
        </div>
    )
}

export default TaskPriorityTag