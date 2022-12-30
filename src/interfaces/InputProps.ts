import type { FieldInputProps, FormikProps } from 'formik'
import type { IContactFields } from '../components/Contact/Form'

export interface InputProps {
    field: FieldInputProps<string>
    form: FormikProps<IContactFields>
}