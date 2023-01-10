import { useState, useEffect } from 'react'
import type { IRate } from '../../interfaces/Rate'
import Testimonial from './Testimonial'
import Gradient from './Gradient'
import { fetchRates } from '../../api/testimonials'

const Testimonials = () => {
    const [rates, setRates] = useState([] as IRate[])
    const [displayed, setDisplayed] = useState(false)

    useEffect(() => {
        (
            async () => {
                const foundRates = await fetchRates() as { rates: IRate[] }
                setRates(foundRates?.rates)
            }
        )()
    }, [])

    return (
        <section className={`p-0.5 grid max-xl:mx-5 max-md:grid-cols-1 grid-cols-3 gap-6 mt-36 relative overflow-hidden ${displayed ? "max-h-full" : "max-h-[400px]"}`}>
            {rates.map(rate => (
                <Testimonial key={rate._id} rate={rate} />
            ))}
            {rates.length > 6 && (<Gradient displayed={displayed} setDisplayed={setDisplayed} />)}

        </section>
    )
}

export default Testimonials