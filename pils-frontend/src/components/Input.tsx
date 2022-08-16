type InputProps = {
    label: string
    placeholder?: string
    value: string | number
    onChange: (value: string)=>void
    type?: "text" | "number"
};
export const Input = ({label, placeholder, value, onChange, type="text"}: InputProps) => {
    return <div className="mb-1">
        <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {label}
            <input type={type}
                   value={value}
                   step={0.1}
                   onChange={(ev)=>onChange(ev.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder={placeholder}/>
        </label>

    </div>
};