import { useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import Input from '../ui/Input';
import { emailReg } from '../../util/regExp'
import { signUp } from '../../api/auth';
import Toastify from 'toastify-js'
import { dangerToast, successToast, warningToast } from '../../util/toastClasses';

export interface ISignUpFields {
    username: string
    email: string
    password: string
    confirmPassword: string
    imageUrl: string
    occupation: string
}

const SignUpForm = () => {
    useEffect(() => {
        if (localStorage.getItem('x-access-token')) window.location.assign("/profile")
    })
    return (
        <div className='sm:px-16 md:px-24 lg:px-0'>
            <Formik
                initialValues={
                    {
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        imageUrl: '',
                        occupation: ''
                    }
                }

                validate={values => {
                    const errors = {} as ISignUpFields
                    if (!values.username) errors.username = "El apodo es requerido"
                    if (!values.email) errors.email = "La correo electrónico es requerido"
                    if (!values.password) errors.password = "Necesitas una contraseña"
                    if (!values.confirmPassword) errors.confirmPassword = "Necesitas confirmar la contraseña"
                    else if (!emailReg.test(values.email)) errors.email = "Correo electrónico invalido"
                    if (values.password && values.confirmPassword && values.confirmPassword !== values.password) errors.confirmPassword = "Las contraseñas deben ser iguales"

                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const res = await signUp(values) as { signUp: string }
                        if (res.signUp) setSubmitting(false)
                        localStorage.setItem("x-access-token", res.signUp)
                        Toastify({
                            text: "✅ Has sido registrado satisfactoriamente",
                            stopOnFocus: true,
                            duration: 5000,
                            gravity: "bottom",
                            className: successToast
                        }).showToast()
                    } catch (error: any) {
                        localStorage.removeItem("x-access-token")
                        Toastify({
                            text: "⛔ Ups... Algo está mal con la información proporcionada",
                            stopOnFocus: true,
                            duration: 5000,
                            gravity: "bottom",
                            className: dangerToast
                        }).showToast()
                        Toastify({
                            text: "⚠️ Es posible que ya estés registrado, intenta con otro email",
                            stopOnFocus: true,
                            duration: 5000,
                            gravity: "bottom",
                            className: warningToast
                        }).showToast()
                    }
                }}
            >
                {({
                    errors, isSubmitting
                }) => (
                    <Form>
                        <Field
                            type="text"
                            name="username"
                            placeholder="Nombre completo"
                            component={Input}
                            required={true}
                        />
                        <Field
                            type="email"
                            name="email"
                            placeholder="Email"
                            component={Input}
                            required={true}
                        />
                        <Field
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            component={Input}
                            required={true}
                        />
                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            component={Input}
                            required={true}
                        />

                        <Field
                            type="text"
                            name="occupation"
                            placeholder="Ocupación"
                            component={Input}
                            required={true}
                        />

                        <Field
                            type="text"
                            name="imageUrl"
                            placeholder="URL de foto de perfil (opcional)"
                            component={Input}
                            required={false}
                        />
                        <div className='flex items-center justify-center'>
                            <button
                                disabled={Object.values(errors).some(v => v)}
                                className={`relative overflow-hidden mt-6 flex gap-2 items-center justify-between text-white bg-primary hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800 shadow-md cursor-pointer disabled:after:absolute disabled:after:inset-0 disabled:after:bg-white/25 disabled:cursor-not-allowed`}
                                type="submit">
                                {isSubmitting ?
                                    <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> :
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                        Subir
                                    </>}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm