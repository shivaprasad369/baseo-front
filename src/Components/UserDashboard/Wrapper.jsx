import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import useTokenVerification from "../hooks/useTokenVerification";
import Cookies from 'js-cookie'
export default function Wrapper() {
  const [activeLink, setActiveLink] = useState(''); 
  const handleLinkClick = (link) => {
    if (link === "logout") {
      localStorage.removeItem("token");
       Cookies.remove('userId')
      navigate('/')
      window.location.reload();
    }
    setActiveLink(link);
  };
  const { isVerified, isLoading1, user } = useTokenVerification();
  const navigate = useNavigate();
  if (!isLoading1 && !isVerified) {

    return navigate("/login");
  }
  if(isLoading1 && isVerified){
    return <div className="py-[4rem] text-3xl font-bold">Loading...</div>
  }
  return (
    <section className="w-[100%] flex items-center justify-center overflow-hidden">
      <div className="w-[100%] flex items-center justify-center max-w-[1400px] px-[8%] py-[3rem]">
        <div className="w-[100%] flex gap-10 ">
          <div className="w-[25%] flex h-fit flex-col gap-4 text-md font-[400] p-[2rem] bg-[#eeecec] rounded-xl">
            <a
              href="/dashboard"
              className={`hover:text-[#73be36] hover:font-bold duration-300 ${
                activeLink === "dashboard" ? "text-black font-bold" : ""
              }`}
              onClick={() => handleLinkClick("dashboard")}
            >
              Dashboard
            </a>
            <Link
            to={`profile/${user.userId}`}
              className={`hover:text-[#73be36] hover:font-bold duration-300 ${
                activeLink === "profile" ? "text-black font-bold" : ""
              }`}
              onClick={() => handleLinkClick("profile")}
            >
              My Profile
            </Link>
            <Link
              to="list"
              className={`hover:text-[#73be36] hover:font-bold duration-300 ${
                activeLink === "orders" ? "text-black font-bold" : ""
              }`}
              onClick={() => handleLinkClick("orders")}
            >
              My Orders
            </Link>
            <span
              className={`hover:text-[#73be36] hover:font-bold duration-300 ${
                activeLink === "voucher" ? "text-black font-bold" : ""
              }`}
              onClick={() => handleLinkClick("voucher")}
            >
              Voucher List
            </span>
            <span
              className={`hover:text-[#73be36] hover:font-bold duration-300 ${
                activeLink === "reviews" ? "text-black font-bold" : ""
              }`}
              onClick={() => handleLinkClick("reviews")}
            >
              My Reviews
            </span>
            <Link
            to={'change-password'}
              className={`hover:text-[#73be36] hover:font-bold duration-300 ${
                activeLink === "password" ? "text-black font-bold" : ""
              }`}
              onClick={() => handleLinkClick("password")}
            >
              Change Password
            </Link>
            <span
              className={`hover:text-[#73be36] cursor-pointer hover:font-bold duration-300 ${
                activeLink === "logout" ? "text-black font-bold" : ""
              }`}
              onClick={() => handleLinkClick("logout")}
            >
              Logout
            </span>
          </div>
          <div className="w-[75%]">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
