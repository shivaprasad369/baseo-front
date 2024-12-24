import React from 'react'
import { FaCartShopping, FaKey, FaUser } from 'react-icons/fa6'
import { IoPricetags } from "react-icons/io5";
import useTokenVerification from '../hooks/useTokenVerification';
import { useNavigate } from 'react-router';
export default function UserDashboard() {
    const { isVerified, isLoading1,user } = useTokenVerification();
    const navigate=useNavigate()
    if(!isVerified ){
     return navigate('/login')
    }
    if(!isVerified && isLoading1){
        return <>Loading...</>
    }
  return (
    <section className='w-[100%] flex items-center justify-center overflow-hidden '>
        <div className="w-[100%] flex items-center justify-center px-[8%] py-[3rem] max-w-[1400px]">
            <div className='flex flex-col gap-10 w-[100%]'>
              <div className="flex gap-1 text-sm items-center"><a href="/">Home</a> <span>/</span> <span>Dashboard</span></div>
                <h1 className='text-3xl font-bold tracking-wide'>Dashboard</h1>
                <div className='w-[100%] grid grid-cols-4 gap-6'>
                   {data? data.map((data,index)=><div key={data.id} className="border-[1px] border-gray-300 p-[2rem]
                     flex  flex-col gap-2 items-center justify-center">
                        {data.icon}
                        <a href={data.link}>

                        <h1 className='text-xl  mt-2 font-semibold tracking-wide'>{data?.name}</h1>
                        </a>
                        <span className='text-xs tracking-wider'>
                        {data.p}
                        </span>
                     </div>):<>Loading</>}

                </div>
            </div>
        </div>
      
    </section>
  )
}
const data=[
    {
        id:1,
        name:'My Orders',
        p:'View the progress of your orders',
        link:'user/list',
        icon:<FaCartShopping  className='text-2xl'/>
    },
    {
        id:2,
        name:'Voucher List',
        p:'View voucher',
        link:'#',
        icon:<IoPricetags  className='text-2xl'/>
    },
    {
        id:3,
        name:'My Profile',
        p:'Manage your profile information',
        link:`user/profile/35`,
        icon:<FaUser  className='text-2xl'/>
    },
    {
        id:4,
        name:'Change Password',
        p:'Require a new password.',
        link:'user/change-password',
        icon:<FaKey  className='text-2xl'/>
    }
]