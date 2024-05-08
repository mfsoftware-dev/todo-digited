"use client"

import styles from "@/app/styles/input/input.module.scss"

import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import Label from "@/app/components/input/Label";

interface InputProps {
    id: string,
    label: string,
    placeholder?: string,
    type?: "text" | "tel" | "email" | "password" | "date" | "datetime-local",
    required?: boolean,
    register?: UseFormRegister<FieldValues>,
    errors?: FieldErrors,
    disabled?: boolean,
}

const Input = ({id, label, placeholder, type = "text", required, register, errors, disabled}: InputProps) => {
    return (
        <Label label={label} required={required}>
            <input placeholder={placeholder} disabled={disabled} type={type} {...(register && register(id, {required: required}))} className={`${styles.input} ${errors && errors[id] && ""}`}/>
        </Label>
    )
}

export default Input