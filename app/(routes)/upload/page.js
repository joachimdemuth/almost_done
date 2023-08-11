'use client';
import React, { useEffect, useState } from 'react';

import InputField from '../../_components/InputField';
import TextArea from '../../_components/TextArea';
import ComboBox from '../../_components/ComboBox';
import 'mapbox-gl/dist/mapbox-gl.css'
import LeftArrow from '../../_assets/icons/Arrow_left.svg';
import Image from 'next/image';
import Link from 'next/link';
import { handleImageCompression } from '../../_lib/imageCompression';
import { useRouter } from 'next/navigation';
import { supabase } from '../../_utils/supabase';
import KeywordsInput from './KeywordComponent';
import Snackbar from '@mui/material/Snackbar';
import checkDevice from '../../_lib/checkDevice';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const mapboxToken =
	'pk.eyJ1IjoiZGpoZXN0IiwiYSI6ImNsbDNpM2xyNTA0a3MzZW1jOXBxb3g2amkifQ.qz9ZHVYASWPzJ0uiwwHDOg';




function Upload({ user }) {
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
	const containerRef = React.useRef(null);
	let currentMarker; // Store the current marker if one exists
	const router = useRouter();

	useEffect(() => {
		const res = supabase.auth.getUser().then((res) => {

			if (res.data.user === null) {
				router.push('/login');
			} else return;
		}
		)

	}, [])
	
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpen(false);
	  };

	useEffect(() => {
		mapboxgl.accessToken = mapboxToken || '';
		const map = new mapboxgl.Map({
			container: 'map', // container ID
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'mapbox://styles/djhest/cll5ax7h400k801ph6hb7dszd', // style URL
			center: [12.55, 55.68], // starting position
			zoom: 12, // starting zoom
		});

		map.on('click', function (e) {
			// If a marker already exists, remove it
			if (currentMarker) {
				currentMarker.remove();
			}
			console.log(e);
			// Create a new marker
			currentMarker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
			console.log(currentMarker);
			setFormData((prevData) => ({ ...prevData, coords: e.lngLat }));
		});

		// Cleanup on unmount
		return () => {
			map.remove();
		};
	}, []);

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

		const {
			newFile: compressedFile,
			width,
			height,
		} = await handleImageCompression(file);

		const { data: uploadedData, error: uploadError } = await supabase.storage
			.from('public-images')
			.upload(`analog/${file.name}`, compressedFile);

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
					file_path: `${file.name}`,
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
		setUploading(false);
		alert('Image uploaded!')
		// when alert is closed, redirect to main hall
		setFormData({
			title: '',
			desc: '',
			camera: '',
			coords: {},
			date: '',
			keywords: [],

		})
		setFile(null)
		setPreviewURL(null)
		setOpen(true)
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	return (
		<>
			<div className=' flex w-full min-h-screen flex-col items-center lg:gap-20 gap-8 px-4 py-20'>
				<div className='flex w-full justify-center items-center flex-row lg:px-20 '>
					<div className='flex w-1/3'>
						<Link href='/main-hall'>
							<Image width={checkDevice === false ? 64 : 48} src={LeftArrow} alt='back' />
						</Link>
					</div>
					<div className='flex w-1/3 justify-center'>
						<h1 className='w-full lg:text-4xl text-center text-[#005cff] text-2xl font-display font-bold '>Upload image</h1>
					</div>
					<div className='flex w-1/3'></div>
				</div>

				<form
					className='flex lg:w-1/2 w-full gap-6 flex-col'
					onSubmit={(e) => e.preventDefault()}
				>
					<div className='flex flex-col'>
						{previewURL ? (
							<div className='flex  items-center flex-col gap-2'>
								<Image
									width={500}
									height={500}
									src={previewURL}
									alt='preview'
									className='w-1/2 h-auto object-cover '
								/>
								<label
									className='flex w-1/2 justify-center items-center text-black bg-red-100 rounded-lg py-2 px-4'
									htmlFor='image'
								>
									<p className='text-center'>Change image</p>
								</label>
							</div>
						) : (
							<label
								className='flex justify-center items-center text-gray-400 border-2 border-gray-300 w-full h-32 bg-gray-100 rounded-lg'
								htmlFor='image'
							>
								<p className='text-center'>Drag and drop or click to select</p>
							</label>
						)}
						<input
							className=' hidden'
							type='file'
							id='image'
							name='image'
							onChange={onFileChange}
						/>
					</div>

					<div className='flex flex-col'>
						<InputField
							type='text'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleChange}
							label='Title'
						/>
					</div>

					<div className='flex flex-col'>
						<TextArea
							type='text'
							id='desc'
							name='desc'
							value={formData.desc}
							onChange={handleChange}
							label='Description'
						/>
					</div>

					<div className='flex flex-col'>
						<KeywordsInput formData={formData} setFormData={setFormData} />

					</div>

					<div className='flex flex-col'>
						<ComboBox
							label='Camera'
							options={['Olympus OM-1', 'Olympus MJU-I', 'iPhone 14 Pro']}
							selected={formData.camera}
							onSelectedChange={handleChange}
							name='camera'
						/>
					</div>
					<div>
						<input className='bg-gray-100 border-2 border-gray-300 rounded-lg h-12 px-2 w-full' onChange={handleChange} type="date" name="date" id="date" />

					</div>

					<div className='flex flex-col'>
						<p className='font-display font-bold'>Choose location</p>
						<div
							ref={containerRef}
							id='map'
							className=' w-full h-[300px]'
						></div>
						<div>
							{formData.coords.lng !== undefined &&  (
								<p className='font-display font-bold'>
									{formData.coords.lng + ', ' + formData.coords.lat}
								</p>
							)}
						</div>
					</div>


					<button
						className='px-8 py-4 bg-[#0057FF] rounded-md text-white font-bold'
						onClick={uploadImage}
						type='button'
						disabled={uploading}
					>
						{uploading ? 'Uploading...' : 'Upload'}
					</button>
				</form>
			</div>

			<Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Image uploaded successfully!"

      />

		</>
	);
}

export default Upload;
