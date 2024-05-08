"use client"

import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import Label from "@/app/components/input/Label";

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
            <textarea placeholder={placeholder} disabled={disabled} rows={rows} {...(register && register(id, {required: required}))} className={`border border-gray-100 text-sm px-3 py-2 rounded-md hover:border-blue-500 outline-none focus:shadow-md focus:border-blue-500 transition ${errors && errors[id] && ""}`}/>
        </Label>
    )
}

export default TextArea