import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdAddBox, MdCategory } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { FiMinus } from "react-icons/fi";

export default function Attribute() {
  const [bannerImage, setBannerImage] = useState(null);
  const [data, setData] = useState([]);
  const [count,setCount]=useState(1)
  const [inputValues, setInputValues] = useState([""]); 
  const [parentCategoryID, setParentCategoryID] = useState(null);
     const [subcategoriesThree, setSubcategoriesThree] = useState([]);
  const [id, setId] = useState({
    main: "",
    one: "",
    two: "",
  });
  const [params, setParams] = useState({
    id: "",
    level: "",
  });

  const [subcategoriesOne, setSubcategoriesOne] = useState([]);
  const [subcategoriesTwo, setSubcategoriesTwo] = useState([]);
  const [preview, setPreview] = useState(null);
  const name = useRef();
 
  const title = useRef();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("CategoryID",parentCategoryID);
    formData.append("AttributeName", name.current.value);
    formData.append("value", inputValues);
  

    const res = await axios.post("https://baseo.onrender.com/attributes", {
        CategoryID:parentCategoryID,
        AttributeName: name.current.value,
        value: inputValues
        
    });
    if(res){
        setCount(1)
        toast.success("Added Successfully")
    }

  };
  const handleFetch = async () => {
    try {
      const res = await axios.get("https://baseo.onrender.com/categories");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);
  const handleMainCategoryChange = (parentId) => {
    setParentCategoryID(parentId); // Set parent category ID for the API
    const selectedCategory = data.find(
      (category) => category.CategoryID === Number(parentId)
    );
    setSubcategoriesOne(selectedCategory?.SubCategories || []);
    setSubcategoriesTwo([]);
        setSubcategoriesThree([]);
  };
  const handleSubcategoryOneChange = (parentId) => {
    setParentCategoryID(parentId); 
    const selectedSubcategory = subcategoriesOne.find(
      (subcategory) => subcategory.CategoryID === Number(parentId)
    );
    setSubcategoriesTwo(selectedSubcategory?.SubCategories || []);
  
    setSubcategoriesThree([]);
  };
  const handleSubcategoryTwoChange = (parentId) => {
    setParentCategoryID(parentId);
    const selectedSubcategory = subcategoriesTwo.find((subcategory) => subcategory.CategoryID === Number(parentId));
    setSubcategoriesThree(selectedSubcategory?.SubCategories || []);
};

const handleIncrement=()=>{
    setCount(()=>count+1)
    setInputValues([...inputValues, ""]);
}

const handleDecrement=()=>{
    if(count>1){
        setCount(()=>count-1)
        setInputValues(inputValues.slice(0, -1));
    }
}

  const handleInputChange = (index, event) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = event.target.value; // Update the value of the input at the given index
    setInputValues(updatedValues);
  }
  console.log(inputValues)
  return (
    <div className="w-[100%] flex flex-col gap-5 px-[2rem] mt-[5rem] ">
      <Toaster />
      <div className="flex text-3xl items-center  overflow-hidden">
        <MdCategory />
        <h1 className="text-3xl font-bold ">Manage Attribute</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[100%] px-[0rem] py-4 gap-10 flex flex-col "
      >
        <div className="flex mb-[-1.5rem] items-center gap-5 text-2xl font-semibold">
        <BiSolidCategory />
        <h1>
        Category
        </h1>

        </div>
        <div className=" w-[100%] grid px-[2rem] py-[2rem] grid-cols-3 gap-5 bg-[#e7e6e5] rounded-md">
          <label
            htmlFor="name"
            className="w-[100%] font-bold flex flex-col gap-2"
          >
            Category *
            <select
              className="w-[100%] outline-none border-[1px] px-3 py-3 h-fit "
              onChange={(e) => {
                handleMainCategoryChange(e.target.value);
                setId((data) => ({ ...data, main: e.target.value }));
              }}
            >
              <option value="" disabled selected>
                Select Main Category
              </option>
              {data.map((category) => (
                <option key={category.CategoryID} value={category.CategoryID}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-col gap-1 font-bold">
            <h1>Subcategory *</h1>
            <select
              className="w-[100%] outline-none bg-slate-100 border-[1px] px-3 py-3"
              onChange={(e) => {
                handleSubcategoryOneChange(e.target.value);
                setId((data) => ({ ...data, one: e.target.value }));
                setParams(() => ({ id: e.target.value, level: "two" }));
              }}
              required
            >
              <option value="" disabled selected>
                Select Subcategory One
              </option>
              {subcategoriesOne.map((subcategory) => (
                <option
                  key={subcategory.CategoryID}
                  value={subcategory.CategoryID}
                >
                  {subcategory.CategoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-1 font-bol flex-col  font-bold">
            <h1>Subcatrgory Level 2 *</h1>
            <select
              className="w-[100%] outline-none  border-[1px] px-3 py-3"
              onChange={(e) => {
                handleSubcategoryTwoChange(e.target.value);
                setId((data) => ({ ...data, two: e.target.value }));
              }}
            >
              <option value="" disabled selected>
                Select Subcategory Two
              </option>
              {subcategoriesTwo.map((subcategory) => (
                <option
                  key={subcategory.CategoryID}
                  value={subcategory.CategoryID}
                >
                  {subcategory.CategoryName}
                </option>
              ))}
            </select>
        
          </div>
        </div>
        <div className="flex mb-[-1.5rem] items-center gap-5 text-2xl font-semibold">
        <MdAddBox />
        <h1>
        Add Attributes
        </h1>
        </div>
        <div className="p-[2rem] bg-[#e7e6e5] rounded-md w-[100%] flex gap-5">
              <label htmlFor="name" className="flex flex-col gap-1 w-[50%] font-bold">
                Attribute Name *
                <input
                  type="text"
                  id="name"
                  name="name"
                  ref={name}
                  className="w-[100%] outline-none border-[1px] px-3 py-3 h-fit"
                  required
                />
              </label>
              <div className="w-[50%] flex gap-4 ">
               
                <label htmlFor="title" className="font-bold w-[80%]">
                  Value *
                  <div className="flex flex-col gap-4">

                  {Array.from({ length: count }).map((_, index) => (
            <input
              key={index}
              type="text"
              id={`title-${index}`}
              name={`title-${index}`}
              value={inputValues[index]} // Bind input value to state
              onChange={(event) => handleInputChange(index, event)} // Update state on change
              className="w-[100%] outline-none border-[1px] px-3 py-3 h-fit"
              required
            />
          ))}
                  </div>
                </label>
                    <div className="flex flex-col pt-7 text-xl font-bold"  >
                        <span onClick={handleIncrement}><IoMdAdd /></span>
                        {count>1&&<span onClick={handleDecrement}><FiMinus /></span>}
                    </div>
              </div>
        </div>   
        <div className="w-[100%] pt-2 border-t-[1px] border-gray-300  flex justify-between items-center">
          <button
            type="reset"
            className="bg-transparent  px-5 py-1 border-[1px] border-gray-500"
          >
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
