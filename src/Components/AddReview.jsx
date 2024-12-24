import React, { useRef, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { useQuery } from 'react-query';
const fetchCategories = async () => {
  try {
    const response = await axios.get("https://baseo.onrender.com/products");
    return response.data; // Make sure this matches your API's data structure
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export default function AddReview() {
    const nameRef=useRef()
    const formRef=useRef()
    const textRef=useRef()
    const rateRef=useRef()

  const [review, setReview] = useState({
    ProductID: "",
   
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchCategories,
  });
  const handleGetSubCategoryOne = (id) => {
    // setProductData({...ProductData,CategoryID:id})
    setReview({ ...review, ProductID: id });
};
const handleSubmit=(e)=>{
    e.preventDefault();
    const payload = {
      ProductID:Number(review.ProductID),
      CustomerName: nameRef.current.value,
      ReviewText: textRef.current.value,
      Rating:Number(rateRef.current.value),
    };
    axios
     .post("https://baseo.onrender.com/reviews", payload)
     .then((response) => {
        alert("Review added successfully!");
        formRef.current.reset()
        setReview({
          ProductID: "",
          CustomerName: "",
          ReviewText: "",
          Rating: "",
        });
      })
     .catch((error) => {
        console.error("Error adding review:", error);
      });
  };

  return (
    <section className="w-[100%] flex items-center justify-center overflow-hidden">
      <div className="w-[100%] max-w-[1400px] px-[5%] py-[3rem] flex flex-col gap-10 items-center justify-center">
        <h1 className="text-2xl font-bold tracking-wider">Add a Review</h1>
        <div className="w-[100%] items-center justify-center  flex flex-col gap-5 ">
          <form ref={formRef} onSubmit={handleSubmit} className="w-[70%] px-[2rem] flex flex-col gap-5 py-[1rem]">
            <div className="grid w-[100%] grid-cols-3 gap-3">
              <select
                name="productsId"
                id=""
                onChange={(e) => handleGetSubCategoryOne(e.target.value)}
                className="w-[100%] outline-none px-4 py-3 bg-slate-100"
                required
              >
                <option value="">Select A Product</option>
                {!isLoading &&
                  data?.map((data, index) => (
                    <option value={data?.ProductID}>{data.ProductName}</option>
                  ))}
              </select>
              <input
              ref={nameRef}
                type="text"
                placeholder="Customer Name"
                name="customerName"
                className="w-[100%] bg-slate-100 outline-none px-4 py-3" required
              />
              <input
              ref={rateRef}
                type="number"
                placeholder="Rating"
                name="rating"
                className="w-[100%] bg-slate-100 outline-none px-4 py-3"  required
                />
            </div>
                 <ReactQuill
         ref={textRef}
        //  onChange={handleDescriptionChange}
         placeholder="Write your product description here..."
         className="w-[100%] h-[5rem]"
         required
       />
       <div className="w-[100%] mt-[3rem] flex justify-end">
            <button className="w-fit px-6 py-3 text-white font-bold text-lg tracking-widest rounded-md bg-[#97ce16]">
                Add
            </button>
       </div>
          </form>
        </div>
      </div>
    </section>
  );
}
