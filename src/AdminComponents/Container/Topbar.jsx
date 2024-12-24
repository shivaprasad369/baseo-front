import React from 'react'
import { IoMenu } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'

export default function Topbar() {
  return (
    <div className='w-[80%] fixed top-0 left-[20%] flex bg-[#252525] h-[3rem] px-3 items-center justify-between overflow-hidden'>
      <div className='flex text-white font-semibold  items-center justify-center gap-5'>
      <IoMenu className='' /> <span>Admin Area</span>
      </div>
      <div className='text-white font-bold pr-2 flex items-center gap-5'>
        <span>Admin</span><MdLogout />
      </div>
    </div>
  )
}
