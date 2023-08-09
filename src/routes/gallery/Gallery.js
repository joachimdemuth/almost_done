import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Masonry from 'masonry-layout';
import { Link } from 'react-router-dom';
import ArrowLeft from '../../assets/icons/Arrow_left.svg'
import ArrowRight from '../../assets/icons/Arrow_right.svg';
import Close from '../../assets/icons/Close.svg';
const supabase = createClient(
	process.env.REACT_APP_SUPABASE_URL,
	process.env.REACT_APP_SUPABASE_ANON_KEY,
);
const baseUrl = process.env.REACT_APP_SUPABASE_BASE_URL;


function Gallery() {
	const [allImages, setAllImages] = useState([]);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [currentImage, setCurrentImage] = useState('');
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	useEffect(() => {
		async function getImages() {
			const { data, error } = await supabase
				.from('images_metadata')
				.select('*');
			if (error) {
				console.error('error fetching images: ', error);
			} else {
				setAllImages(data);
			}
		}
		getImages();
	}, []);

	const handleOpenLightbox = () => {
		document.body.classList.add('overflow-hidden', 'fixed', 'w-full', 'h-full');
		setIsLightboxOpen(true);
	};

	const handleCloseLightbox = () => {
		document.body.classList.remove(
			'overflow-hidden',
			'fixed',
			'w-full',
			'h-full',
		);
		setIsLightboxOpen(false);
	};
	// async function fetchImage(url) {
	//     console.log(url)
	//     if (!url) return
	//     const { data: publicURL, error } = await supabase.storage
	//         .from('public-images')
	//         .getPublicUrl(`analog/${url}`)
	//     if (error) console.log('error', error)
	//         console.log(publicURL)
	//         setCurrentImage(publicURL.publicUrl)
	// }

	const handleNext = () => {
		if (currentImageIndex < allImages.length - 1) {
			setCurrentImageIndex((prevIndex) => prevIndex + 1);
		}
	};

	const handlePrevious = () => {
		if (currentImageIndex > 0) {
			setCurrentImageIndex((prevIndex) => prevIndex - 1);
		}
	};
	// check if #grid exists
	if (document.getElementById('grid')) {
		// if it does, initialize masonry

		var msnry = new Masonry('#grid', {
			// options
			itemSelector: '#grid-item',
			fitWidth: true,
		});
	}

	return (
		<div className='flex flex-col justify-start w-full items-center min-h-screen'>
			<div className=' bg-white flex w-full px-6 h-16 lg:px-20 lg:h-24 lg:justify-start justify-center items-center'>
				<Link to='/'>
					<svg
						className=' w-10 lg:w-16 h-auto lg:h-auto'
						viewBox='0 0 770 386'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M513.333 386C619.648 386 757.167 303.88 757.167 197.289C757.167 90.698 619.648 0 513.333 0V34.3111C603.11 34.3112 675.889 107.279 675.889 197.289C675.889 287.299 603.11 360.267 513.333 360.267V386Z'
							fill='#0057FF'
						/>
						<path
							d='M318.65 27.8463C295.901 -9.28205 242.201 -9.28214 219.451 27.8462L4.66424 378.388C2.62287 381.719 5.0203 386 8.92758 386H35.5335C37.2681 386 38.8788 385.101 39.7893 383.624L242.229 55.3462C253.618 36.8776 280.351 36.8776 291.74 55.3462L495.059 385.05C495.423 385.64 496.067 386 496.761 386H520.721C528.317 386 532.971 377.627 528.987 371.126L318.65 27.8463Z'
							fill='#0057FF'
						/>
						<path
							d='M479.111 283.067C531.087 283.067 561.458 261.622 573.222 248.756H479.111V283.067Z'
							fill='#0057FF'
						/>
						<path
							d='M598.889 120.089C598.889 139.038 583.567 154.4 564.667 154.4C545.767 154.4 530.444 139.038 530.444 120.089C530.444 101.14 545.767 85.7778 564.667 85.7778C583.567 85.7778 598.889 101.14 598.889 120.089Z'
							fill='#0057FF'
						/>
						<path
							d='M613.932 215.614C618.886 220.25 635.49 232.305 642.921 209.122C645.04 202.512 643.875 198.458 631.042 189.88C622.486 185.591 622.488 177.013 613.196 181.303C601.099 194.169 611.454 213.295 613.932 215.614Z'
							fill='#0057FF'
						/>
						<path
							d='M479.111 17.1556C479.111 7.6808 486.772 0 496.222 0H513.333V68.6222C513.333 78.097 505.673 85.7778 496.222 85.7778C486.772 85.7778 479.111 78.097 479.111 68.6222V17.1556Z'
							fill='#0057FF'
						/>
					</svg>
				</Link>
			</div>

			<div
				id='grid'
				className='lg:w-full pt-4 flex flex-wrap lg:px-20 justify-between items-center lg:py-10'
			>
				{allImages.map((image, index) => {
					return (
						<div
							onClick={handleOpenLightbox}
							key={index}
							id='grid-item'
							className='flex-1 lg:max-w-[450px] hover:cursor-pointer'
						>
							<img className='cover p-1' src={baseUrl + image?.file_path} />
							{/* <p>{image.coords.lng + ", " + image.coords.lat}</p> */}
							{/* <p className=' text-[#0057ff]'>Show on map</p> */}
						</div>
					);
				})}

				{/* <div className='flex justify-between flex-row w-full'>
            <div className='flex flex-col gap-4'>
                <p className='font-bold'>{allImages[currentImageIndex]?.title}</p>
                <p>{allImages[currentImageIndex]?.desc}</p>
            </div>
            <div className='flex flex-col gap-4'>
                <p>{allImages[currentImageIndex]?.coords}</p>
                <p className=' text-[#0057FF] underline'>Show on map</p>
            </div>
        </div> */}

				{/* <div className='flex flex-row lg:w-3/4 lg:px-20 lg:h-24 justify-between items-center'>
        <div className='flex w-full justify-between flex-row gap-4'>
            <button onClick={handlePrevious} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Previous</button>
            <p>{currentImageIndex+1}/{allImages.length}</p>
            <button onClick={handleNext} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Next</button>

        </div>
    </div> */}
			</div>
			{isLightboxOpen && (
				<div className='fixed flex-col top-0 left-0 w-full h-full bg-white flex'>
                    <div className='w-[64px] h-[64px] rounded-full fixed top-12 right-12 flex justify-center items-center cursor-pointer scale-75 hover:scale-100 transition-transform'>
                        <img onClick={handleCloseLightbox} src={Close} />
                    </div>
					{/* FULL SIZE IMAGE */}
					<div className='flex h-[90%] w-full'>
						<img
							className='w-full h-full object-cover'
							src={baseUrl + allImages[currentImageIndex]?.file_path}
						/>
					</div>

					{/* BOTTOM BAR */}
					<div className='flex text-[#0057ff] justify-between px-12 py-6 bg-white flex-row  w-full h-full'>
						<div className='flex justify-start items-start w-1/3 gap-1 flex-col'>
							<p className=' text-xl font-display font-bold'>
								{allImages[currentImageIndex].title}
							</p>
							<p className=' text-md text-center font-body'>
								{allImages[currentImageIndex].desc}
							</p>
						</div>
						<div className='flex flex-row justify-between items-center w-1/3   '>
							<div
								onClick={handlePrevious}
								className='py-2 px-4 cursor-pointer hover:translate-x-1 transition-transform'
							>
								<img src={ArrowLeft} />
							</div>
							<p>
								{currentImageIndex + 1}/{allImages.length}
							</p>

							<div
								onClick={handleNext}
								className=' py-2 px-4 cursor-pointer hover:translate-x-1 transition-transform'
							>
								<img src={ArrowRight} />

							</div>
						</div>
						<div className='flex justify-center items-end gap-2 w-1/3 flex-col'>

								<p className=' text-sm font-body'>
									{allImages[currentImageIndex].coords.lng +
										', ' +
										allImages[currentImageIndex].coords.lat}
								</p>
								<p className=' hover:font-bold text-xs underline text-blue-500 text-center hover:cursor-pointer font-display hover:underline'>
									Show on map
								</p>

						</div>

						
                        
					</div>
				</div>
			)}
		</div>
	);
}

export default Gallery;
