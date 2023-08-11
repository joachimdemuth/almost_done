
'use client'
import React, {useState, useEffect} from 'react';
import { supabase } from '../../_utils/supabase';
import { useRouter } from 'next/navigation';



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

  <div className="flex flex-col items-center justify-center min-h-screen py-2">


    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1 className="text-6xl font-bold">
        Welcome to{' '}
        <a className="text-blue-600" href="https://analog.gallery">
          Analog Gallery!
        </a>
      </h1>

      <p className="mt-3 text-2xl">
        Log in to upload your photos!
      </p>

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

            className="w-80 h-12 px-3 mb-4 placeholder-gray-400 border rounded-lg focus:shadow-outline"
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
    </main>

    
  </div>

    )
}