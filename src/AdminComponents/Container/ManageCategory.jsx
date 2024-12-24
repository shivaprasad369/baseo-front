import axios from "axios";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdCategory } from "react-icons/md";

export default function ManageCategory() {
      const [bannerImage, setBannerImage] = useState(null);
        const [preview, setPreview] = useState(null);
      const name=useRef();
      const descriptiom=useRef();
      const title = useRef();
      const keyword=useRef();
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setBannerImage(file);
          setPreview(URL.createObjectURL(file));
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('CategoryName', name.current.value);
        formData.append('Image', bannerImage);
        formData.append('Description', descriptiom.current.value);
        formData.append('KeyWord',keyword.current.ref);
        formData.append('Title',title.current.value);
        formData.append('ParentCategoryID',null);
        formData.append('SubCategoryLevel','main')

        const res =await axios.post('https://baseo.onrender.com/categories',formData);

        if(res.status===201){
            toast.success('Category added successfully');
            name.current.value='';
            descriptiom.current.value='';
            title.current.value='';
            keyword.current.value='';
            setBannerImage(null);
            setPreview(null);
        } else{
            toast.error('Failed to add category');
        }
      }
  return (
    <div className="w-[100%] flex flex-col gap-5 px-[2rem] mt-[5rem] ">
        <Toaster/>
      <div className="flex text-2xl items-center  overflow-hidden">
        <MdCategory />
        <h1 className="text-3xl font-bold ">Manage Categories</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[100%] px-[2rem] py-4 gap-10 flex flex-col bg-[#e7e6e5]"
      >
        <div className=" w-[100%] grid grid-cols-2 gap-5"> 

        <label
          htmlFor="name"
          className="w-[100%] font-bold flex flex-col gap-2"
        >
          Category *
          <input
            type="text"
            ref={name}
            id="name"
            className="outline-none px-3 py-3 border-[1px] border-gray-300 w-[100%]"
            name="name"
            required
          />
        </label>
        <label
          htmlFor="name"
          className="w-[100%] font-bold flex flex-col gap-2"
        >
          Meta Title
          <input
          ref={title}
            type="text"
            id="name"
            className="outline-none px-3 py-3 border-[1px] border-gray-300 w-[100%]"
            name="title"
          />
        </label>
        <label
          htmlFor="keyword"
          className="w-[100%] font-bold flex flex-col gap-2"
        >
          Meta Keywords
          <input
            type="text"
            ref={keyword}
            id="name"
            className="outline-none px-3 py-3 border-[1px] border-gray-300 w-[100%]"
            name="keyword"
          />
        </label>
        <label
          htmlFor="Description"
          className="w-[100%] font-bold flex flex-col gap-2"
        >
          Meta Description
          <input
            type="text"
            ref={descriptiom}
            id="name"
            className="outline-none px-3 py-3 border-[1px] border-gray-300 w-[100%]"
            name="descriptiom"
          />
        </label>
       <div className="flex flex-col gap-5">
        <label htmlFor="" className="font-bold flex flex-col gap-1 ">
            Category Image *
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border-[1px] border-gray-300 px-3 py-3 bg-white  p-2 rounded" required
        />
        </label>

        {preview && (
          <div className="">
            <p className="text-lg font-medium">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-64 h-64 object-cover rounded"
            />
          </div>
        )}
       </div>
        </div>
        <div className="w-[100%] pt-2 border-t-[1px] border-gray-300  flex justify-between items-center">
<button type="reset" className="bg-transparent  px-5 py-1 border-[1px] border-gray-500">
Clear
</button>
        <button className=" text-white bg-[#5dd13f] py-3 px-5 rounded-md font-bold">
          Add Category
        </button>
        </div>
      </form>
    </div>
  );
}
