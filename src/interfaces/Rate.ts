import type { IUser } from "./User"

export interface IRate {
    _id: string
    testimonial: string,
    author: IUser
    createdAt: Date,
    updatedAt: Date
}