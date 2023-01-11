import { useState, useEffect } from 'react'
import Toastify from "toastify-js"
import { Dropdown } from "../ui/Dropdown";
import ThemeButton from "./ThemeButton";
import Element from "./Element";
import { gql } from "graphql-request"
import { client } from "../../api/client"
import { warningToast } from "../../util/toastClasses"
import type { IUser } from "../../interfaces/User"
import Popover from '../ui/Popover';

const GET_USER = gql`
	{
		userToken {
			_id
			username
			email
			imageUrl
			occupation
		}
	}
`
export default function Elements() {
	const [user, setUser] = useState({} as IUser)
	const [mouseOver, setMouseOver] = useState(false)

	useEffect(() => {
		(
			async () => {
				const token = localStorage.getItem("x-access-token")
				if (token) {
					try {
						const res = (await client.request(GET_USER, undefined, {
							"x-access-token": token,
						})) as { userToken: IUser }
						setUser(res.userToken || {})
					} catch (error) {
						Toastify({
							text: "⚠️ Inicia sesión de nuevo",
							duration: 5000,
							stopOnFocus: true,
							gravity: "bottom",
							className: warningToast
						}).showToast()
					}
				}
			}
		)()
	}, [localStorage.getItem("x-access-token")])
	return (
		<ul
			className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center"
		>
			<Element content="Inicio" />
			<li>
				<button
					
					id="services-trigger"
					className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
				>Servicios <svg
					className="w-5 h-5 ml-1"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				><path
					fillRule="evenodd"
					strokeWidth="2"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clipRule="evenodd"></path>
					</svg>
				</button>
			</li>
			<Element href="/offers" content="Ofertas especiales" />
			<Element href="/contact" content="Contacto" />
			<li>
				{user._id ? (
					<a
						href='/profile'
						className='block cursor-pointer relative'
						onMouseEnter={() => setMouseOver(true)}
						onMouseLeave={() => setMouseOver(false)}
					>
						{user.imageUrl ? (
							<img
								className="inline-block aspect-square w-12 rounded-full shadow-md"
								src={user.imageUrl}
								alt={`${user.username} imagen`}
							/>
						) : (
							<svg className="block text-gray-700 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
								<path strokeLinecap="round" strokeWidth={2} strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						)}
						<Popover
							content='Perfil'
							show={mouseOver}
							className='left-1/2 right-1/2 -translate-x-1/2'
						/>
					</a>
				) : (
					<Dropdown
						heading={"Cuenta"}
						elements={[
							{ href: "/signup", content: "Registrarse" },
							{ href: "/signin", content: "Iniciar sesión" },
						]}
					/>
				)}
			</li>
			<li>
				<ThemeButton />
			</li>
		</ul>
	)
}