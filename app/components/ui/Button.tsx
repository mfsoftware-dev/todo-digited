"use client"

import React from "react";

import styles from "./../../styles/ui/button.module.scss";

export enum ButtonType {
    PRIMARY = "#3b82f6",
    SECONDARY = "#f4f4f4",
    DANGER = "#9B1616"
}

interface ButtonProps {
    children: React.ReactNode,
    type?: ButtonType,
    htmlType?: "button" | "submit",
    onClick?: () => void,
    disabled?: boolean
}

const Button = ({children, type = ButtonType.PRIMARY, htmlType = "button", onClick, disabled = false}: ButtonProps) => {
    return (
        <button disabled={disabled} onClick={onClick} type={htmlType} className={`${styles.container} ${type === ButtonType.SECONDARY ? styles.secondary : styles.primary} ${disabled && styles.disabled}`} style={{backgroundColor: type}}>
            {children}
        </button>
    )
}

export default Button