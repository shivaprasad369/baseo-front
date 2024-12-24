import React, { useState } from "react";
import { MdComputer } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { FaList, FaMinus } from "react-icons/fa";
import { TbBrandAirtable } from "react-icons/tb";
import { Link } from "react-router";
export default function Sidebar() {
 const [first,setFirst]= useState(false)
 const [second,setSecond]= useState(false)

  return (
    <div className="w-[100%] h-[100vh]   flex flex-col ">
      <div className="w-[100%] h-[3rem] flex items-center justify-center">
        <img
          src={require("../asset/logo.png")}
          alt="baseo"
          className="w-[7rem]"
        />
      </div>
      <div className="w-[100%] flex flex-col  text-gray-400  bg-[#252525]  font-light text-sm tracking-wider">
        <h1 className=" px-[1rem] pb-[0.5rem] pt-[2rem]">Navigation</h1>
        <div
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center  
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>Dashboard</span>
        </div>
        <div  onClick={()=>{setFirst(()=>!first); setSecond(false)}}
          className={`w-[100%] relative hover:text-white hover items-center cursor-pointer justify-between 
            duration-300 flex ${first ? 'bg-[#1f856b] text-white':'hover:bg-[#363535] '}  gap-3 p-[1rem]`}
        >
          <div className="flex items-center gap-3">
            <FiShoppingCart />
            <span>Product-Management</span>
          </div>
          <div
            className="text-md border-[1px] border-white absolute right-[1rem] leading-[10px] 
                  p-[1px] h-fit w-fit flex items-center justify-center"
          >
            <span>{first ? <FaMinus className="text-xs" /> :'+'}</span>
          </div>
        </div>
        {first && <div className="w-[100%] my-[1rem] pl-[2rem] gap-5 flex flex-col font-light bottom-0 ">
          <Link to="category"
            className="w-[100%] items-center 
            duration-300 flex  gap-3"
          >
            <MdComputer />
            <span>Manage Category</span>
          </Link>
          <Link to="sub-category"
            className="w-[100%] items-center 
            duration-300 flex  gap-3"
          >
            <MdComputer />
            <span>Manage Sub-Category</span>
          </Link>
          <Link to="sub-category-two"
            className="w-[100%] items-center 
            duration-300 flex  gap-3"
          >
            <MdComputer />
            <span>Manage Sub-Category Level 2</span>
          </Link>
          <Link to='attribute'
            className="w-[100%] items-center 
            duration-300 flex  gap-3"
          >
            <FaList />
            <span>Manage Attribute</span>
          </Link>
          <Link to='brands'
            className="w-[100%] items-center 
            duration-300 flex  gap-3"
          >
            <TbBrandAirtable  />
            <span>Manage Brands</span>
          </Link>
          <a href="products"
            className="w-[100%] items-center 
            duration-300 flex  gap-3"
          >
            <FaList />
            <span>Manage Product</span>
          </a>
          <div
            className="w-[100%] items-center 
            duration-300 flex  gap-3"
          >
            <FaList />
            <span>Manage Feature Products</span>
          </div>
        </div>}
        <div  onClick={()=>{setSecond(()=>!second); setFirst(false)}}
          className={`w-[100%] relative hover:text-white hover items-center cursor-pointer justify-between
            duration-300 flex ${second ? 'bg-[#1f856b] text-white':'hover:bg-[#363535] '}  gap-3 p-[1rem]`}
        >
          <div className="flex items-center gap-3">
            <FiShoppingCart />
            <span>Manage Orders</span>
          </div>
          <div
            className="text-md border-[1px] border-white absolute right-[1rem] leading-[10px] 
                  p-[1px] h-fit w-fit flex items-center justify-center"
          >
            <span>{second ? <FaMinus className="text-xs" /> :'+'}</span>
          </div>
        </div>
        {second && <div className="w-[100%] my-[1rem] pl-[2rem] gap-5 flex flex-col font-light bottom-0 ">
          <div
            className="w-[100%] items-center 
            duration-300 flex  gap-3"
          >
            <MdComputer />
            <span>Manage Buy Orders</span>
          </div>
          <div
            className="w-[100%] items-center 
            duration-300 flex  gap-3"
          >
            <FaList />
            <span>Manage Return Orders</span>
          </div>
        </div>}
        <div
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center 
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>Manage Reviews</span>
        </div>
        <div
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center 
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>User Management</span>
        </div>
        <div
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center 
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>User Management</span>
        </div>
        <div
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center 
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>Contacts Received</span>
        </div>
        <div
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center 
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>Manage Faq's</span>
        </div>
        <div
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center 
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>Newletter Subscribers</span>
        </div>
        <a href="banner"
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center 
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>Manage Banners</span>
        </a>
        <div
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center 
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>Admin Profile</span>
        </div>
        <div
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center 
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>Change Password</span>
        </div>
        <div
          className="w-[100%] hover:bg-[#363535] hover:text-white hover items-center 
            duration-300 flex  gap-3 p-[1rem]"
        >
          <MdComputer />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
