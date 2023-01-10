export interface IUser {
    _id: string,
    username: string,
    email: string,
    password: string,
    imageUrl: string,
    occupation: string,
    roles: string[],
    createdAt: Date,
    updatedAt: Date,
}