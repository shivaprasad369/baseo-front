import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet } from 'react-router'

export default function Containers() {
  return (
    <div className='w-[100%]  justify-center flex items-center '>

    <div className='w-[100%] flex relative'>
        <div className='w-[20%] h-[100vh] fixed left-0'>
      <Sidebar/>
        </div>
        <div className='w-[80%] relative ml-[19%] flex flex-col '>
      <Topbar/>
<Outlet/>
        </div>
    </div>
    </div>
  )
}
