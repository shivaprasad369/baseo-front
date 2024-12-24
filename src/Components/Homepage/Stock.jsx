import { useQuery } from 'react-query'
import axios from 'axios';
import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';



// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function Stock() {
    const { isLoading, error, data } = useQuery({
        queryKey: ["category"],
        queryFn: async()=>{
            try {
                const res=await axios.get('https://baseo.onrender.com/stock-products')
                if(res){
                    return res.data
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                
            }
        },
      });
  
  return (
    <section className='w-[100%] flex items-center justify-center overflow-hidden'>
        <div className="w-[100%] flex items-center  justify-center px-[7%] py-[3rem]">
            <div className='w-[100%] flex items-center flex-col gap-10 justify-center'>
                <h1 className='text-4xl font-bold text-center '>Back In Stock</h1>
             {!isLoading &&   <div className='w-[100%]  items-center'>
                <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        speed={"900"}
        
        navigation={true}
        modules={[ Navigation]}
        className="mySwiper w-[100%] flex overflow-hidden"
      >

                 {data?.map((data,index)=>  
        <SwiperSlide key={data.ProductID} >
                     <div key={data.ProductID} className='w-[100%] relative  flex flex-col border-[1px] rounded-sm p-3 hover:shadow-2xl duration-500'>
                        <div className='absolute top-[1rem] right-[1.5rem] px-2 py-[2px] text-xs rounded-full bg-red-500 text-white'>
                            {data.DiscountPercentage}% off

                        </div>
                         <div className='w-[100%] h-[15rem] flex items-center justify-center'>
                            <img src={'https://baseo.onrender.com/'+data.Image} className='w-[50%]' alt={data.ProductName} />
                        </div>
                        <div className='flex flex-col gap-3 items-center justify-center'>
                            <h1 className='w-[100%] text-md tracking-wider text-center capitalize'>
                          {data?.ProductName}
                            </h1>
                            <div className='w-[100%] flex gap-2 items-center justify-center'>
                                <span className='text-green-500 text-xl font-bold'>
                                 ${data.Sellingprice}
                                </span>
                                <span className='text-xl font-semibold line-through text-gray-600'>
                                  ${data.ProductPrice}
                                </span>

                            </div>
                                <div className='w-[100%] flex gap-2 items-center justify-center'>
                                    <div className='flex gap-1 text-md text-[#e0d41f]'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    </div>
                                    <span>
                                        5.0(5)
                                    </span>
                                </div>
                        </div>
                    </div>
        </SwiperSlide>
                    )}
</Swiper>
                </div>}

            </div>
        </div>
      
    </section>
  )
}
