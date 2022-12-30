import { Formik, Form, Field } from 'formik';
import Input from '../ui/Input';
import { emailReg } from '../../util/regExp'
import { submitSignUpData } from '../../api/auth';

export interface ISignUpFields {
    username: string
    realName: string
    email: string
    password: string
    confirmPassword: string
}

const SignUpForm = () => {
    return (
        <div className='sm:px-16 md:px-24 lg:px-0'>
            <Formik
                initialValues={
                    {
                        username: '',
                        realName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }
                }

                validate={values => {
                    const errors = {} as ISignUpFields
                    if (!values.username) errors.username = "El apodo es requerido"
                    if (!values.realName) errors.realName = "El nombre completo es requerido"
                    if (!values.email) errors.email = "La correo electrónico es requerido"
                    if (!values.password) errors.password = "Necesitas una contraseña"
                    if (!values.confirmPassword) errors.confirmPassword = "Necesitas confirmar la contraseña"
                    else if (!emailReg.test(values.email)) errors.email = "Correo electrónico invalido"
                    if (values.password && values.confirmPassword && values.confirmPassword !== values.password) errors.confirmPassword = "Las contraseñas deben ser iguales"

                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    submitSignUpData(values)
                    setSubmitting(false)
                }}
            >
                {({
                    errors, isSubmitting
                }) => (
                    <Form>
                        <Field
                            type="text"
                            name="realName"
                            placeholder="Nombre completo"
                            component={Input}
                        />

                        <Field
                            type="text"
                            name="username"
                            placeholder="Apodo"
                            component={Input}
                        />
                        <Field
                            type="email"
                            name="email"
                            placeholder="Email"
                            component={Input}
                        />
                        <Field
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            component={Input}
                        />
                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            component={Input}
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