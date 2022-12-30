import type { IContactFields } from "../components/Contact/Form"

export const submitContactData = async (values: IContactFields) => {
    await setTimeout(() => {
        console.log(values)
    }, 2000)
    return values
}