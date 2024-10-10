import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: 'class',
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				between_custom: { min: "640px", max: "767px" },
			},
			backgroundImage: {
				'blue-gradient': 'linear-gradient(45deg, hsl(240deg 90% 8%) 0%, hsl(240deg 90% 8%) 4%, hsl(240deg 90% 7%) 8%, hsl(240deg 90% 7%) 13%, hsl(240deg 90% 7%) 19%, hsl(240deg 90% 6%) 27%, hsl(240deg 90% 6%) 35%, hsl(240deg 90% 6%) 43%, hsl(240deg 90% 5%) 52%, hsl(240deg 90% 5%) 61%, hsl(240deg 90% 4%) 70%, hsl(240deg 90% 4%) 78%, hsl(240deg 90% 3%) 86%, hsl(240deg 90% 2%) 93%, hsl(0deg 0% 0%) 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
