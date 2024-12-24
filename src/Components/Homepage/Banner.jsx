import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination } from 'swiper/modules';
import axios from 'axios';

export default function Banner() { 
    const [images,setImages]=useState([])
    const [load,setLoad]=useState(false)
    const handleGetImages = async () => {
        try {
            
            const response = await axios.get('https://baseo.onrender.com/banners');
            if(response)
            {
                setImages(response.data);
                setLoad(true);

            }
        } catch (error) {
            console.error(error);
            setLoad(true);

                  
        }
    }

    useEffect(()=>{
        handleGetImages();
    },[])
    if(!load){
        return  <div className="w-[100%] px-[8%] py-[3rem]  rounded shadow-md bg-white">
        <div className="h-[25rem] bg-gray-300 animate-pulse rounded-lg"></div>
      </div>
    }
  return (
    <section className='w-[100%] flex items-center justify-center overflow-hidden'>
        <div className='flex w-[100%] max-w-[1400px] items-center max-xl:px-[3%] mt-[2rem] xl:px-[7%]'>
            <div className='w-[100%] flex items-center max-xl:h-[20rem] xl:h-[25rem]'>
            <Swiper
        slidesPerView={1}
        spaceBetween={0}
        speed={'900'}
        loop={true}
        pagination={{
          clickable: true,
        }}
       
        modules={[Pagination]}
        className="mySwiper h-[100%] w-[100%]"
      >
            {load && images?.map((data,index)=><SwiperSlide key={data.BannerId}>
                <img src={"https://baseo.onrender.com"+data?.BannerImage} alt={data.BannerTitle} className='w-[100%] h-[100%] object-cover'/>
            </SwiperSlide>)}
       </Swiper>          
            </div>

        </div>
      
    </section>
  )
}
