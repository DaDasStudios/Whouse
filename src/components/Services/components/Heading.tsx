interface Props {
	type: number;
	children?: React.ReactNode
}
const Heading = (props: Props) => {
	const { type, children} = props
	const className = "tracking-tight text-slate-700 dark:text-slate-300 font-bold mb-4"
	switch (type) {
		case 1:
			return (<h1 className={className + " text-6xl"}>{children}</h1>)
		case 2:
			return (<h2 className={className + " text-5xl" }>{children}</h2>)
		case 3:
			return (<h3 className={className + " text-4xl"}>{children}</h3>)
		case 4:
			return (<h4 className={className + " text-3xl"}>{children}</h4>)
		case 5:
			return (<h5 className={className + " text-2xl"}>{children}</h5>)
		case 6:
			return (<h6 className={className + " text-xl"}>{children}</h6>)
		default:
			break;
	}
}

export default Heading