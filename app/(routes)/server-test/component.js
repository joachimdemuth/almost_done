'use client'
 
import { useState } from 'react'
import Masonry from 'react-masonry-css';

export default function Component({ children }) {
  const [count, setCount] = useState(0)
 
  return (
    <div>
  <Masonry
					breakpointCols={3}

					className='flex w-full lg:px-20 justify-between items-center lg:py-10'
				>

      {children}
        </Masonry>
    </div>
  )
}