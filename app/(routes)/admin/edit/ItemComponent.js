import React from 'react';
import Image from 'next/image';
import Delete from '../../../_assets/icons/delete.svg';
const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_BASE_URL;

export default function ItemComponent({ item, handleDeleteItem }) {
	return (
		<div
			key={item.id}
			className='flex flex-row gap-8 items-center h-20 w-full justify-between px-8 py-4 border-b border-primary-blue-20'
		>
            <div className='flex w-12 h-12 overflow-hidden min-w-12 max-w-12 min-h-12 max-h-12'>

			<Image
				src={baseUrl + item?.file_path}
				alt={item.title}
                width={48}
                height={48}
				className=' rounded-[10px]'

                />
                </div>
            <div className='flex flex-row w-full gap-12'>
            <div className='flex flex-col gap-1 flex-1'>
            <p className="text-xs font-bold font-body text-primary-blue">Title</p>
			<p className='text-black text-md font-body'>{item.title}</p>
            </div>
            <div className='flex flex-col gap-1 flex-1'>
            <p className='text-xs font-bold font-body text-primary-blue'>Description</p>
			<p className='text-black text-md font-body'>{item.desc}</p>
            </div>
            <div className='flex flex-col gap-1 flex-1'>
            <p className='text-xs font-bold font-body text-primary-blue'>Date</p>
			<p className='text-black text-md font-body'>{item.time_of_capture}</p>
            </div>
            <div className='flex flex-col gap-1 flex-1'>
            <p className='text-xs font-bold font-body text-primary-blue'>Coords</p>
			<p className='text-black text-md font-body'>{item.coords.lat?.toString().substring(0,7) + ', ' + item.coords.lng?.toString().substring(0,7)}</p>
            </div>
            </div>

<div className='flex w-1/3 h-[32px] justify-center items-center font-body bg-light-blue text-primary-blue-20 rounded-[10px] border border-primary-blue-20 text-base' >
    Hover here for preview
</div>


            <div onClick={() => handleDeleteItem(item.id)} className='flex h-12 w-12 rounded-[10px]'>

            <Image src={Delete} width={24} className=' opacity-20 hover:opacity-100 hover:cursor-pointer' />

                </div>
		</div>
	);
}
