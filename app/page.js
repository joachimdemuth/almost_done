'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import bgHoriz from './_assets/bg_image/italy-35.jpg';
import bgVert from './_assets/bg_image/italy-24.jpg';
import tailwindConfig from '../tailwind.config.js'
import Link from 'next/link';
import '../styles/globals.css';


const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};


export default function Home() {
	const [device, setDevice] = useState('horizontal');


	const screens = tailwindConfig.theme.screens;


	useEffect(() => {
        const handleResize = debounce(() => {
            setDevice(checkDevice());
        }, 100);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


	useEffect(() => {
		setDevice(checkDevice());
	}, []);

	// function that checks if the device is mobile or not
	const checkDevice = () => {
		if (window.innerWidth > window.innerHeight) {
			return 'horizontal';
		} else {
			return 'vertical';
		}
	};


	 


	return (
		<div className='flex fixed top-0 left-0 flex-col w-full min-h-screen max-h-screen justify-center items-center'>
			<div className='w-full min-h-screen fixed top-0 left-0 '>
				<Image
					src={device === 'horizontal' ? bgHoriz : bgVert}
					alt='bg'
					className='w-full min-h-screen object-cover'
				/>
			</div>
			<div className='flex fixed top-0 left-0 w-full min-h-screen max-lg:pt-40 pt-40 max-xl:items-start justify-center  z-10'>
				
					<svg className='w-[80%] xl:w-[60%] md:w-[70%] sm:w-[60%]  h-full' overflow={'visible'} viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<filter id='y2kIndustrial' x='0' y='0' width='200%' height='200%'>
							<feTurbulence baseFrequency={0} numOctaves='20' seed='10'>
								{device === 'horizontal' && (
									<animate
									attributeName='baseFrequency'
									dur='60s'
									values='0;.1'
									repeatCount='indefinite'
									/>
									)}
							</feTurbulence>
							
							<feDisplacementMap in='SourceGraphic' scale={2}>
								
							</feDisplacementMap>
						</filter>
					</defs>
					<g filter='url(#y2kIndustrial)'>
						<path
							d='M35 32C43.8366 32 55.2556 25.1921 55.2556 16.3556C55.2556 7.519 43.6588 0 34.8222 0V2.84444C42.2842 2.84445 48.5 8.89358 48.5 16.3556C48.5 23.8175 42.462 30 35 30V32Z'
							fill='#52ff00'
						/>
						<path
							d='M21.1185 2.3085C19.2276 -0.769501 17.3909 -0.769498 15.5 2.3085L1.07719 29.9365C0.58691 30.8757 1.26825 32 2.32769 32V32C2.85462 32 3.33762 31.7063 3.5801 31.2385L17.3932 4.58829C18.3398 3.05722 17.9352 3.05721 18.8818 4.58828L32.3249 30.9097C32.6667 31.5788 33.3547 32 34.106 32H34.966C35.5974 32 35.9842 31.3058 35.6531 30.7669L21.1185 2.3085Z'
							fill='#52ff00'
						/>
						<path
							d='M32.8222 21.3332C32.8222 22.5114 33.7839 23.4872 34.9491 23.3132C36.5881 23.0684 37.882 22.5601 38.8524 22.006C39.608 21.5745 39.2413 20.6221 38.3712 20.6221H33.5333C33.1406 20.6221 32.8222 20.9404 32.8222 21.3332V21.3332Z'
							fill='#52ff00'
						/>
						<path
							d='M42.7778 9.95577C42.7778 11.5267 41.5043 12.8002 39.9333 12.8002C38.3624 12.8002 37.0889 11.5267 37.0889 9.95577C37.0889 8.38486 38.3624 7.11133 39.9333 7.11133C41.5043 7.11133 42.7778 8.38486 42.7778 9.95577Z'
							fill='#52ff00'
						/>
						<path
							d='M44.0281 17.8745C44.4399 18.2588 45.8199 19.2582 46.4376 17.3363C46.6137 16.7883 46.5169 16.4523 45.4502 15.7411C44.7391 15.3856 44.7392 14.6744 43.967 15.03C42.9615 16.0967 43.8222 17.6823 44.0281 17.8745Z'
							fill='#52ff00'
						/>
						<path
							d='M32.8222 1.42222C32.8222 0.63675 33.4589 0 34.2444 0H35.6667V5.68889C35.6667 6.47436 35.0299 7.11111 34.2444 7.11111C33.4589 7.11111 32.8222 6.47436 32.8222 5.68889V1.42222Z'
							fill='#52ff00'
						/>
					</g>
				</svg>
				
			</div>
			<div className='z-10 flex fixed flex-col w-full lg:px-20 min-h-screen max-lg:bottom-16  justify-end items-center pb-20'>
				<Link href='/main-hall'>
					<div className='flex px-4 py-6  items-center gap-2 border-4 rounded-full  border-primary-lime-green hover:animate-[prolong_0.2s_ease-in-out_forwards]'>
						<div className='flex items-center'>
							<p className=' text-lg font-bold font-display leading-normal text-primary-lime-green'>
								Go to gallery
							</p>
						</div>
						<div className='flex justify-end items-center'>
							<svg
								width='64'
								height='23'
								viewBox='0 0 73 23'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M2 10C1.17157 10 0.5 10.6716 0.5 11.5C0.5 12.3284 1.17157 13 2 13V10ZM72.0607 12.5607C72.6464 11.9749 72.6464 11.0251 72.0607 10.4393L62.5147 0.893398C61.9289 0.307612 60.9792 0.307612 60.3934 0.893398C59.8076 1.47918 59.8076 2.42893 60.3934 3.01472L68.8787 11.5L60.3934 19.9853C59.8076 20.5711 59.8076 21.5208 60.3934 22.1066C60.9792 22.6924 61.9289 22.6924 62.5147 22.1066L72.0607 12.5607ZM2 13H71V10H2V13Z'
									fill='#52FF00'
								/>
							</svg>
						</div>
					</div>
				</Link>
			</div>
			<footer className='flex fixed lg:px-20 max-lg:px-6 bottom-0 left-0 w-full box-border py-4 lg:justify-start justify-center items-center'>
				<p className='text-center text-primary-lime-green font-display font-bold text-md md:text-lg'>
					© 2023 Almost Done
				</p>
			</footer>
		</div>
	);
}
