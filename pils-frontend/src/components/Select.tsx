import {useId} from "react";

type SelectProps = {
    label: string
    options: { value: string, label: string }[]
    value: string | null
    onChange: (value: string) => void
    emptyOption?:boolean
};
export const Select = ({label, options, value, onChange, emptyOption=true}: SelectProps) => {
    const id = useId()
    return <>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{label}</label>
        <select id={id}
                onChange={(e) => onChange(e.target.value)}
                value={value || ""}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {emptyOption && <option value="">Ikke valgt</option>}
            {options.map((option) => {
                return <option key={option.value}
                               value={option.value}>{option.label}</option>
            })}
        </select>

    </>;
};