import type { ITestimonialUser } from "../../interfaces/User"

interface IProps {
    user: ITestimonialUser
}

const Testimonial = (props: IProps) => {
    const { id, fullName, email, gender, image, occupation, opinion } = props.user
    return (
        <figure className="rounded-lg bg-slate-50 dark:bg-dark-secondary p-6 testimonials ring-1 ring-slate-900/5 dark:ring-gray-500/30">
            <div className="flex gap-3 items-center">
                <img className="rounded-full ring-1 ring-slate-900/5 w-[50px]" src={image} alt={fullName} />
                <figcaption>
                    <p className="font-semibold text-slate-800 text-sm dark:text-slate-200 dark:">{fullName}</p>
                    <small className="text-muted dark:text-dark-muted">{occupation}</small>
                </figcaption>
            </div>
            <blockquote className="text-[13px] text-gray-600 dark:text-slate-200 mt-3">{opinion}</blockquote>
        </figure>
    )
}

export default Testimonial