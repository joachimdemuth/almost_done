'use client';
import React, { useState, useEffect } from 'react';
import {supabase} from '../../_utils/supabase';
import { useRouter } from 'next/navigation';
import LeftArrow from '../../_assets/icons/Arrow_left.svg'



export default function Admin() {

    const router = useRouter();


    useEffect(() => {
		const res = supabase.auth.getUser().then((res) => {
			if (res.data.user === null) {
				router.push('/login');
			} else return;
		});
	}, [router]);


return (
 <div className='flex w-full min-h-screen items-center justify-center flex-col gap-20'>
    <div className='flex flex-col gap-2 items-center text-primary-blue'>

    <h1 className='font-bold font-display text-4xl'>Welcome to Almost Done Admin</h1>
    <p className='font-body text-lg'>Click to choose where to go from here</p>
    </div>
    <div className='flex flex-row items-center justify-center gap-12'>
        <div onClick={() => router.push('./admin/edit')} className=' w-[200px] h-[200px] border-2 rounded-[10px] flex justify-center items-center font-bold font-display text-3xl text-primary-blue hover:cursor-pointer'>Edit</div>
        <div onClick={() => router.push('./admin/upload')} className='w-[200px] h-[200px] border-2 rounded-[10px] flex justify-center items-center font-bold font-display text-3xl text-primary-blue hover:cursor-pointer'>Upload</div>
    </div>
    <div onClick={() => router.push('./')} className='flex min-w-40 h-12 rounded-[10px] bg-primary-blue font-bold text-primary-white px-4 justify-center items-center hover:bg-button-hover hover:cursor-pointer'>
        Go back to the website
    </div>
    </div>   
)

}