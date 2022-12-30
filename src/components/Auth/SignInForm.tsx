import { Formik, Form, Field } from 'formik';
import Input from '../ui/Input';
import { emailReg } from '../../util/regExp'
import { submitSignInData } from '../../api/auth';

export interface ISignInFields {
    email: string
    password: string
}

const SignInForm = () => {
    return (
        <div className='sm:px-16 md:px-24 lg:px-0'>
            <Formik
                initialValues={
                    {
                        email: '',
                        password: '',
                    }
                }

                validate={values => {
                    const errors = {} as ISignInFields
                    if (!values.email) errors.email = "La correo electrónico es requerido"
                    if (!values.password) errors.password = "Necesitas una contraseña"
                    else if (!emailReg.test(values.email)) errors.email = "Correo electrónico invalido"

                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    submitSignInData(values)
                    setSubmitting(false)
                }}
            >
                {({
                    errors, isSubmitting
                }) => (
                    <Form>
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

                        <div className='flex items-center justify-center'>
                            <button
                                disabled={Object.values(errors).some(v => v)}
                                className={`relative overflow-hidden mt-6 flex gap-2 items-center justify-between text-white bg-primary hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800 shadow-md cursor-pointer disabled:after:absolute disabled:after:inset-0 disabled:after:bg-white/25 disabled:cursor-not-allowed`}
                                type="submit">
                                {isSubmitting ?
                                    <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> :
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                                        Continuar
                                    </>}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignInForm