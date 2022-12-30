import { Formik, Form, Field } from 'formik';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import { emailReg } from '../../util/regExp'
import { submitContactData } from '../../api/contact';

export interface IContactFields {
    firstNames: string
    lastNames: string
    location: string
    email: string
    reason: string
    content: string
}


const ContactForm = () => (
    <div className='sm:px-16 md:px-24 lg:px-0'>
        <Formik
            initialValues={
                {
                    firstNames: '',
                    lastNames: '',
                    location: '',
                    email: '',
                    reason: '',
                    content: ''
                }
            }

            validate={values => {
                const errors = {} as IContactFields
                if (!values.firstNames) errors.firstNames = "Los nombres son requeridos"
                if (!values.lastNames) errors.lastNames = "Los apellidos son requeridos"
                if (!values.location) errors.location = "La ciudad es requerida"
                if (!values.reason) errors.reason = "Necesitas un motivo de consulta"
                if (!values.content) errors.content = "La descripción es requerida"
                if (!values.email) errors.email = "EL correo electrónico es requerido"
                else if (!emailReg.test(values.email)) errors.email = "Correo electrónico invalido"


                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                const res = await submitContactData(values)
                setSubmitting(false)
            }}
        >
            {({
                errors, isSubmitting
            }) => (
                <Form>
                    <Field
                        type="text"
                        name="firstNames"
                        placeholder="Nombres"
                        component={Input}
                    />

                    <Field
                        type="text"
                        name="lastNames"
                        placeholder="Apellidos"
                        component={Input}
                    />
                    <Field
                        type="text"
                        name="location"
                        placeholder="Ciudad"
                        component={Input}
                    />
                    <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        component={Input}
                    />
                    <Field
                        type="text"
                        name="reason"
                        placeholder="Motivo"
                        component={Input}
                    />
                    <Field
                        type="text"
                        as="textarea"
                        name="content"
                        placeholder="Descripción"
                        component={Textarea}
                    />

                    <div className='flex items-center justify-center'>
                        <button
                            disabled={Object.values(errors).some(v => v)}
                            className={`relative overflow-hidden mt-6 flex gap-2 items-center justify-between text-white bg-primary hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800 shadow-md cursor-pointer disabled:after:absolute disabled:after:inset-0 disabled:after:bg-white/25 disabled:cursor-not-allowed`}
                            type="submit">
                            {isSubmitting ?
                                <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> :
                                <>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    Enviar
                                </>}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
);

export default ContactForm;