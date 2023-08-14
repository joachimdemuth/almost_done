import '../styles/globals.css';

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
				<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

				<link
					href='https://fonts.cdnfonts.com/css/tasa-orbiter-text'
					rel='stylesheet'
				></link>

			</head>
			<body className='font-body'>{children}</body>
		</html>
	);
}
