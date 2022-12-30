import { useId } from 'react'

interface Props {
    icon: React.ReactElement,
    offertName: string,
    discount: number,
    description: string,
    content: string[],
    warning: string,
    btnUrl: string
}

export default function Card(props: Props) {
    const { icon, offertName, discount, description, content, warning, btnUrl } = props
    const uuId = useId()
    return (
        <li className="bg-white overflow-hidden dark:bg-dark-secondary rounded-lg shadow-md hover:scale-105 transition-transform">
            <div className="bg-sky-50 dark:bg-dark-terciary flex flex-col items-center justify-center p-4 border-b border-sky-900/30 dark:border-slate-200/50 gap-2 text-2xl font-semibold tracking-tight text-sky-700 dark:text-slate-300">
                {icon}
                <h3>{offertName}</h3>
            </div>
            <div className="p-4 text-center">
                <p className="text-slate-800 dark:text-slate-300 mt-2">{description}</p>
                <h2 className="uppercase font-bold my-8 text-sky-800/90 dark:text-slate-300 text-4xl">{discount}% de descuento</h2>
                <ul>
                    {content.map(e => (
                        <li key={uuId + e[0]} className="mb-1 text-slate-700 dark:text-slate-300">{e}</li>
                    ))}
                </ul>
                <p className="text-sky-800 dark:text-slate-200 flex gap-2 items-center justify-center my-6 font-medium">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    {warning}
                </p>
            </div>
            <a className="block w-full py-5 text-xl font-semibold text-sky-700 dark:text-slate-300 hover:bg-sky-100 dark:bg-dark-terciary hover:text-sky-800 dark:hover:text-slate-200 dark:hover:bg-gray-600 text-center bg-sky-50 border-t border-t-sky-900/30 dark:border-slate-200/50 tracking-tight" href={btnUrl}>Obtener</a>
        </li>
    )
}


