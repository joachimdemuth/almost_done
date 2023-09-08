
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

				<meta name='theme-color' content='#DBEEFF'></meta>

				
			</head>
			<body className='font-body flex flex-col bg-[#DBEEFF]'>
				{children}
				{/* <footer className='flex z-10 lg:px-20 max-lg:px-6 bottom-0 left-0 w-full box-border py-10 lg:justify-start justify-center items-center'>
				<p className='text-center text-primary-lime-green font-display font-bold text-md md:text-lg'>
					© 2023 Almost Done
				</p>
			</footer> */}
			<Analytics 
			
			/>
			</body>
		</html>
	);
}
