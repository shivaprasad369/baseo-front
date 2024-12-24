import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import useTokenVerification from '../hooks/useTokenVerification';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import confetti from 'canvas-confetti';
import Cookies from 'js-cookie'
export default function Success() {
    const { isVerified, isLoading1, user } = useTokenVerification();
    const {id}=useParams()
    const navigate=useNavigate()
    const [load, setLoad]=useState(true)
    const [users,setUser]=useState('')
    console.log(!load && users)
    const product = localStorage.getItem('cart');
    const products=JSON.parse(product)
    const detail =localStorage.getItem('shipping')
    const details = JSON.parse(detail)
    confetti({
        particleCount: 1000,
        startVelocity: 30,
        spread: 860,
        origin: {
          x: Math.random(),
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.2
        }
      });
    useEffect(()=>{
        const getUser=async()=>{
            const response=await fetch(`https://baseo.onrender.com/order?orderId=${id}`)
            if(!response.ok){
                throw new Error('Failed to fetch user')
                setLoad(false)
            }
            else{
                const data=await response.json()
                setLoad(false)
                setUser(data)
                await fetch('https://baseo.onrender.com/order/api/place-order',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        userEmail:users[0]?.EmailID,
                        userName:users[0]?.FirstName+ " "+users[0]?.LastName,
                        orderDetails:{
                            orderId:id,
                            totalPrice: details?.GrandTotal,
                            products:!load && products?.map((data)=>data.ProductName)
                        }
                    })
                }).then((data)=>{
                    // alert('order placed successfull');
                    localStorage.removeItem('cart');
                    localStorage.removeItem('shipping');
                    Cookies.remove('orderId')
                    setTimeout(()=>{
                    navigate('/')

                    },5000)
                })

            }

        }
        getUser()
    },[id,load])
      useEffect(() => {
        if (!isLoading1 && !isVerified) {
          return navigate("/login");
        }
       
      }, [isVerified, isLoading1]);
  return (
    <section className='flex w-[100%] items-center justify-center overflow-hiddden'>
      <div className="w-[1005] max-w-[1400px] flex flex-col gap-3 py-[3rem] px-[6%] items-center justify-center">
        <div className="w-[3rem] text-white text-2xl h-[3rem] rounded-full items-center flex justify-center bg-[#539713]">
            <FaCheck />
            </div>
            <span className='text-2xl font-bold tracking-wide'>#{id}</span>
            <p className='text-4xl fomt-light tracking-wide '>Order has been placed successfully</p>
            <span className='text-md tracking-wider'>
            Thank you for your order
            </span>
            <span className='text-md tracking-wider'>

            A confirmation e-mail will be sent to you for your order
            </span>
            <span className='text-md tracking-wider'>

If you any questions or concerns regarding your order, please e-mail Contact@BaseO with your order numbe
            </span>
            <div className='text-sm text-white font-bold tracking-wider mt-10 px-5 py-3 rounded-md  bg-[#539713]'>
                <a href='/'> 
                    Return to Dashboard</a>
            </div>
      </div>
    </section>
  )
}
