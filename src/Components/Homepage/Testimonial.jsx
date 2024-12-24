import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaCircleCheck } from 'react-icons/fa6';
import { useQuery } from 'react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns'; // Import date formatting utility

export default function Testimonial() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['Review'],
    queryFn: async () => {
      try {
        const res = await axios.get('https://baseo.onrender.com/reviews');
        return res?.data || [];
      } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
      }
    },
  });

  if (isLoading) {
    return (
      <section className="w-full flex items-center justify-center py-10">
        <p>Loading testimonials...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full flex items-center justify-center py-10">
        <p>Error loading testimonials. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1400px] px-[7%] py-[3rem] flex flex-col items-center gap-10">
        <h1 className="text-4xl font-bold text-center">
          Trusted by over 30,000 customers
        </h1>
        <div className="flex gap-5 w-full items-center">
          <div className="w-[25%] flex flex-col gap-5 items-center justify-center">
            <h1 className="text-2xl font-bold tracking-wider">Excellent</h1>
            <div className="w-full mt-[-10px] flex justify-center gap-1 items-center">
              {[1, 2, 4, 5, 6].map((_, index) => (
                <img
                  key={index}
                  src={require('../../images/download (1).png')}
                  className="w-[1.5rem]"
                  alt="star"
                />
              ))}
            </div>
            <img
              src={require('../../images/trustpilot-logo.png')}
              className="h-[1.5rem]"
              alt="trustpilot logo"
            />
            <p>
              Based on <strong>15,000 reviews</strong>
            </p>
          </div>
          <div className="w-[75%] flex items-center justify-between">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              speed={900}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper w-full flex overflow-hidden"
            >
              {data?.map((review) => (
                <SwiperSlide key={review.ReviewID}>
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex w-full gap-2 items-center">
                      <div className="flex gap-1 items-center">
                        {[1, 2, 4, 5, 6].map((_, index) => (
                          <img
                            key={index}
                            src={require('../../images/download (1).png')}
                            className="w-[1.3rem]"
                            alt="star"
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FaCircleCheck /> Verified
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm tracking-wider">
                      <span>
                        <strong
                          dangerouslySetInnerHTML={{
                            __html: review.ReviewText,
                          }}
                        ></strong>
                      </span>
                    </div>
                    <div className="flex gap-3 items-start text-sm text-gray-500 tracking-wider">
                      <span>{review.CustomerName}</span>
                      <span>
                        {formatDistanceToNow(new Date(review.CreatedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
