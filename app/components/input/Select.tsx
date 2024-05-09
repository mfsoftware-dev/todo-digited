"use client"

import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import Label from "@/app/components/input/Label";

interface SelectItem {
    label: string,
    value: string | number
}

interface SelectProps {
    id: string
    label: string,
    items: SelectItem[],
    value?: string | number,
    required?: boolean,
    register?: UseFormRegister<FieldValues>,
    errors?: FieldErrors,
    disabled?: boolean,
    enableClear?: boolean
}

const Select = ({id, label, items, value, required, register, errors, disabled, enableClear}: SelectProps) => {
    return (
        <Label label={label} required={required}>
            <select value={value} disabled={disabled} {...(register && register(id, {required: required}))} className={`border border-gray-100 text-sm px-3 py-2 rounded-md hover:border-blue-500 outline-none focus:shadow-md focus:border-blue-500 transition ${errors && errors[id] && ""}`}>
                {enableClear && <option value={""}>Seleziona...</option>}
                {items.map((item) => {
                    return (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    )
                })}
            </select>
        </Label>
    )
}

export default Select