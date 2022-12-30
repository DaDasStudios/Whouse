import type { ReactNode } from "react"

interface PopoverProps {
    content: string
    show: boolean,
    children?: ReactNode
    className?: string
}

function Popover({ content, show, children, className }: PopoverProps) {
    const showClass = show ? "block" : "hidden"
    if (children) return (<div className={`${showClass}`}>{children}</div>)
    return (
        <div
            className={`absolute z-10 min-w-max text-sm bg-slate-800 dark:bg-gray-700 p-3 font-medium rounded-md text-white ${className} 
            ${showClass}`}
        >
            {content}
            {children}
        </div>
    )
}

export default Popover