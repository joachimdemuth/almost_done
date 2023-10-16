/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		colors: {
			'primary-blue': '#005CFF',
			'light-blue' : '#DBEEFF',
			'primary-blue-20' : '#CCDEFF',
			'button-hover': '#0045bbff',
			'gray-100': '#F3F4F6',
			'gray-300': '#CBCBCB',
			'gray-400': '#BEBEBE',
			'text-black': '#091527',
			'primary-white': '#FFFFFF',
		},
		extend: {
			fontFamily: {
				body: ['TASA Explorer', 'sans-serif'],
				display: ['TASA Orbiter Display', 'sans-serif'],
			},
			animation: {
				prolong: 'prolong 0.2s ease-in-out both',
				logoAnimation: 'logo-animation 0.3s ease-in',

			},
			keyframes: {
				prolong: {
					'0%': { borderRadius: '50px', background: 'transparent' },
					'100%': { borderRadius: '8px', background: '#52ff0050' },
				},
				logoAnimation: {
					'0%': { transform: 'scale(0.6)',   },
					'100%': { transform: 'scale(1)',  },
				},

			
			},
			transitionTimingFunction: {
				'logo' : 'cubic-bezier(.13,.84,1,1)'
			},
			cursor: {
				'left-arrow': 'url(./app/_assets/cursor/leftArrow.svg) 16 16, auto',
			},
		},
	},
	plugins: [],
};
