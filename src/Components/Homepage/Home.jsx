import React, { useState } from 'react'
import useTokenVerification from '../hooks/useTokenVerification';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie'
export default function Home() {
  const [show,setShow]=useState(false)
  const navigate=useNavigate()
  const { isVerified, isLoading1,user ,error,setUser,setIsVerified } = useTokenVerification();
  console.log(isVerified)
  const handleLogout=()=>{
    localStorage.removeItem("token");
    setIsVerified(false);
    setUser(null);
    Cookies.remove('userId')
  navigate('/')
  window.location.reload();
  }
  return (
    <header className='w-[100%] flex items-center justify-center '>
      <div className='max-w-[1400px] w-[1400px] bg-[#5BB300] text-white max-xl:px-[3%] xl:px-[7%] py-3 '>
        <div className='w-[100%] flex items-center justify-between'>
        <p className='text-sm font-bold'>Free Delivery on orders above $50.00</p>
<div className='flex items-center text-sm tracking-wider font-semibold gap-2'>
{!isLoading1 && !isVerified && <><a href="/login">Login</a> / <a href="/register">SignUp</a></>}
{!isLoading1 && isVerified && <div className='flex  gap-3 relative items-center justify-center'>
        <h1 onClick={()=>setShow(()=>!show)} className='cursor-pointer' key={user.userId}>{user.email}</h1><IoMdArrowDropdown  />
       {show &&
        <div className='absolute flex flex-col gap-3 w-[100%] z-30 text-center right-0 top-[1.5rem] p-2 text-md font-bold bg-[#5BB300] text-white ' >
          <a href='/dashboard'>Dashborad</a>
          <a href='/user/profile/35'>Profile</a>
          <a href='/user/list'>My Orders</a>
          
         <span onClick={handleLogout} className='cursor-pointer'>
         Logout
          </span> 
          </div>}
   </div> }
</div>
        </div>


      </div>
    </header>
  )
}
