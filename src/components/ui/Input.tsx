import type { InputProps } from "../../interfaces/InputProps"
import type { IContactFields } from "../Contact/Form"


const Input = ({ field, form, ...props }: InputProps) => {
    const key = field.name as keyof IContactFields
    return (<div className="first:mt-0 mt-6">
        <input
            {...field} {...props}
            className={`text-sm rounded-lg  block w-full p-2.5 ${form.errors[key] && form.touched[key] ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}`}
            required={true}
        >
        </input>
        {form.errors[key] && form.touched[key] ? <p
            className="mt-2 text-sm text-red-600 dark:text-red-500"
        >
            {form.errors[key]}
        </p> : null}

    </div>
    )
}

export default Input