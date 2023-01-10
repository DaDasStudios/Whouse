import { Field, Formik, Form } from 'formik'
import Textarea from '../ui/Textarea'
import { submitRate } from '../../api/testimonials'
import type { IRate } from '../../interfaces/Rate'
import Toastify from 'toastify-js'
import { dangerToast, successToast } from '../../util/toastClasses'

interface IFormRate {
    testimonial: string
}

interface IProps {
    canRate: Boolean
}

const Rate = ({ canRate }: IProps) => {
    return (
        <div>
            <h3 className='text-base font-semibold text-gray-600 dark:text-gray-300 max-md:mb-4'>Cuéntanos tu experiencia con nosotros</h3>
            <p className='my-3 text-muted dark:text-dark-muted'>Tu testimonio aparecerá en la página principal, necesitas tener todos los datos de tu cuenta llenos para realizar esta acción. Si ya has creado uno, se actualizará.</p>
            <Formik<IFormRate>
                initialValues={{
                    testimonial: '',
                }}

                onSubmit={ async ({ testimonial }) => {
                    try {
                        const res = await submitRate(testimonial) as { submitRate: IRate }
                        if (res.submitRate) {
                            Toastify({
                                text: `✅ Ahora tu testimonio será mostrado en la página principal`,
                                duration: 5000,
                                gravity: "bottom",
                                className: successToast,
                                stopOnFocus: true
                            }).showToast()
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
                }}

                validate={({ testimonial }) => {
                    const errors = {} as IFormRate

                    if (!testimonial) {
                        errors.testimonial = 'Necesitas escribir tu testimonio'
                    }

                    if (testimonial.length > 70 || testimonial.length < 30) errors.testimonial = "Máximo 70 y mínimo 30 carácteres"

                    return errors
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            type='text'
                            name="testimonial"
                            placeholder="Testomonio"
                            component={Textarea}
                            required={true}
                            maxLength={70}
                            minLength={30}
                        />
                        <div className='flex gap-2 items-center justify-end'>
                            <button
                                className='bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-md shadow-md font-semibold text-sm flex gap-2 items-center ring-1 ring-slate-900/5 mt-6 disabled:cursor-not-allowed disabled:bg-amber-400'
                                type="submit"
                                disabled={!canRate}  
                            >
                                <svg className='w-6 h-6' fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <p className='max-md:hidden'>Calificar</p>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Rate