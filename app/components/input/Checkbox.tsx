"use client"

import styles from "../../styles/input/checkbox.module.scss";

import { Checkbox as HUICheckbox } from "@headlessui/react";

interface CheckboxProps {
    label: string,
    value: boolean,
    onChange: (value: boolean) => void,
}

const Checkbox = ({label, value, onChange}: CheckboxProps) => {
    return (
        <div className={styles.container}>
            <HUICheckbox checked={value} onChange={onChange} className={`${styles.checkbox} group data-[checked]:bg-blue-500`}>
                <svg className={"group-data-[checked]:opacity-100"} viewBox={"0 0 14 14"} fill={"none"}>
                    <path d={"M3 8L6 11L11 3.5"} strokeWidth={2} strokeLinecap={"round"} strokeLinejoin={"round"}/>
                </svg>
            </HUICheckbox>
            <p className={styles.label}>{label}</p>
        </div>
    )
}

export default Checkbox