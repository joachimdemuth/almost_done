'use client';
import React, { useState, useEffect } from 'react';
import {supabase} from '../../../_utils/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import checkDevice from '../../../_lib/checkDevice';
import LeftArrow from '../../../_assets/icons/Arrow_left.svg'
import Image from 'next/image';
import ItemComponent from './ItemComponent';
const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_BASE_URL;


export default function Edit() {
const [allImages, setAllImages] = useState([]);
    const router = useRouter();


    useEffect(() => {
		const res = supabase.auth.getUser().then((res) => {
			if (res.data.user === null) {
				router.push('/login');
			} else return;
		});
	}, [router]);

    useEffect(() => {
        const fetchDataFromDB = async () => {
            const { data, error } = await supabase
            .from('images_metadata').select('*');

            if (error) {
                console.error('error fetching images: ', error);
            } else {
                setAllImages(data);
            }
        }
        fetchDataFromDB();
    }, []);

    const handleDeleteItem = async (id) => {
        const { data, error } = await supabase
        .from('images_metadata')
        .delete()
        .match({ id: id });

        if (error) {
            console.error('error deleting image: ', error);
        } else {
            console.log('image deleted: ', data);
        }
         
        setAllImages(allImages.filter(image => image.id !== id));
    }

return (
    <div className='flex w-full min-h-screen items-center justify-center flex-col gap-20'>
    {/* HEADER */}

			<div className='flex w-full justify-between items-center flex-row px-6 py-6 lg:py-12 lg:px-20'>
            <div className='flex w-1/3 items-center justify-start'>
                <Link href='/admin'>
                    <Image
                        width={checkDevice === false ? 64 : 48}
                        src={LeftArrow}
                        alt='back'
                    />
                </Link>
            </div>
            <div className='flex w-1/3 justify-center items-center'>
                <h1 className='w-full lg:text-[32px] text-center text-primary-blue text-2xl font-display font-bold '>
                    Edit images 
                </h1>
            </div>
            <div className='flex w-1/3'></div>
        </div>
    <div className='flex w-full min-h-screen items-center flex-col'>
        {allImages.map((image) => (
            <ItemComponent key={image.id} item={image} handleDeleteItem={handleDeleteItem} />
          
        ))}
    </div>
    </div>
)

}