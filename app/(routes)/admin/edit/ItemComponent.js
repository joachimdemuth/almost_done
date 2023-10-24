import React, {useState} from 'react';
import Image from 'next/image';
import Delete from '../../../_assets/icons/delete.svg';
const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_BASE_URL;

export default function ItemComponent({
	item,
	handleDeleteItem,
	handleShowPreview,
    previewUrl
}) {

const [showPreview, setShowPreview] = useState(false);




	return (
		<div
			key={item.id}
			className='flex flex-row gap-8 items-center h-20 max-h-20 w-full justify-between px-8 py-4 border-b border-primary-blue-20'
		>
			<div className='flex min-w-12 h-12 overflow-hidden'>
				<Image
					src={baseUrl + item?.file_path}
					alt={item.desc}
					width={48}
					height={48}
					className=' rounded-[10px] h-auto w-auto'
				/>
			</div>
			<div className='flex flex-row w-full gap-12'>
				<div className='flex flex-col gap-1 flex-1'>
					<p className='text-xs font-bold font-body text-primary-blue'>Title</p>
					<p className='text-black text-md font-body'>{item.title}</p>
				</div>
				<div className='flex flex-col gap-1 flex-1'>
					<p className='text-xs font-bold font-body text-primary-blue'>
						Description
					</p>
					<p className='text-black text-md font-body'>{item.desc}</p>
				</div>
				<div className='flex flex-col gap-1 flex-1'>
					<p className='text-xs font-bold font-body text-primary-blue'>Date</p>
					<p className='text-black text-md font-body'>{item.time_of_capture}</p>
				</div>
				<div className='flex flex-col gap-1 flex-1'>
					<p className='text-xs font-bold font-body text-primary-blue'>
						Camera
					</p>
					<p className='text-black text-md font-body'>{item.camera}</p>
				</div>
				{/* <div className='flex flex-col gap-1 flex-1'>
            <p className='text-xs font-bold font-body text-primary-blue'>Coords</p>
			<p className='text-black text-md font-body'>{item.coords.lat?.toString().substring(0,7) + ', ' + item.coords.lng?.toString().substring(0,7)}</p>
            </div> */}
			</div>

			<div
				id='hover-button'
				onMouseEnter={() => handleShowPreview(item.id)}
				className='flex w-1/3 h-[32px] justify-center items-center font-body bg-light-blue text-primary-blue-20 rounded-[10px] border border-primary-blue-20 text-base hover:cursor-pointer'
			>
				Hover here for preview
			</div>
            {showPreview && (
            <img id="previewImage" src={previewUrl} alt="Preview" className='absolute top-0 left-0' />
        )}

			<div
				onClick={() => handleDeleteItem(item.id)}
				className='flex h-12 w-12 rounded-[10px]'
			>
				<Image
					alt='Delete button'
					src={Delete}
					width='auto'
					className=' opacity-20 hover:opacity-100 hover:cursor-pointer'
				/>
			</div>
		</div>
	);
}
