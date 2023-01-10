import type { IContactFields } from "../components/Contact/Form"
import { gql } from 'graphql-request'
import { client } from './client'

export const submitContact = async ({
    firstNames,
    lastNames,
    email,
    location,
    reason,
    content
}: IContactFields) => {
    const SUBMIT_RATE = gql`
        mutation {
            submitContact(
                name: "${firstNames}"
                lastname: "${lastNames}"
                email: "${email}"
                location: "${location}"
                reason: "${reason}"
                description: "${content}"
            ) {
                success
                data {
                    _id
                    name
                    lastname
                    email
                    location
                    reason
                    description
                    createdAt
                    updatedAt
                }
            }
        }
    `

    return client.request(SUBMIT_RATE)
}