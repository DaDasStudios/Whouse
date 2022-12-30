import { useState, useId } from "react";

interface Props {
    heading: string;
    elements: Array<{
        href: string
        content: string
    }>
    useDefaultStyle?: boolean
    useIcon?: boolean
    isDisplayed?: boolean
    className?: string
    children?: React.ReactNode
}

export const Dropdown = ({ heading, className, isDisplayed = false, useDefaultStyle = true, useIcon = true, elements, children }: Props) => {
    const [displayed, setDisplayed] = useState(isDisplayed)
    const uniqId = useId()
    return (
        <button
            onClick={() => {
                setDisplayed(!displayed)
            }}

            className={useDefaultStyle ? `relative flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 ${className}` : className}
        >{heading}
            {useIcon && (
                <svg
                    className="w-5 h-5 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                ><path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
            )}
            <div
                onMouseLeave={() => {
                    setDisplayed(false)
                }}
                className={`absolute overflow-hidden left-1/2 right-1/2 -translate-x-1/2  w-44 z-10 -bottom-20 bg-white dark:bg-dark-secondary rounded shadow ring-1 ring-slate-900/5 ${displayed ? "block" : "hidden"}`}>
                <ul>
                    {elements.map(({ href, content }, idx) => (
                        <li key={uniqId + idx}>
                            <a href={href} className="block py-2 px-4 text-sm text-gray-700 text-left dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium whitespace-nowrap">{content}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </button>
    )
}

/*
    if (children) return (
        <div>
            {children}
        </div>
    )
    return (
        <div>
            <ul>
                {elements.map((elem) => (
                    <li>{elem.content}</li>
                ))}
            </ul>
        </div>
    )
*/