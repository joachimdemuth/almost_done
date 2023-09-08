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



	const overlayRef = useRef(null);
	const imageContainer = useRef(null);

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

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
        setClickedImage(index)
        const container = e.target.parentNode


    }



	return (
		<div
			id='main-container'
			className='flex w-full flex-col relative min-h-screen bg-[#DBEEFF]  justify-center items-center'
		>
            <div className='lg:hidden justify-center items-center z-20 flex w-full px-2 py-4 fixed top-0 left-0 bg-[#DBEEFF] bg-opacity-40 backdrop-blur-md'> 
                <h1 className="text-3xl font-bold text-primary-blue">almost done</h1>
            </div>
			{allImages && (
				<div
					className={`flex max-lg:min-h-screen max-lg:pt-20  w-full h-auto max-lg:px-2 lg:w-[1122px] lg:h-[650px] lg:flex-row flex-col overflow-hidden justify-between items-start transition-transform transform duration-300 ease-in-out ${
						isMounted ? 'translate-y-0' : 'translate-y-40'
					}`}
				>
					{allImages.map((image, index) => {
						return (
							<>
								<div onClick={(e) => handleOnImageClick(index, e)} className={`flex lg:hidden w-full ${clickedImage === index ? " h-72" : "h-16"} relative justify-start items-start overflow-hidden transform transition-all duration-300`}>
									<Image
										src={baseUrl + image?.file_path}
										alt={image?.desc}
										layout='fill'
										objectFit={`cover`}
										placeholder='blur'
										blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWP+/HgAElAIv6Q4JJwAAAABJRU5ErkJggg=='
									/>
								</div>
								<div
									ref={imageContainer}
									key={index}
									onClick={(e) => openImage(index, e)}
									className='hidden md:flex md:w-1/12  relative justify-start items-start overflow-hidden md:h-full transform transition-all duration-300 hover:w-3/4 hover:cursor-pointer'
								>
									<Image
										src={baseUrl + image?.file_path}
										alt={image?.desc}
										layout='fill'
										objectFit={`cover`}
										placeholder='blur'
										blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWP+/HgAElAIv6Q4JJwAAAABJRU5ErkJggg=='
									/>
									
								</div>
							</>
						);
					})}
				</div>
			)}
			{showOverlay && (
				<div className='overlay bg-[#DBEEFF] bg-opacity-70 backdrop-blur-lg transition-all w-full h-screen transform duration-300 top-0 left-0 fixed'>
					<div
						onClick={closeOverlay}
						className='w-6 h-6 hover:cursor-pointer z-10 fixed right-16 top-16 text-primary-white'
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
						layout='fill'
						objectFit='contain'
						placeholder='blue'
						blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWP+/HgAElAIv6Q4JJwAAAABJRU5ErkJggg=='
					/>
				</div>
			)}
		</div>
	);
}
