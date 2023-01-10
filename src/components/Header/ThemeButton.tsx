import Moon from "../../components/Icons/Moon";
import Sun from "../Icons/Sun";
import { useState } from 'react'
import Popover from '../ui/Popover'

function ThemeButton() {
	const [mouseOver, setMouseOver] = useState(false)
	const [theme, setTheme] = useState(localStorage.theme as string)
	return (
		<>
			<button
				data-popover-target="theme-popover"
				onMouseEnter={() => setMouseOver(true)}
				onMouseLeave={() => setMouseOver(false)}
				onClick={() => {
					if (theme == "dark") {
						setTheme("light")
						localStorage.theme = "light"
					}
					else {
						setTheme("dark")
						localStorage.theme = "dark"
					}
					location.reload()
				}}
				className="block py-2 pl-3 pr-4 text-gray-700 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 relative"
			>
				{theme == "dark" ? <Sun className="text-current w-8" /> : <Moon className="text-current w-8" />}
				<Popover 
					content={`Alternar tema a ${theme == "dark" ? "claro" : "oscuro"}`} 
					show={mouseOver}
					className='left-1/2 right-1/2 -translate-x-1/2'
				/>
			</button>
		</>
	);
}

export default ThemeButton