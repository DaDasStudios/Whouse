interface Props {
    href?: string
    content: string
}

export default function Element({ href = "/", content }: Props) {
	return (
		<li>
			<a
				href={href}
				className="block py-2 pl-3 pr-4 text-gray-700 dark:text-dark-muted rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-link md:p-0  md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-primary md:dark:hover:bg-transparent dark:border-gray-700"
				aria-current="page">{content}</a
			>
		</li>

	)
}