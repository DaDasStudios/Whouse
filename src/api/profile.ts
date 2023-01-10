import { gql } from 'graphql-request'
import { client } from './client'
import type { IProfile } from '../components/Profile/Profile'



export const updateUser = (id: string, variables: IProfile) => {
    const UPDATE_USER = gql`
        mutation {
            updateUser(
                id: "${id}"
                username: "${variables.username}"
                email: "${variables.email}"
                occupation: "${variables.occupation}"
                imageUrl: "${variables.imageUrl}"
            ){
                _id 
                username
                email
                occupation
                imageUrl
            }
        }
    `
    return client.request(UPDATE_USER, undefined, {
        'x-access-token': localStorage.getItem('x-access-token') || ''
    })
}

export const deleteUser = (id: string) => {
    const DELETE_USER = gql`
        mutation {
            deleteUser(
                id: "${id}"
            ){
                _id 
                username
                email
                occupation
                imageUrl
            }
        }
    `

    return client.request(DELETE_USER, undefined, {
        'x-access-token': localStorage.getItem('x-access-token') || ''
    })
}
