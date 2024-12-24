import React from 'react'
import { Outlet } from 'react-router'

export default function Auth({isAdmin}) {
  return (
    <div className='w-[100%] flex items-center justify-center '>
      <div className='w-[100%] max-w-[1400px]'>

      {/* {isAdmin?'Authenticated':' not'} */}
      <Outlet/>
      </div>
    </div>
  )
}
