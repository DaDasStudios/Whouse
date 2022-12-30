
interface Props {
    displayed: boolean
    setDisplayed(state: boolean): void
}

const Gradient = ({ displayed, setDisplayed}: Props) => {
    return (
        <span className={`pointer-events-none inset-0 absolute ${localStorage.theme == "dark" ? "testimonials-gradient-dark" : "testimonials-gradient"}`}>
            <button
                onClick={() => setDisplayed(!displayed)}
                className='bg-slate-900 hover:bg-slate-800 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm text-white font-semibold px-5 py-3 cursor-pointer z-20 absolute bottom-4 left-1/2 right-1/2 -translate-x-1/2 min-w-max pointer-events-auto'
            >{displayed ? "Okey, capté el punto" : "Mostrar más..."}
            </button>
        </span>
    )
}

export default Gradient