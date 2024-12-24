import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { handleToggle } from '../store/Cart';
import useTokenVerification from '../hooks/useTokenVerification';
import DetailSkelton from '../UI/DetailSkelton';
import toast, { Toaster } from 'react-hot-toast';
export default function Products() {
  const { id,aid } = useParams();
  const { isVerified, isLoading1,user } = useTokenVerification();
  const queryClient = useQueryClient();
 const toggle= useSelector(state=>state.cart.toggle)
 const dispatch= useDispatch()
  const [number, setNumber] = useState({
    qty:1,
    action:'increment'
  }); // Local state for product quantity
 

  const { isLoading, error, data } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: async () => {
      try {
        const res = await axios.get(`https://baseo.onrender.com/product-attribute/${id}`);
        return res.data || [];
      } catch (error) {
        console.error("Error fetching product details:");
        return [];
      }
    },
  });
  // console.log(!isLoading && data, id,aid)

  const handleAddToCart = async() => {
    // Check if the user ID cookie exists

     let userId = Cookies.get('userId');
     if (!userId) {
       // Request a new ID from the backend
       const response = await axios.get('https://baseo.onrender.com/generate-id');
       userId = response.data.id;
       
       // Store the new ID in a cookie
       Cookies.set('userId', userId, { expires: 2, path: '/' }); // Expires in 7 days
       console.log('New ID generated and stored:', userId);
     }

       try {
        const cartItem = {
          ProductAttributeID: Number(aid),
          ProductID:data[0].ProductID,
          UserID: isVerified?user.userId:1, // Replace with actual UserID
          Price: data[0].SellingPrice,
          Qty: number.qty, // Use the selected quantity
          ItemTotal: Number(data[0].SellingPrice) * number,
          CartDate: new Date(),
          TranxRef: `TRX-${Date.now()}-${Math.floor(Math.random() * 10000)}`, // Unique reference
          WebsiteType: 1,
          Voucherprice: data[0].Voucherprice,
          CartNumber:userId
        };
        console.log(toggle)
        
        const insertResponse = await axios.post(`https://baseo.onrender.com/store-cart?id=${isVerified?user.userId:1}`, { cartItems: cartItem });
       if(insertResponse){
        queryClient.invalidateQueries('cart-details');
         dispatch(handleToggle())
         toast.success("Added Successfully")
         return insertResponse.data;
       }
      } catch (error) {
        console.error('Error generating ID:');
      }
    //  else {
    //  const id=Number(aid)
    //   const response = await axios.put('https://baseo.onrender.com/update-quantity', {id,userId, number });
    //   return response.data;
    }
  const handleIncrement = () => {
    setNumber({qty:number.qty+1,action:'increment'})
 }; 
  const handleDecrement = () => {
    if(number.qty>1){
      setNumber({qty:number.qty-1,action:'decrement'})
    }
  
  };
  if (isLoading) return <DetailSkelton/>;
  if (error) return <div>Error fetching product details.</div>;
  return (
    <section className="w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-[1400px] w-full flex flex-col gap-10 px-[7%] py-[3rem]">
      <Toaster />
        {data && (
          <div className="w-full flex gap-5">
            <div className="w-[50%] h-[30rem] border border-gray-300 flex items-center justify-center">
              <img
                src={`https://baseo.onrender.com/${data[0]?.Image}`}
                alt={data[0]?.ProductName || "Product"}
                className="w-[50%]"
              />
            </div>
            <div className="w-[50%] flex flex-col gap-5">
              <h1 className="text-4xl font-bold tracking-wider">{data[0]?.ProductName}</h1>
              <span className="mt-5 text-4xl font-bold text-[#98d820]">${data[0]?.SellingPrice}</span>
              <div className="flex mt-5 items-center">
                <button
                  onClick={handleDecrement}
                  className="w-[3rem] h-[3rem] flex items-center justify-center border border-gray-400"
                >
                  <FaMinus />
                </button>
                <div className="w-[3rem] h-[3rem] flex items-center justify-center border border-gray-400">
                  <span>{number.qty}</span>
                </div>
                <button
                  onClick={handleIncrement}
                  className="w-[3rem] h-[3rem] flex items-center justify-center border border-gray-400"
                >
                  <FaPlus />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-[60%] py-3 text-white text-xl text-center font-bold hover:bg-black duration-500 cursor-pointer rounded-md bg-[#5dff2b]"
              >
                Buy Now
              </button>
              <h1 className="text-lg font-bold tracking-wider">Specification</h1>
              <div className="flex flex-col gap-2">
                {data.map((spec, index) => (
                  <h1 key={index}>
                    {spec.AttributeName} - {spec.AttributeValue}
                  </h1>
                ))}
              </div>
            </div>
          </div>
        )}
        <div>
          {!isLoading && (
            <div dangerouslySetInnerHTML={{ __html: data[0]?.Description || "" }} />
          )}
        </div>
      </div>
    </section>
  );
}
