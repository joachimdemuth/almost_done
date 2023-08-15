
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react'
export const metadata = {
	title: 'Almost Done',
	description: 'Photo gallery',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<link
					href='https://fonts.cdnfonts.com/css/tasa-orbiter-display'
					rel='stylesheet'
				></link>
				<link
					href='https://fonts.cdnfonts.com/css/tasa-explorer'
					rel='stylesheet'
				></link>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				></meta>

				<meta name='theme-color' content='#52ff00'></meta>

				
			</head>
			<body className='font-body'>{children}
			<Analytics 
			
			/>
			</body>
		</html>
	);
}
