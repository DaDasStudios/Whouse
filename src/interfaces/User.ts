export interface ITestimonialUser {
    id: { $oid: string }
    fullName: string,
    occupation: string
    email: string
    gender: "Male" | "Female"
    image: string
    opinion: string
}