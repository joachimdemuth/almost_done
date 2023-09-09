'use client';
import React, { useState, useEffect, useRef, use } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Close from '../../_assets/icons/Close.svg';
import { supabase } from '../../_utils/supabase';

const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_BASE_URL;

export default function Gallery() {
	const [allImages, setAllImages] = useState([]);
	const [showOverlay, setShowOverlay] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(null);
	const [position, setPosition] = useState({});
	const [clickedImage, setClickedImage] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const overlayRef = useRef(null);
	const imageContainer = useRef(null);

	useEffect(() => {
		//timeout to allow for images to load
		setTimeout(() => {
			setIsLoaded(true);
		}, 1000);
	}, [allImages]);

	useEffect(() => {
		const fetchImages = async () => {
			const { data, error } = await supabase
				.from('images_metadata')
				.select('*');

			if (error) {
				console.error('error fetching images: ', error);
			} else {
				setAllImages(data);
			}
		};
		fetchImages();
	}, []);

	useEffect(() => {
		if (showOverlay) {
			const img = overlayRef.current;
			setTimeout(() => {
				img.style.top = '0';
				img.style.left = '0';
				img.style.width = '100vw';
				img.style.height = '100vh';
			}, 10);
		}
	}, [showOverlay]);

	const openImage = (index, event) => {
		const rect = event.target.getBoundingClientRect();
		setPosition({
			top: rect.top + window.scrollY,
			left: rect.left + window.scrollX,
			width: rect.width,
			height: rect.height,
		});
		setCurrentIndex(index);
		setShowOverlay(true);
	};

	const nextImage = () => {
		if (currentIndex < allImages.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}

		if (currentIndex === allImages.length - 1) {
			setCurrentIndex(0);
		}
	};

	const closeOverlay = () => {
		setShowOverlay(false);
	};

	const handleOnImageClick = (index, e) => {
		setClickedImage(index);
		const container = e.target.parentNode;
	};

	return (
		<div
			id='main-container'
			className='flex w-full flex-col relative min-h-screen bg-light-blue  justify-center items-center'
		>
			<div className='justify-center items-center z-10 flex w-full lg:py-8 px-2 py-4 fixed top-0 left-0 bg-[#DBEEFF] max-md:bg-opacity-40 max-md:backdrop-blur-md'>
				<h1 className='text-3xl lg:text-4xl font-bold text-primary-blue'>
					almost done
				</h1>
			</div>
			{allImages && (
				<div
					className={`flex max-lg:min-h-screen max-lg:pt-20  w-full h-auto max-lg:px-2 lg:w-[1122px] lg:h-[650px] lg:flex-row flex-col overflow-hidden justify-between items-start transition-transform transform duration-300 ease-in-out ${
						isLoaded ? 'translate-y-0' : 'translate-y-40'
					}`}
				>
					{allImages.map((image, index) => {
						return (
							<>
                            {/* // MOBILE LAYOUT */}
								<div
									onClick={(e) => handleOnImageClick(index, e)}
                                    key={index}
									className={`flex lg:hidden w-full ${
										clickedImage === index ? ' h-72' : 'h-16'
									} relative justify-start items-start overflow-hidden transform transition-all duration-300`}
								>
									<Image
										src={baseUrl + image?.file_path}
										alt={image?.desc}
                                        className='w-full h-full object-cover'

										placeholder='blur'
										blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWP+/HgAElAIv6Q4JJwAAAABJRU5ErkJggg=='
										sizes='(max-width: 768px) 100vw, 768px'
									/>
								</div>

                            {/* // DESKTOP LAYOUT */}

								<div
									ref={imageContainer}
									key={"d" + index}
									onClick={(e) => openImage(index, e)}
									className='hidden md:flex md:w-1/12  relative justify-start items-start overflow-hidden md:h-full transform transition-all duration-300 hover:w-3/4 hover:cursor-pointer'
								>
									<Image
										src={baseUrl + image?.file_path}
										alt={image?.desc}
                                        className='w-full h-full object-cover'
										placeholder='blur'
										blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWP+/HgAElAIv6Q4JJwAAAABJRU5ErkJggg=='
										sizes='(max-width: 768px) 100vw, 768px'
									/>
								</div>
							</>
						);
					})}
				</div>
			)}
			{showOverlay && (
				<div className='overlay bg-[#DBEEFF] bg-opacity-70 z-20 backdrop-blur-lg transition-all w-full h-screen transform duration-300 top-0 left-0 fixed'>
					<div
						onClick={closeOverlay}
						className='w-6 h-6 hover:cursor-pointer z-30 fixed right-16 top-16 text-primary-white'
					>
						<svg
							width='40'
							height='40'
							viewBox='0 0 40 40'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M5.58579 8.41421C4.80474 7.63317 4.80474 6.36684 5.58579 5.58579C6.36684 4.80474 7.63317 4.80474 8.41421 5.58579L20 17.1716L31.5858 5.58579C32.3668 4.80474 33.6332 4.80474 34.4142 5.58579C35.1953 6.36684 35.1953 7.63317 34.4142 8.41421L22.8284 20L34.4142 31.5858C35.1953 32.3668 35.1953 33.6332 34.4142 34.4142C33.6332 35.1953 32.3668 35.1953 31.5858 34.4142L20 22.8284L8.41421 34.4142C7.63317 35.1953 6.36684 35.1953 5.58579 34.4142C4.80474 33.6332 4.80474 32.3668 5.58579 31.5858L17.1716 20L5.58579 8.41421Z'
								fill='#005CFF'
							/>
						</svg>
					</div>
					<Image
						ref={overlayRef}
						src={baseUrl + allImages[currentIndex]?.file_path}
						alt={allImages[currentIndex]?.desc}
						onClick={nextImage}
                        className='w-full h-full object-contain'

						placeholder='blue'
						blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWP+/HgAElAIv6Q4JJwAAAABJRU5ErkJggg=='
						sizes='(max-width: 768px) 100vw, 768px'
					/>
				</div>
			)}
			<div
				className={`fixed flex justify-center items-center top-0 left-0 w-full h-screen bg-primary-blue z-40 ${
					isLoaded
						? 'transition-all -translate-x-full duration-300 ease-out'
						: ''
				}`}
			>
				<svg
					style={{ willChange: 'transform, opacity' }}
					className=' fill-light-blue animate-[logoAnimation_0.3s_ease-in]'
					width='800'
					height='600'
					viewBox='0 0 56 32'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M35 32C43.8366 32 55.2556 25.1921 55.2556 16.3556C55.2556 7.519 43.6588 0 34.8222 0V2.84444C42.2842 2.84445 48.5 8.89358 48.5 16.3556C48.5 23.8175 42.462 30 35 30V32Z' />
					<path d='M21.1185 2.3085C19.2276 -0.769501 17.3909 -0.769498 15.5 2.3085L1.07719 29.9365C0.58691 30.8757 1.26825 32 2.32769 32V32C2.85462 32 3.33762 31.7063 3.5801 31.2385L17.3932 4.58829C18.3398 3.05722 17.9352 3.05721 18.8818 4.58828L32.3249 30.9097C32.6667 31.5788 33.3547 32 34.106 32H34.966C35.5974 32 35.9842 31.3058 35.6531 30.7669L21.1185 2.3085Z' />
					<path d='M32.8222 21.3332C32.8222 22.5114 33.7839 23.4872 34.9491 23.3132C36.5881 23.0684 37.882 22.5601 38.8524 22.006C39.608 21.5745 39.2413 20.6221 38.3712 20.6221H33.5333C33.1406 20.6221 32.8222 20.9404 32.8222 21.3332V21.3332Z' />
					<path d='M42.7778 9.95577C42.7778 11.5267 41.5043 12.8002 39.9333 12.8002C38.3624 12.8002 37.0889 11.5267 37.0889 9.95577C37.0889 8.38486 38.3624 7.11133 39.9333 7.11133C41.5043 7.11133 42.7778 8.38486 42.7778 9.95577Z' />
					<path d='M44.0281 17.8745C44.4399 18.2588 45.8199 19.2582 46.4376 17.3363C46.6137 16.7883 46.5169 16.4523 45.4502 15.7411C44.7391 15.3856 44.7392 14.6744 43.967 15.03C42.9615 16.0967 43.8222 17.6823 44.0281 17.8745Z' />
					<path d='M32.8222 1.42222C32.8222 0.63675 33.4589 0 34.2444 0H35.6667V5.68889C35.6667 6.47436 35.0299 7.11111 34.2444 7.11111C33.4589 7.11111 32.8222 6.47436 32.8222 5.68889V1.42222Z' />
				</svg>
			</div>
		</div>
	);
}
