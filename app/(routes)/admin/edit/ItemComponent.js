import React, {useState} from 'react';
import Image from 'next/image';
import Delete from '../../../_assets/icons/delete.svg';
const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_BASE_URL;

export default function ItemComponent({
	item,
	handleDeleteItem,
    previewUrl
}) {

const [showPreview, setShowPreview] = useState(false);

const handleShowPreview = (id) => {
	setShowPreview(!showPreview);
}



	return (
		<div
			key={item.id}
			className='flex flex-row items-center w-full gap-8 px-2 py-4 border-b border-primary-blue-20'
		>
			<div className='flex justify-start items-start relative w-12 h-12 rounded-[10px] overflow-clip'>
				<Image
					src={baseUrl + item?.file_path}
					alt={item.desc}
					fill
					objectFit='cover'
				/>
			</div>

			<div className='flex flex-row w-full items-center gap-12'>
				<div className='flex flex-col gap-1 flex-1'>
					<p className='text-xs font-bold font-body text-primary-blue'>Title</p>
					<p className='text-black text-sm font-body'>{item.title}</p>
				</div>
				<div className='flex flex-col gap-1 flex-1'>
					<p className='text-xs font-bold font-body text-primary-blue'>
						Description
					</p>
					<p className='text-black text-sm font-body'>{item.desc}</p>
				</div>
				<div className='flex flex-col gap-1 flex-1'>
					<p className='text-xs font-bold font-body text-primary-blue'>Date</p>
					<p className='text-black text-sm font-body'>{item.time_of_capture}</p>
				</div>
				<div className='flex flex-col gap-1 flex-1'>
					<p className='text-xs font-bold font-body text-primary-blue'>
						Camera
					</p>
					<p className='text-black text-sm font-body'>{item.camera}</p>
				</div>
				{/* <div className='flex flex-col gap-1 flex-1'>
            <p className='text-xs font-bold font-body text-primary-blue'>Coords</p>
			<p className='text-black text-md font-body'>{item.coords.lat?.toString().substring(0,7) + ', ' + item.coords.lng?.toString().substring(0,7)}</p>
            </div> */}

			<div
				id='hover-button'
				onMouseEnter={() => handleShowPreview(item.id)}
				onMouseLeave={() => handleShowPreview(item.id)}
				className='flex relative w-1/4 h-[32px] justify-center items-center font-body bg-light-blue text-primary-blue rounded-[10px] border border-primary-blue text-xs hover:cursor-pointer'
				>
				Hover here for preview

            {showPreview && (
				<img id="previewImage" src={baseUrl + item.file_path} alt="Preview" className='absolute top-[100%] right-[100%] max-w-[300px] z-20' />
				)}
			</div>

			<div
				onClick={() => handleDeleteItem(item.id)}
				className='flex h-12 w-12 justify-center items-center rounded-[10px] hover:bg-[#649dff] hover:cursor-pointer'
				>
				<Image
					alt='Delete button'
					src={Delete}
					width={24}
					height={24}
					
					/>
			</div>
					</div>
		</div>
	);
}
