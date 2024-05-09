"use client"

import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import Label from "@/app/components/input/Label";
import styles from "../../styles/input/textarea.module.scss";

interface InputProps {
    id: string
    label: string,
    placeholder?: string,
    rows?: number,
    required?: boolean,
    register?: UseFormRegister<FieldValues>,
    errors?: FieldErrors,
    disabled?: boolean,
}

const TextArea = ({id, label, placeholder, rows = 3, required, register, errors, disabled}: InputProps) => {
    return (
        <Label label={label} required={required}>
            <textarea placeholder={placeholder} disabled={disabled} rows={rows} {...(register && register(id, {required: required}))} className={`${styles.textarea} ${errors && errors[id] && ""}`}/>
        </Label>
    )
}

export default TextArea