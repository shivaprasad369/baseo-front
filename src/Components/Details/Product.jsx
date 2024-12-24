// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { FaMinus, FaPlus } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router';
// import { 
//   addItemToCart, 
//   storeCartInDatabase, 
//   updateQuantity, 
//   updateQuantityInDatabase 
// } from '../store/Cart';

// export default function Product() {
//   const { id,aid } = useParams();
//   const [number, setNumber] = useState(1); // Local state for product quantity
//   const cart = useSelector((state) => state.cart.cartItems);
//   const [userId,setUserId]=useState(1002)
//   const dispatch = useDispatch();

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["product-details", id],
//     queryFn: async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/product-attribute/${id}`);
//         return res.data || [];
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//         return [];
//       }
//     },
//   });
// console.log(!isLoading && data)

//   const handleAddToCart = () => {
//     const cartItem = {
//         ProductAttributeID: Number(aid),
//       ProductID:data[0].ProductID,
//       UserID: userId, // Replace with actual UserID
//       Price: data[0].SellingPrice,
//       Qty: number, // Use the selected quantity
//       ItemTotal: Number(data[0].SellingPrice) * number,
//       CartDate: new Date(),
//       TranxRef: `TRX-${Date.now()}-${Math.floor(Math.random() * 10000)}`, // Unique reference
//       WebsiteType: 1,
//       Voucherprice: data[0].Voucherprice,
//       TempCartID:''
//     };
//   console.log(cart)
//     // Check if item already exists in the cart
//     const existingItem = cart.find(item => item.ProductAttributeID === cartItem.ProductAttributeID);
//   console.log(existingItem)
//     if (existingItem) {
//       alert("This product is already in your cart.");
//     } else {
//       // Dispatch the action to add to cart
//       dispatch(addItemToCart(cartItem));
//       dispatch(storeCartInDatabase(cartItem));
//       console.log(cart);
//     }
//   };
  

//   const handleIncrement = () => {
//     const existingItem = cart.find(item => item.ProductAttributeID === Number(aid));
//     if (existingItem) {
//       const newQty = existingItem.Qty + 1;
//       dispatch(updateQuantity({ ProductAttributeID: existingItem.ProductAttributeID, newQty }));
//       dispatch(updateQuantityInDatabase({ ProductAttributeID: existingItem.ProductAttributeID, newQty,UserId:existingItem.UserID }));
//     }
//   };

//   const handleDecrement = () => {
//     const existingItem = cart.find(item => item.ProductAttributeID === Number(aid));
//     if (existingItem && existingItem.Qty > 1) {
//       const newQty = existingItem.Qty - 1;
//       dispatch(updateQuantity({ ProductAttributeID: existingItem.ProductAttributeID, newQty }));
//       dispatch(updateQuantityInDatabase({ ProductAttributeID: existingItem.ProductAttributeID, newQty,UserId:existingItem.UserID }));
//     }
//   };
  

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching product details.</div>;

//   return (
//     <section className="w-full flex items-center justify-center overflow-hidden">
//       <div className="max-w-[1400px] w-full flex flex-col gap-10 px-[7%] py-[3rem]">
//         {data && (
//           <div className="w-full flex gap-5">
//             <div className="w-[50%] h-[30rem] border border-gray-300 flex items-center justify-center">
//               <img
//                 src={`http://localhost:5000/${data[0]?.Image}`}
//                 alt={data[0]?.ProductName || "Product"}
//                 className="w-[50%]"
//               />
//             </div>
//             <div className="w-[50%] flex flex-col gap-5">
//               <h1 className="text-4xl font-bold tracking-wider">{data[0]?.ProductName}</h1>
//               <span className="mt-5 text-4xl font-bold text-[#98d820]">${data[0]?.SellingPrice}</span>
//               <div className="flex mt-5 items-center">
//                 <button
//                   onClick={handleDecrement}
//                   className="w-[3rem] h-[3rem] flex items-center justify-center border border-gray-400"
//                 >
//                   <FaMinus />
//                 </button>
//                 <div className="w-[3rem] h-[3rem] flex items-center justify-center border border-gray-400">
//                   <span>{cart.find((item) => item.ProductAttributeID ===Number(aid))?.Qty || number}</span>
//                 </div>
//                 <button
//                   onClick={handleIncrement}
//                   className="w-[3rem] h-[3rem] flex items-center justify-center border border-gray-400"
//                 >
//                   <FaPlus />
//                 </button>
//               </div>
//               <button
//                 onClick={handleAddToCart}
//                 className="w-[60%] py-3 text-white text-xl text-center font-bold hover:bg-black duration-500 cursor-pointer rounded-md bg-[#5dff2b]"
//               >
//                 Buy Now
//               </button>
//               <h1 className="text-lg font-bold tracking-wider">Specification</h1>
//               <div className="flex flex-col gap-2">
//                 {data.map((spec, index) => (
//                   <h1 key={index}>
//                     {spec.AttributeName} - {spec.AttributeValue}
//                   </h1>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//         <div>
//           {!isLoading && (
//             <div dangerouslySetInnerHTML={{ __html: data[0]?.Description || "" }} />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
