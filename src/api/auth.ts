import type { ISignInFields } from "../components/Auth/SignInForm"
import type { ISignUpFields } from "../components/Auth/SignUpForm"

export const submitSignUpData = async (values: ISignUpFields) => {
    await setTimeout(() => {
        console.log(values)
    }, 2000)
    return values
}

export const submitSignInData = async (values: ISignInFields) => {
    await setTimeout(() => {
        console.log(values)
    }, 2000)
    return values
}