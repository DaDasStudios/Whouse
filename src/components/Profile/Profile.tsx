import { useState, useEffect } from 'react'
import { Field, Formik, Form } from 'formik'
import { gql } from 'graphql-request'
import Toastify from 'toastify-js'
import Popover from '../ui/Popover'
import Input from '../ui/Input'
import { client } from '../../api/client'
import { updateUser, deleteUser } from '../../api/profile'
import type { IUser } from '../../interfaces/User'
import { dangerToast, successToast } from '../../util/toastClasses'
import { emailReg } from '../../util/regExp'
import Rate from './Rate'


const GET_USER = gql`
{
    userToken {
        _id
        username
        email 
        occupation
        imageUrl
        createdAt
        updatedAt
    }
}
`

export interface IProfile {
    username: string
    email: string
    imageUrl?: string
    occupation: string
}


function logout() {
    localStorage.removeItem("x-access-token")
    window.location.assign("/")
}

async function deleteAccount(email: string, id: string) {
    const userRes = prompt("¿Estás seguro de eliminar tu cuenta? Escribe tu email para continuar", "")
    if (userRes === email) {
        try {
            const res = await deleteUser(id) as { deleteUser: IUser }
            if (res.deleteUser._id) {
                localStorage.removeItem("x-access-token")
                window.location.assign("/")
            }
        } catch (err) {
            Toastify({
                text: `⛔ Ups... Algo salió mal, intenta de nuevo`,
                duration: 5000,
                gravity: "bottom",
                className: dangerToast,
                stopOnFocus: true
            }).showToast()
        }
    }
}

const Profile = () => {
    const [user, setUser] = useState({} as IUser)
    const [mouseOverImage, setMouseOverImage] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("x-access-token"))

    useEffect(() => {
        if (user._id) {
            Toastify({
                text: `🎉 Bienvenido de vuelta ${user.username}`,
                duration: 5000,
                gravity: "bottom",
                className: successToast,
                stopOnFocus: true
            }).showToast()
        }

    }, [user])

    useEffect(() => {
        (async function () {
            if (!localStorage.getItem("x-access-token")) window.location.assign("/signin")

            try {
                const res = await client.request(GET_USER, undefined, {
                    "x-access-token": token || ""
                }) as { userToken: IUser }
                if (res.userToken) setUser(res.userToken)
                else window.location.assign("/signin")
            } catch (error: any) {
                window.location.assign("/signin")
            }
        })()
    }, [localStorage.getItem("x-access-token")])

    return (
        <div>
            <div>
                {user._id ? (
                    <>
                        <Formik<IProfile>
                            initialValues={{
                                email: user.email,
                                username: user.username,
                                imageUrl: user.imageUrl,
                                occupation: user.occupation
                            }}

                            validate={({ username, email, occupation }) => {
                                const errors = {} as IProfile
                                if (!username) errors.username = "No puedes quitarte el nombre"
                                if (!email) errors.email = "No puedes quitarte el correo electrónico"
                                if (!occupation) errors.occupation = "No puedes quitarte tu ocupación"
                                if (!emailReg.test(email)) errors.email = "Correo electrónico inválido"
                                return errors
                            }}

                            onSubmit={async (values) => {
                                try {
                                    const res = await updateUser(user._id, values) as { updateUser: IUser }
                                    if (res.updateUser) window.location.reload()
                                } catch (err) {
                                    Toastify({
                                        text: `⛔ Ups... Algo salió mal, intenta de nuevo`,
                                        duration: 5000,
                                        gravity: "bottom",
                                        className: dangerToast,
                                        stopOnFocus: true
                                    }).showToast()
                                }
                            }}
                        >
                            {({ errors, isSubmitting, values }) => (
                                <Form>
                                    <div className='flex items-center justify-center mb-3'>
                                        {user.imageUrl ? (
                                            <div className='relative mb-8 sm:mb-4'>
                                                <img
                                                    className="inline-block aspect-square w-28 rounded-full shadow-md"
                                                    src={user.imageUrl}
                                                    alt={`${user.username} imagen`} />
                                                <Popover
                                                    content={user.username}
                                                    show={true}
                                                    className='-bottom-7 left-1/2 right-1/2 -translate-x-1/2'
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className='relative'
                                                onMouseLeave={() => setMouseOverImage(false)}
                                                onMouseEnter={() => setMouseOverImage(true)}
                                            >

                                                <svg className="block text-slate-600 rounded-md  md:p-0 dark:text-gray-400 w-16 h-16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeWidth={1} strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <Popover
                                                    content='No tienes foto de perfil'
                                                    className='-bottom-5 left-1/2 right-1/2 -translate-x-1/2'
                                                    show={mouseOverImage}
                                                />
                                            </div>

                                        )}
                                    </div>
                                    <h3 className='text-base font-semibold text-gray-600 dark:text-gray-300 max-md:mb-4'>Tu información</h3>
                                    <div className='grid md:grid-cols-2 items-baseline gap-x-5'>
                                        <Field
                                            type="text"
                                            name="username"
                                            placeholder="Nombre completo"
                                            component={Input}
                                            required={false}
                                        />
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            component={Input}
                                            required={false}
                                        />
                                        <Field
                                            type="text"
                                            name="occupation"
                                            placeholder="Ocupación"
                                            component={Input}
                                            required={false}
                                        />
                                        <Field
                                            type="text"
                                            name="imageUrl"
                                            placeholder="URL de foto de perfil"
                                            component={Input}
                                            required={false}
                                        />
                                    </div>
                                    <div className='flex justify-end items-center gap-4 my-6'>
                                        <button
                                            className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md shadow-md font-semibold text-sm flex gap-2 items-center justify-center ring-1 ring-slate-900/5 disabled:cursor-not-allowed'
                                            disabled={isSubmitting}
                                            type="submit"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className='w-6 h-6 animate-spin' fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    <p className='max-md:hidden'>Guardando</p>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className='w-6 h-6' fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                                    </svg>
                                                    <p className='max-md:hidden'>Guardar</p>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={logout}
                                            type="button"
                                            className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md shadow-md font-semibold text-sm flex whitespace-nowrap gap-2 items-center justify-center ring-1 ring-slate-900/5'
                                        >
                                            <svg className='w-6 h-6 ' fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <p className='max-md:hidden'>Cerrar sesión</p>
                                        </button>
                                        <button
                                            onClick={() => deleteAccount(user.email, user._id)}
                                            type="button"
                                            className='bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md shadow-md font-semibold text-sm flex whitespace-nowrap gap-2 items-center justify-center ring-1 ring-slate-900/5'
                                        >
                                            <svg className='w-6 h-6' fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <p className='max-md:hidden'>Borrar cuenta</p>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <Rate canRate={Boolean(user.email && user.occupation && user.username && user.imageUrl && user._id)} />
                    </>
                ) : (
                    <div className='flex items-center justify-center text-slate-600 dark:text-gray-400 mt-8'>
                        <svg className='w-24 h-24 animate-spin' fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile