import React from 'react'

export default function Forget() {
  return (
    <section className='w-[100%] flex flex-col gap-5 justify-center items-center'>
        <div className='w-[100%] flex flex-col gap-5 max-w-[1400px] px-[8%] '>
            <div className='w-[100%] flex flex-col gap-10 items-center justify-center'>
                <div className='w-[100%] border-b-[1px] border-gray-300 py-2 flex items-center justify-between'>
                    <img src={require('./asset/logo.png')} alt="baseo " className='w-[12rem] ' />
                </div>
                <div className='w-[30%] flex  mt-10  flex-col gap-10 p-[1rem] border-[1px] border-gray-300 
                items-center justify-center '>
                    <h1 className='text-4xl font-light text-gray-500'>Forgot Password</h1>
                    <form action="" className='w-[100%] flex mt-5 flex-col gap-5'>
                        <input type="email" placeholder='Email ID' 
                        className='w-[100%] border-[1px] border-gray-300 py-1 outline-none
                         px-[1rem]' required />
                       
                         <div className='w-[100%] flex justify-between items-center'>

                        <button type='submit' className=' px-5 py-1 w-fit text-white bg-[#21b483]'>Get Password</button>
                        <a href="#" className='text-gray-600 underline hover:text-blue-500'>Back to Log In</a>
                         </div>
                    </form>
                </div>
            </div>
          
        </div>
      
    </section>
  )
}
