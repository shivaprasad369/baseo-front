import React from 'react'

export default function NotFoundPage () {
    document.title='Error | BaseO'
  return (
    <div className='w-[100%]  max-w-[1400px] px-[8%]   flex items-center justify-center'>
        <div className='w-[100%] items-center justify-center py-[5rem] flex flex-col gap-1'> 
            <h1 className='text-4xl font-bold tracking-wider '>Oops! Something went wrong.</h1>
      <p className='text-sm font-normal tracking-wider'>We're sorry, but an unexpected error has occurred. Please try again later.</p>
        </div>
    </div>
  )
}
