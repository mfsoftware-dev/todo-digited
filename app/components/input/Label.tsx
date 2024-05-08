"use client"

import styles from "./../../styles/input/label.module.scss"

import React from "react";

interface LabelProps {
    label: string,
    required?: boolean,
    children: React.ReactNode
}

const Label = ({label, required, children}: LabelProps) => {
    return (
        <div className={styles.container}>
            <span className={styles.label}>{label}{required && <span className={styles.required}>*</span>}</span>
            {children}
        </div>
    )
}

export default Label