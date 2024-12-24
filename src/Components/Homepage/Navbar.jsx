import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { LuPhone } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { handleToggle } from "../store/Cart";
import useTokenVerification from "../hooks/useTokenVerification";
import Cookies from 'js-cookie'
export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serverData, setServerData] = useState([]); // Store server data
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Filtered suggestions
 const toggle= useSelector(state=>state.cart.toggle)
 const count=useSelector(state=>state.cart.count)
 const total=useSelector(state=>state.cart.total)
 const { isVerified, isLoading1,user, error } = useTokenVerification();
const dispatch=useDispatch()
const [links,setLinks]= useState('')
const cartNumber=Cookies.get('userId')
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setFilteredSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(`https://baseo.onrender.com/product-attributes`);
        setServerData(res.data); // Save raw data for filtering
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    // Debounce API calls to prevent spamming the server
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  useEffect(()=>{
    const update=async()=>{
    if(isVerified){
     await axios.put(`https://baseo.onrender.com/update-cart-user`,{
       cartNumber,userId:user.userId})
     .then(res=>console.log(res))
     .catch(error=>console.error('Error fetching links:',error))
    }};
    update();
  },[isVerified])
  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    // Filter only if the data is available
    if (input.trim() === "") {
      setFilteredSuggestions([]);
    } else if (serverData.length > 0) {
      const filtered = serverData.filter((item) =>
        item.ProductName.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.ProductName);
    setFilteredSuggestions([]); // Clear suggestions
  };
const  handleSubmit =(e)=>{
  e.preventDefault()
  console.log(links)
}
  return (
    <nav className="w-[100%] z-40 flex items-center justify-center ">
      <div className="w-[100%] max-w-[1400px] flex items-center xl:px-[7%] max-xl:px-[2%]   py-4">
        <div className="w-[100%] flex xl:gap-10 max-xl:gap-2 items-center justify-around ">
          <a href="/" className="w-[15%]">
            <img
              src={require("../../images/logo.png")}
              alt="baseo ecommarce"
              className="w-[100%] "
            />
          </a>
          <div className="w-[43%] flex item-center border-[2px] border-black rounded-[0.2rem]">
            <form action="" onSubmit={handleSubmit} className="w-[100%] h-[100%] relative flex">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                className="outline-none py-3 px-3 h-[100%] w-[90%]"
                placeholder="Search product and Brands here.."
              />
              {/* Suggestions dropdown */}
              {filteredSuggestions?.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md mt-1 max-h-40 overflow-y-auto z-40">
                  {filteredSuggestions?.map((item, index) => (
                  <li
                  key={item.ProductID}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleSuggestionClick(item);
                    setLinks({ name: item.ProductName, id: item.ProductID });
                  }}
                >
                  <a href={`/products/details/${item.ProductID}/${encodeURIComponent(item.ProductName)}/${item.ProductAttributeID}`}>
                    {item.ProductName}
                  </a>
                </li>
                
                  ))}
                </ul>
              )}
              <button className="w-[10%] flex items-center justify-center py-3 text-white text-lg bg-black font-nold">
                <IoMdSearch />
              </button>
            </form>
          </div>

          <div className="flex gap-8 items-center">
            <div className="hover:bg-black font-bold tracking-wider text-white duration-500 px-7 py-3 bg-[#366A00] rounded-md">
              <a href="#">Sell</a>
            </div>
            <div className="flex items-center gap-2">
              <LuPhone className="xl:text-3xl text-[#252525]" />
              <div className="flex flex-col justify-center gap-0">
                <span className="text-sm tracking-wider text-gray-600">
                  Need Help?
                </span>
                <a
                  href="tel:+12 3456 7890"
                  className="xl:text-md max-xl:text-xs leading-[1rem] font-bold"
                >
                  +12 3456 7890
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div onClick={()=>dispatch(handleToggle())} className="relative">
                <div
                  className="xl:w-[1.5rem] xl:h-[1.5rem] max-xl:w-[1rem] h-[1rem]
                   right-0 rounded-full absolute top-0 bg-black text-white flex 
                        items-center justify-center max-xl:text-xs" 
                >
                  {count}
                </div>
                <BsHandbag className="xl:text-5xl max-xl:text-3xl text-[#252525]" />
              </div>
              <div className="flex flex-col justify-center gap-0 items-center">
                <span className="text-sm tracking-wider text-gray-600">
                  cart
                </span>
                <span className="text-md leading-[1rem] font-bold">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
