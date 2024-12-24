import axios from 'axios';
import React, { useRef } from 'react'
import useTokenVerification from '../hooks/useTokenVerification';
import toast, { Toaster } from "react-hot-toast";
export default function Password() {
    const oldRef=useRef();
    const { user, isVerified, isLoading1 } = useTokenVerification();
    const newRef=useRef();
    const confirmRef=useRef();
    const formRef=useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const oldPassword = oldRef.current.value;
        const newPassword = newRef.current.value;
        const confirmPassword = confirmRef.current.value;
        if(newPassword !== confirmPassword){
            toast.error('Passwords do not match!')
            return;
        }
        axios.put('https://baseo.onrender.com/users/change',{
            oldPassword,
            newPassword,
            userId:isVerified && user.userId
        }).then(res=>{
            toast.success('Password changed successfully!')
            formRef.current.reset()
        }).catch(()=>{
            
            toast.error('Failed to change password!')
        })
        formRef.current.reset()
    }
  return (
    <div className='w-[100%] flex flex-col gap-5 '>
         <Toaster
                  toastOptions={{
                    className: "",
                    duration: 5000,
                    style: {
                      background: "#363636",
                      color: "#fff",
                    },
                    success: {
                      duration: 3000,
                      theme: {
                        primary: "green",
                        secondary: "black",
                      },
                    },
                  }}
                />
        <h1 className='text-3xl font-bold tracking-wider'>
        Change Password
        </h1>
        <form ref={formRef} action="" onSubmit={handleSubmit} className='flex flex-col gap-5 w-[60%]'>
            <label for="password" className='flex text-sm flex-col gap-1 w-[100%]'>
                Old Password
                <input type="password" 
                ref={oldRef}
                className='w-[100%] outline-none bg-slate-50 border-[1px] px-5 py-3 rounded-sm border-gray-300'
                id="password" name="password" required />
            </label>
            <label for="password" className='flex text-sm flex-col gap-1 w-[100%]'>
                New Password
                <input type="password" 
                ref={newRef}
                className='w-[100%] outline-none bg-slate-50 border-[1px] px-5 py-3 rounded-sm border-gray-300'
                id="password" name="password" required />
            </label>
            <label for="password" className='flex text-sm flex-col gap-1 w-[100%]'>
                Confirm Password
                <input type="password" 
                ref={confirmRef}
                className='w-[100%] outline-none bg-slate-50 border-[1px] px-5 py-3 rounded-sm border-gray-300'
                id="password" name="password" required />
            </label>
            <button  className='text-white bg-[#5dd13f] px-5 py-3 rounded-md font-bold w-fit'>Change Password</button>
        </form>
  
    </div>
  )
}
