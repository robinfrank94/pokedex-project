/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			Raleway: ["Raleway"],
		},
		extend: {
			colors: {
				grass: "#3e9707",
				fire: "#f67f0c",
				water: "#187abc",
				normal: "#ccc9aa",
				flying: "#5eb9b2",
				bug: "#bddd6e",
				poison: "#a819d6",
				electric: "#fffa24",
				ground: "#e1d158",
				fighting: "#e81318",
				psychic: "#ec0e63",
				rock: "#776a3e",
				ice: "#2995a1",
				ghost: "#8e55a4",
				dragon: "#8a55fd",
				dark: "#5f4632",
				steel: "#7b8e8a",
				fairy: "#f99fc2",
			},
		},
	},
	plugins: [],
};
