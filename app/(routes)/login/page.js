
'use client'
import React, {useState, useEffect} from 'react';
import { supabase } from '../../_utils/supabase';
import { useRouter } from 'next/navigation';
import Image from "next/legacy/image";
import bg from '../../_assets/bg_image/italy-18.webp'


export default function Login() {

const [inputEmail, setInputEmail] = useState('');
const [inputPassword, setInputPassword] = useState('');

const router = useRouter();

useEffect(() => {
const checkAuth = async () => {

const { data, error } = await supabase.auth.getUser()

if(data.user === null) {

    return;
} 
if(data.user.role === "authenticated") {
    router.push('/upload')
}
}
checkAuth();

}, [router])

const handleSubmit = async (e) => {
    
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: inputEmail,
        password: inputPassword,
      })

      if(data) {
        router.push('/upload')
      }
   
   
}

  const handleInputChange = (e) => {
    if (e.target.id === 'email') {
        setInputEmail(e.target.value);
    } else if (e.target.id === 'password') {
        setInputPassword(e.target.value);
    }
}


return (
  // a modern looking login form with email and password fields

  <div className="flex flex-row items-center justify-center w-full min-h-screen overflow-hidden">
    <div className='flex h-screen flex-row overflow-hidden'> 
    <Image className='flex-1 max-h-screen object-contain w-auto' src={bg} alt="background" width={2000}  />
    </div>


    <main className="flex bg-gray-100 h-screen flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <div className='flex flex-col bg-white p-20 box-border rounded-xl gap-12'>
      <div className='flex flex-col'>

      <h1 className="xl:text-6xl lg:text-3xl font-bold">
        Welcome to{' '}
        <span className="text-blue-600" >
          Almost Done
        </span>
      </h1>

      <p className="mt-3 xl:text-2xl lg:text-lg">
        Log in to upload your photos!
      </p>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-80 h-12 px-3 mb-4 placeholder-gray-400 border rounded-lg focus:shadow-outline"
            onChange={handleInputChange}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"

            className="w-80 h-12 px-3 mb-16 placeholder-gray-400 border rounded-lg focus:shadow-outline"
            onChange={handleInputChange}
          />
          <button
            type="submit"

            className="w-80 h-12 px-6 text-lg text-white transition duration-500 ease-in-out bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:shadow-outline"
          >
            Log in
          </button>
        </form>
      </div>
      </div>

    </main>

    
  </div>

    )
}