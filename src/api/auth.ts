import type { ISignInFields } from "../components/Auth/SignInForm"
import type { ISignUpFields } from "../components/Auth/SignUpForm"
import { gql } from 'graphql-request'
import { client } from './client'

export const signUp = (variables: ISignUpFields) => {
    const SIGNUP = gql`
    mutation {
        signUp (
            username: "${variables.username}"
            email: "${variables.email}"
            password: "${variables.password}"
            imageUrl: "${variables.imageUrl}"
            occupation: "${variables.occupation}"
        )
    }
`
    return client.request(SIGNUP)
}

export const signIn = (variables: ISignInFields) => {
    const SIGNUP = gql`
    mutation {
        signIn (
            email: "${variables.email}"
            password: "${variables.password}"
        )
    }
`
    return client.request(SIGNUP)
}