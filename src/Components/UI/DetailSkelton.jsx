import React from 'react'

export default function DetailSkelton() {
  return (
    <div className='w-[100%] px-[8%] py-[3rem] max-w-[1400px] flex items-center justify-center'>
        <div className='w-[100%] flex gap-10'>

        <div className="w-[50%] max-w-sm p-4 border rounded shadow-md bg-white">
    <div className="h-64 bg-gray-300 animate-pulse rounded-lg"></div>
  </div>
  <div className='w-[50%] flex flex-col gap-5'>
     <div className="mt-4 h-12 bg-gray-300 animate-pulse rounded w-3/4"></div>
    <div className="mt-2 h-10 bg-gray-300 animate-pulse rounded w-5/6"></div>
    <div className="h-4 bg-gray-300 animate-pulse rounded w-4/6"></div>
    <div className="h-10  bg-gray-300 animate-pulse rounded w-3/6"></div>

  </div>
        </div>
    </div>
  )
}
