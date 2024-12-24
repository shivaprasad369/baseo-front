import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className='w-[100%] flex items-center justify-center overflow-hidden'>
      <div className='w-[100%] max-w-[1400px] px-[7%] py-[2rem] bg-black text-white '>
        <div className='w-[100%] grid grid-cols-4 '>
            <div className="w-[100%] flex flex-col gap-5">
                <h1 className='text-xl tracking-wider font-bold uppercase'>categories
                </h1>
                  {  [{
                      id:1,
                        name:' Mobile Phones',
                        href:'#',

                          },
                          {
                            id:2,
                            name:'Games And Consoles',
                            href:'#',
                          },
                          {
                            id:3,
                            name:'Computing',
                            href:'#',
                          },
                          {
                            id:4,
                            name:'Tablets & Accessories',
                            href:'#',
                          },
                          {
                            id:5,
                            name:'Headphones',
                            href:'#',
                          },
                          {
                            id:6,
                            name:'Smartwatches',
                            href:'#',
                          },
                          {
                            id:7,
                            name:'Laptops',
                            href:'#',
                          },
                          {
                            id:8,
                            name:'Printers',
                            href:'#',
                          }
                        ].map((data)=>
                                 
                    <a key={data.id} href={data.href} className='text-md hover:text-green-500 duration-500'>
                        {data.name}
                    </a>
              
                   ) }
            </div>
            <div className="w-[100%] flex flex-col gap-5">
                <h1 className='text-xl tracking-wider font-bold uppercase'>Information
                </h1>
                  {  [{
                      id:1,
                        name:'About Us',
                        href:'#',

                          },
                          {
                            id:2,
                            name:'Contact Us',
                            href:'#',
                          },
                          {
                            id:3,
                            name:`FAQ's`,
                            href:'#',
                          },
                          {
                            id:4,
                            name:'Delivery Information',
                            href:'#',
                          },
                          {
                            id:5,
                            name:'Return Information',
                            href:'#',
                          },
                         
                        ].map((data)=>
                                 
                    <a key={data.id} href={data.href} className='text-md hover:text-green-500 duration-500'>
                        {data.name}
                    </a>
              
                   ) }
            </div>
            <div className="w-[100%] flex flex-col gap-5">
                <h1 className='text-xl tracking-wider font-bold uppercase'>Sell With US
                </h1>
                  {  [{
                      id:1,
                        name:'Seller Login',
                        href:'#',

                          },
                          {
                            id:2,
                            name:'Sell With Us',
                            href:'#',
                          },
                          {
                            id:3,
                            name:`Sitemap`,
                            href:'#',
                          },

                         
                        ].map((data)=>
                                 
                    <a key={data.id} href={data.href} className='text-md hover:text-green-500 duration-500'>
                        {data.name}
                    </a>
              
                   ) }
            </div>
            <div className="w-[100%] flex flex-col gap-5">
                <h1 className='text-xl uppercase tracking-wider font-bold'>Subscribe Newsletter</h1>
                <form action="" className='w-[100%] flex flex-col gap-4'>
                    <input type="text" placeholder='Enter Your Email Address' className='w-[100%] outline-none border-[2px] border-white px-4 py-2 bg-transparent rounded-md' />
                    <button className='w-[100%] rounded-md bg-[#5BB300] green-400 text-lg font-bold uppercase py-2'>Subscribe</button>
                </form>
                <div className='mt-10 flex flex-col gap-5'>
                    <h1 className='text-xl font-bold tracking-wider uppercase'>Follow us on</h1>
                        <div className='mt-1 flex gap-3 item-center'>
                            <div className="w-[2.5rem] text-white h-[2.5rem] flex text-lg items-center justify-center rounded-full hover:bg-[#5BB300] border-[1px] border-white hover:border-transparent duration-500">
                            <FaFacebookF />
                            </div>
                            <div className="w-[2.5rem] text-white h-[2.5rem] flex text-lg items-center justify-center rounded-full hover:bg-[#5BB300] border-[1px] border-white hover:border-transparent duration-500">
                            <FaXTwitter />
                            </div>
                            <div className="w-[2.5rem] text-white h-[2.5rem] flex text-lg items-center justify-center rounded-full hover:bg-[#5BB300] border-[1px] border-white hover:border-transparent duration-500">
                            <FaInstagram  />
                            </div>
                            <div className="w-[2.5rem] text-white h-[2.5rem] flex text-lg items-center justify-center rounded-full hover:bg-[#5BB300] border-[1px] border-white hover:border-transparent duration-500">
                            <FaYoutube />
                            </div>
                            <div className="w-[2.5rem] text-white h-[2.5rem] flex text-lg items-center justify-center rounded-full hover:bg-[#5BB300] border-[1px] border-white hover:border-transparent duration-500">
                            <FaLinkedinIn />
                            </div>

                        </div>
                </div>
            </div>
        </div>
        <div className='flex w-[100%] border-t-[1px] justify-between items-center  pt-[1rem] border-gray-700 mt-4'>
                   <h1 className='text-md font-semibold text-white  '>
                   © 2024 Baseo. All Rights Reserved. Terms and Conditions | Privacy & Cookie Policy
                   </h1>
                   <img src={require('../../images/payment-cards.png')} className='w-[20%]' alt="baseo" />
        </div>
      </div>
    </footer>
  )
}
