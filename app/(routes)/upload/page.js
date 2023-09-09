   'use client';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../../_components/InputField';
import ComboBox from '../../_components/ComboBox';
import 'mapbox-gl/dist/mapbox-gl.css';
import LeftArrow from '../../_assets/icons/Arrow_left.svg';
import Image from "next/legacy/image";
import Link from 'next/link';
import { handleImageCompression } from '../../_lib/imageCompression';
import { useRouter } from 'next/navigation';
import { supabase } from '../../_utils/supabase';
import KeywordsInput from './KeywordComponent';
import Snackbar from '@mui/material/Snackbar';
import checkDevice from '../../_lib/checkDevice';
import { getImageDimensions } from '../../_lib/imageCompression';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const mapboxToken =
	'pk.eyJ1IjoiZGpoZXN0IiwiYSI6ImNsbDNpM2xyNTA0a3MzZW1jOXBxb3g2amkifQ.qz9ZHVYASWPzJ0uiwwHDOg';

export default function Upload() {
	const [formData, setFormData] = useState({
		title: '',
		desc: '',
		camera: '',
		coords: {},
		date: '',
		keywords: [],
	});
	const [previewURL, setPreviewURL] = useState(null);
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [open, setOpen] = useState(false);
	const [mapSearch, setMapSearch] = useState('');
	const [map, setMap] = useState(null);
	const containerRef = React.useRef(null);

	let currentMarker; // Store the current marker if one exists
	const router = useRouter();
	const UUID = uuidv4();
	useEffect(() => {
		const res = supabase.auth.getUser().then((res) => {
			if (res.data.user === null) {
				router.push('/login');
			} else return;
		});
	}, [router]);

	useEffect(() => {
		mapboxgl.accessToken = mapboxToken || '';
		const mapInstance = new mapboxgl.Map({
			container: 'map', // container ID
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'mapbox://styles/djhest/cll5ax7h400k801ph6hb7dszd', // style URL
			center: [12.55, 55.68], // starting position
			zoom: 12, // starting zoom
		});

		setMap(mapInstance);

		mapInstance.on('click', function (e) {

			// If a marker already exists, remove it
			if (currentMarker) {
				currentMarker.remove();
			}

			// Create a new marker
			currentMarker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(mapInstance);
			console.log(currentMarker);
			setFormData((prevData) => ({ ...prevData, coords: e.lngLat }));
		});

		// Cleanup on unmount
		return () => {
			mapInstance.remove();
		};
	}, []);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const onFileChange = (event) => {
		if (!event.target.files[0]) return;
		setFile(event.target.files[0]);

		const url = URL.createObjectURL(event.target.files[0]);
		setPreviewURL(url);
	};

	async function uploadImage() {
		setUploading(true);
		if (!file) {
			console.error('Please select a file to upload');
			return;
		}

		// const {
		// 	newFile: compressedFile,
		// 	width,
		// 	height,
		// } = await handleImageCompression(file);
		// console.log(compressedFile, width, height);

		const { width, height } = await getImageDimensions(file);

		const { data: uploadedData, error: uploadError } = await supabase.storage
			.from('public-images')
			.upload(`analog/${file.name}`, file, {
				contentType: 'image/jpeg',
			});

		if (uploadError) {
			console.error('Error uploading file', uploadError);
			return;
		}

		const { data: metadataData, error: metadataError } = await supabase
			.from('images_metadata')
			.insert([
				{
					title: formData.title,
					desc: formData.desc,
					coords: formData.coords,
					camera: formData.camera,
					file_path: file.name,
					width: width,
					height: height,
					time_of_capture: formData.date,
					keywords: formData.keywords,
				},
			]);

		if (metadataData) {
			console.log('Metadata uploaded:', metadataData);
		}

		if (metadataError) {
			console.error('Error uploading metadata', metadataError);
		}

		// KEYWORD FUNCTION
		async function updateKeywordCounts(keywordsArray) {
			if (!keywordsArray) return;
			try {
				// fetch current keywords from the database
				let { data: existingKeywords, error } = await supabase
					.from('keywords')
					.select('*');
				if (error) throw error;

				// Iterate through each keyword from the image metadata
				for (let keyword of keywordsArray) {
					// Check if the keyword already exists in the database
					let existingKeyword = existingKeywords.find(
						(k) => k.keyword === keyword,
					);

					if (existingKeyword) {
						// If keyword exists, update its count

						let { data, error } = await supabase
							.from('keywords')
							.update({ count: existingKeyword.count + 1 })
							.eq('id', existingKeyword.id);
					} else {
						//If keyword does not exist, insert it into the database with a count of 1

						await supabase
							.from('keywords')
							.insert([{ keyword: keyword, count: 1 }]);
					}
				}
			} catch (error) {
				console.log('Error updating keyword counts: ', error);
			}
		}

		await updateKeywordCounts(formData.keywords);

		setUploading(false);
		alert('Image uploaded!');
		// when alert is closed, redirect to main hall
		setFormData({
			title: '',
			desc: '',
			camera: '',
			coords: {},
			date: '',
			keywords: [],
		});
		setFile(null);
		setPreviewURL(null);
		setOpen(true);
	}

	function fetchSuggestions(query) {
		if (!query) {
			document.getElementById('suggestions-container').innerHTML = '';
			return;
		}

		const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
			query,
		)}.json?access_token=${mapboxgl.accessToken}`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				displaySuggestions(data.features);
			});
	}
	function displaySuggestions(suggestions) {
		const container = document.getElementById('suggestions-container');
		container.innerHTML = '';

		suggestions.forEach((suggestion) => {
			const div = document.createElement('div');
			div.classList.add('hover:bg-primary-blue', 'px-1', 'py-1', 'rounded-[4px]', 'cursor-pointer');
			div.innerHTML = suggestion.place_name;
			div.onclick = () => {
				document.getElementById('search-bar').value = suggestion.place_name;
				container.innerHTML = '';
				const [longitude, latitude] = suggestion.center;
				if(map){

						map.flyTo({
						center: [longitude, latitude],
						zoom: 14,
						speed: 2,
						curve: 1,
						easing(t) {
							return t;
						},
					});
				}
			};
			container.appendChild(div);
		});
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	return (
		<div className='flex w-full min-h-screen flex-col'>
			{/* HEADER */}

			<div className='flex w-full justify-between items-center flex-row px-6 py-6 lg:py-12 lg:px-20'>
				<div className='flex w-1/3 items-center justify-start'>
					<Link href='/main-hall'>
						<Image
							width={checkDevice === false ? 64 : 48}
							src={LeftArrow}
							alt='back'
						/>
					</Link>
				</div>
				<div className='flex w-1/3 justify-center items-center'>
					<h1 className='w-full lg:text-[32px] text-center text-primary-blue text-2xl font-display font-bold '>
						Upload image
					</h1>
				</div>
				<div className='flex w-1/3'></div>
			</div>

			{/* FORM CONTAINER */}
			<div div className='flex w-full px-6 lg:py-12 lg:px-20 items-start'>
				<form
					className='flex w-full mb-10 lg:flex-row max-lg:flex-col items-start gap-8 lg:gap-20'
					onSubmit={(e) => e.preventDefault()}
				>
					<div className='flex flex-col w-full gap-12 flex-1 items-center'>
						<div className='flex h-full justify-center items-center w-full'>
							{previewURL ? (
								<div className='flex flex-col gap-2'>
									<Image
										width={600}
										height={600}
										src={previewURL}
										alt='preview'
										className=' object-cover '
									/>
									<label
										className='flex cursor-pointer hover:bg-button-hover justify-center items-center bg-primary-blue text-primary-white rounded-[4px]  py-2 px-4'
										htmlFor='image'
									>
										<p className='text-center font-bold'>Change image</p>
									</label>
								</div>
							) : (
								<label
									className='flex min-h-[200px] lg:min-h-[600px] justify-center items-center text-gray-400 border-2 border-gray-300 w-full bg-gray-100 rounded-lg'
									htmlFor='image'
								>
									<p className='text-center text-gray-400 text-lg lg:text-2xl font-body'>
										Drag and drop or click to select
									</p>
								</label>
							)}
						</div>
						<input
							className=' hidden'
							type='file'
							id='image'
							name='image'
							onChange={onFileChange}
						/>
						<div className='flex w-full items-start h-full'>
							<div className='flex w-full flex-col items-start gap-1 justify-between font-body text-primary-blue text-lg'>
								<p className='font-bold'>
									{formData.title ? formData.title : 'Title'}
								</p>
								<p>{formData.desc ? formData.desc : 'Description'}</p>
								<p>{formData.date ? formData.date : 'dd.mm.yyyy'}</p>
							</div>
							<div className='flex w-full flex-col items-end gap-1  text-primary-blue text-lg'>
								{formData.coords.lng !== undefined ? (
									<p className='font-display font-bold'>
										{formData.coords.lat.toString().substring(0,7) + ', ' + formData.coords.lng.toString().substring(0,7)}
									</p>
								) : (
									<p className='font-display font-bold'>00.0000, 00.0000</p>
								)}

								<p>{formData.camera ? formData.camera : 'Camera'}</p>
								<p>
									{formData.keywords
										? formData.keywords.map((keyword) => {
												return '#' + keyword.toString() + ' ';
										  })
										: '#Keywords'}
								</p>
							</div>
						</div>
					</div>

					<div className='flex flex-col justify-between items-start w-full flex-1'>
						<div className='flex flex-col items-start gap-4 lg:gap-8 w-full'>
							<div className='flex flex-col items-start gap-4 lg:gap-8 w-full'>
								<div className='flex max-lg:flex-col items-start gap-4 w-full'>
									<InputField
										type='text'
										id='title'
										name='title'
										value={formData.title}
										onChange={handleChange}
										label='Title'
									/>

									<InputField
										type='text'
										id='desc'
										name='desc'
										value={formData.desc}
										onChange={handleChange}
										label='Description'
									/>
								</div>
								<div className='flex max-lg:flex-col items-start gap-4 w-full'>
									<ComboBox
										label='Camera'
										options={[
											'Olympus OM-1',
											'Olympus MJU-I',
											'iPhone 14 Pro',
											'iPhone 6s',
											'iPhone 11 Pro',
										]}
										selected={formData.camera}
										onSelectedChange={handleChange}
										name='camera'
									/>

									<input
										className='bg-gray-100 border-2 border-gray-300 rounded-[4px] h-12 px-2 w-full'
										onChange={handleChange}
										type='date'
										name='date'
										id='date'
									/>
								</div>
								<div className='flex flex-col items-start gap-4 w-full'>
									<div className='flex flex-col items-startgap-2 w-full'>
										<KeywordsInput
											formData={formData}
											setFormData={setFormData}
										/>
									</div>
								</div>
							</div>

							<div className='flex flex-col gap-2 w-full'>
								<input
									type='text'
									id='search-bar'
									placeholder='Search location...'
									onChange={(e) => fetchSuggestions(e.target.value)}
									className='bg-gray-100 text-lg border-2 border-gray-300 rounded-[4px] h-12 px-2 w-full placeholder:text-gray-400'
								/>
								<div
									id='suggestions-container'
									className={`flex empty:hidden flex-col top-40 gap-2 border-2 bg-gray-100 border-gray-300 px-2 py-2 rounded-[4px] z-20 [&>p]:hover:bg-gray-200 [&>p]hover:cursor-pointer`}
								></div>
							</div>
							<div
								ref={containerRef}
								id='map'
								className=' w-full h-[300px] rounded-[4px]'
							></div>
							<div className='flex  justify-center items-center w-full'>
								<button
									className='w-full bg-primary-blue px-6 min-w-[120px] h-12 rounded-[4px] text-primary-white font-bold'
									onClick={uploadImage}
									type='button'
									disabled={uploading}
								>
									{uploading ? 'Uploading...' : 'Upload'}
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>

			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message='Image uploaded successfully!'
			/>
		</div>
	);
}
