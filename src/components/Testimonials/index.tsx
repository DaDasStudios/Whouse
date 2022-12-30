import { useState, useEffect } from 'react'
import fakeUsers from '../../../database/fake-data/users.json'
import type { ITestimonialUser } from '../../interfaces/User'
import Testimonial from './Testimonial'
import Gradient from './Gradient'

const Testimonials = () => {

    const [users, setUsers] = useState(fakeUsers as ITestimonialUser[])
    const [displayed, setDisplayed] = useState(false)

    // useEffect(() => {

    // }, [])

    return (
        <section className={`p-0.5 grid max-xl:mx-5 max-md:grid-cols-1 grid-cols-3 gap-6 mt-36 relative overflow-hidden ${displayed ? "max-h-full" : "max-h-[400px]"}`}>
            {users.map(user => (
                <Testimonial key={user.id.$oid} user={user} />
            ))}
            {users.length > 6 && (<Gradient displayed={displayed} setDisplayed={setDisplayed} />)}

        </section>
    )
}

export default Testimonials