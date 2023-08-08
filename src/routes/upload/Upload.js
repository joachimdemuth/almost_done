import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import InputField from '../../components/InputField';
import TextArea from '../../components/TextArea';
import ComboBox from '../../components/ComboBox';
// const supabaseUrl = 'https://asjnslnbgpdangbjchiu.supabase.co';
// const supabaseKey =
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzam5zbG5iZ3BkYW5nYmpjaGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0MTU3MTMsImV4cCI6MjAwNjk5MTcxM30.e5rwQT1rrSFy0MHAetAaJCBPfp70VJ29L-XPS_1CJqs';
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

function Upload() {
	const [formData, setFormData] = useState({
		title: '',
		desc: '',
		camera: '',
		coords: '',
	});
	const [previewURL, setPreviewURL] = useState(null); 
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);

	const onFileChange = (event) => {
		if(!event.target.files[0]) return;
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
		const { data: uploadedData, error: uploadError } = await supabase.storage
			.from('public-images')
			.upload(`analog/${file.name}`, file);

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
				},
			]);

		if (metadataData) {
			console.log('Metadata uploaded:', metadataData);
		}

		if (metadataError) {
			console.error('Error uploading metadata', metadataError);
		}
		setUploading(false);
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	// Handle form submission logic here (e.g., sending the data to an API)

	// 	const { data, error } = await supabase
	// 		.from('Photos')
	// 		.insert([
	// 			{
	// 				imageUrl: formData.imageUrl,
	// 				title: formData.title,
	// 				desc: formData.desc,
	// 				camera: formData.camera,
	// 				coords: formData.location,
	// 			},
	// 		])
	// 		.select();

	// 	console.log(formData);
	// };
	return (
		<div className=' flex w-full min-h-screen flex-col items-center gap-6 py-20'>
			<h1 className=' text-4xl font-display font-bold '>Upload image</h1>

			<form
				className='flex w-1/2 gap-6 flex-col'
				onSubmit={(e) => e.preventDefault()}
			>
				<div className='flex flex-col'>
						{previewURL ? (
							<div className="flex flex-col gap-2">
							<img src={previewURL} alt='preview' className='w-full h-auto object-cover ' />
							<label className='flex justify-center items-center text-black w-full bg-red-100 rounded-lg py-2 px-4' htmlFor='image'>

								<p className='text-center'>Change image</p>
					</label>
							</div>
						) : (
							<label className='flex justify-center items-center text-gray-400 border-2 border-gray-300 w-full h-32 bg-gray-100 rounded-lg' htmlFor='image'>
							<p className='text-center'>Drag and drop or click to select</p>
					</label>
						)}
					<input
						className=' hidden'
						type='file'
						id='image'
						name='image'
						onChange={onFileChange}
						required
					/>
				</div>

				<div className='flex flex-col'>
					<InputField
						type='text'
						id='title'
						name='title'
						value={formData.title}
						onChange={handleChange}
						required
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
						required
						label='Description'
					/>
				</div>

				<div className='flex flex-col'>
				
					
				<ComboBox
						label='Camera'
						options={['Olympus OM-1', 'Olympus MJU-I', 'iPhone 14 Pro']}
						selected={formData.camera}
						onSelectedChange={handleChange}
						name="camera"
					/>
				</div>

				<div className='flex flex-col'>
				
					<InputField type='text' id='coords' name='coords' value={formData.coords} onChange={handleChange} required label='Location' />
				</div>
				{/* <div>
        <label htmlFor="keywords">Keywords:</label>
        <input
          type="text"
          id="keywords"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          required
          />
      </div> */}

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
	);
}

export default Upload;
