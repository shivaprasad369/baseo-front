import { useQuery } from 'react-query';
import axios from "axios";
import React from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Brand() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      try {
        const res = await axios.get("https://baseo.onrender.com/brands");
        if (res) {
          return res.data;
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  });

  return (
    <section className="w-[100%] flex items-center justify-center overflow-hidden">
      <div className="w-[100%] flex items-center  justify-center max-xl:px-[3%] xl:px-[7%] py-[3rem]">
        <div className="w-[100%] flex items-center flex-col gap-10 justify-center">
          <h1 className="text-4xl font-bold text-center ">Featured Brands</h1>
          {!isLoading && (
            <div className="w-[100%]  items-center">
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                loop={true}
                speed={"900"}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper w-[100%] flex overflow-hidden"
              >
                {data?.map((data, index) => (
                  <SwiperSlide key={data.ProductID}>
                    <div
                   
                      className="w-[100%] relative  flex flex-col border-[1px] rounded-sm p-3 hover:shadow-2xl duration-500"
                    >
                      <div className="w-[100%] h-[5rem] flex items-center justify-center">
                        <img
                          src={"https://baseo.onrender.com" + data.BrandImage}
                          className=""
                          alt={data.ProductName}
                        />
                      </div>
                     
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
