/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,css}', "./node_modules/flowbite/**/*.js"],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				'sans': ["inter", ...defaultTheme.fontFamily.sans],
				comfortaa: ['Comfortaa', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif']
			},
			colors: {
				primary: colors.blue['500'],
				secondary: colors.green['400'],
				link: colors.blue['700'],
				muted: colors.gray['500'],
				"dark-primary": colors.gray['900'],
				"dark-secondary": colors.slate['800'],
				"dark-terciary": colors.gray['700'],
				"dark-muted": colors.gray['400'],
			},
		},
	},
	plugins: [require('flowbite/plugin')],
}
