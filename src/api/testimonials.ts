import { gql } from 'graphql-request'
import { client } from './client'

export const fetchRates = () => {
    const GET_RATES = gql`
    {
        rates {
            _id
            testimonial
            author {
                username
                imageUrl
                occupation
            }
        }
    }
`
    return client.request(GET_RATES)
}

export const submitRate = (testimonial: string) => {
    const SUBMIT_RATE = gql`
    mutation {
        submitRate(
            testimonial: "${testimonial}"
        ){
            _id
            testimonial
            author {
                username
                imageUrl
                occupation
            }
        }
    }
    `

    return client.request(SUBMIT_RATE, undefined, {
        'x-access-token': localStorage.getItem('x-access-token') || ''
    })
}

