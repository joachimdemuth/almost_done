import React, { useState, useEffect } from 'react';
import bgHoriz from './assets/bg_image/italy-35.webp'
import bgVert from './assets/bg_image/italy-24.webp'
import logo from './assets/Logo.svg'
import { Link } from 'react-router-dom';
function App() {
  const [device, setDevice] = useState('')

  useEffect(() => {
    setDevice(checkDevice())
  }, [])
// function that checks if the device is mobile or not
const checkDevice = () => {

    if (window.innerWidth > window.innerHeight) {
        return "horizontal"
    } else {
        return "vertical"
    }
}

// eventlistener that checks if the device is mobile or not when the window is resized
window.addEventListener('resize', () => {
    setDevice(checkDevice())
})



  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center">

    <div className="w-full min-h-screen fixed top-0 left-0 ">
      <img src={device === "horizontal" ? bgHoriz : bgVert } alt="bg" className="w-full min-h-screen object-cover" />
    </div>
    <div className='flex min-w-full min-h-screen justify-center items-center z-10'>
    <svg  className=' w-72 h-auto lg:w-[770px] lg:h-auto' viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 32C43.8366 32 55.2556 25.1921 55.2556 16.3556C55.2556 7.519 43.6588 0 34.8222 0V2.84444C42.2842 2.84445 48.5 8.89358 48.5 16.3556C48.5 23.8175 42.462 30 35 30V32Z" fill="#0057FF"/>
<path d="M21.1185 2.3085C19.2276 -0.769501 17.3909 -0.769498 15.5 2.3085L1.07719 29.9365C0.58691 30.8757 1.26825 32 2.32769 32V32C2.85462 32 3.33762 31.7063 3.5801 31.2385L17.3932 4.58829C18.3398 3.05722 17.9352 3.05721 18.8818 4.58828L32.3249 30.9097C32.6667 31.5788 33.3547 32 34.106 32H34.966C35.5974 32 35.9842 31.3058 35.6531 30.7669L21.1185 2.3085Z" fill="#0057FF"/>
<path d="M32.8222 21.3332C32.8222 22.5114 33.7839 23.4872 34.9491 23.3132C36.5881 23.0684 37.882 22.5601 38.8524 22.006C39.608 21.5745 39.2413 20.6221 38.3712 20.6221H33.5333C33.1406 20.6221 32.8222 20.9404 32.8222 21.3332V21.3332Z" fill="#0057FF"/>
<path d="M42.7778 9.95577C42.7778 11.5267 41.5043 12.8002 39.9333 12.8002C38.3624 12.8002 37.0889 11.5267 37.0889 9.95577C37.0889 8.38486 38.3624 7.11133 39.9333 7.11133C41.5043 7.11133 42.7778 8.38486 42.7778 9.95577Z" fill="#0057FF"/>
<path d="M44.0281 17.8745C44.4399 18.2588 45.8199 19.2582 46.4376 17.3363C46.6137 16.7883 46.5169 16.4523 45.4502 15.7411C44.7391 15.3856 44.7392 14.6744 43.967 15.03C42.9615 16.0967 43.8222 17.6823 44.0281 17.8745Z" fill="#0057FF"/>
<path d="M32.8222 1.42222C32.8222 0.63675 33.4589 0 34.2444 0H35.6667V5.68889C35.6667 6.47436 35.0299 7.11111 34.2444 7.11111C33.4589 7.11111 32.8222 6.47436 32.8222 5.68889V1.42222Z" fill="#0057FF"/>

</svg>
   
    </div>
    <div className="z-10 flex fixed w-full justify-center items-center bottom-12">

    <Link to="/gallery">
    <div className='flex justify-center items-center align-middle bg-slate-100  font-bold border-[#0057FF] w-[80px] h-[80px] px-4 py-4 text-lg text-[#0057FF] rounded-full'>Go to gallery</div>
    </Link>
    </div>
    </div>
  );
}

export default App;
