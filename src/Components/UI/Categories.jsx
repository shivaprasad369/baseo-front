import { useQuery } from 'react-query'
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router'

export default function Categories() {
   const {id,name,subid}= useParams()
   const { isLoading, error, data } = useQuery({
    queryKey: ["product-category"],
    queryFn: async () => {
      try {
        const res = await axios.get("https://baseo.onrender.com/categories/"+id);
        return res.data || [];
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    },
  });
  return (
    <div className='w-[100%] grid grid-cols-5 gap-5'>
        {!isLoading ? data[0]?.SubCategories?.map((data)=>
        <a href={`/product/${id}/${name}/${data.CategoryID}/${data.CategoryName}`} key={data.CategoryID} className='w-[100%] flex flex-col gap-2 items-center justify-center'>
            <div className='w-[100%] border-[1px] border-gray-300 h-[9rem] flex flex-col items-center justify-center'>
                <img src={data?.Image ? `https://baseo.onrender.com/${data?.Image}`:require('../../images/mobile-phones/sample.png')} className='w-[50%]' alt={data.CategoryName} />
            </div>
            <h1>
                {data?.CategoryName}
            </h1>

        </a>
        )
        :<h1>Loading</h1>}
      
    </div>
  )
}
