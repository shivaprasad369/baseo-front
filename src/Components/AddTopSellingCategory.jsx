import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useQuery } from 'react-query';
const fetchCategories = async () => {
    try {
      const response = await axios.get("https://baseo.onrender.com/categories");
      return response.data; // Make sure this matches your API's data structure
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };
const TopSellingCategories = () => {

    const [categoryData, setCategoryData] = useState({ name: '' });
    const [file, setFile] = useState(null);
    const [one, setOne] = useState([]);
    const [two, setTwo] = useState([]);
    const formRef=useRef()
  const [id,setId]=useState('')
    const { isLoading, error, data } = useQuery({
      queryKey: ["categoriess"],
      queryFn: fetchCategories,
    });
  
    const handleGetSubCategoryOne = (id) => {
        if(!id){
            return false
        }
    //   setProductData({...ProductData,CategoryID:id})
      const newOne =data && data.filter((item) => item.CategoryID === Number(id));
      setOne(newOne[0].SubCategories);
    };
  
    const handleGetSubCategoryTwo = (id) => {

    //   setProductData({...ProductData, SubCategoryIDone:id})
    if(!id){
        return false
    }
      const newOne =one && one.find((item) => item.CategoryID === Number(id));
      setTwo(newOne.SubCategories);
    };
   const handleGetSubCategoryThree=(id)=>{
    setId(id)
    console.log(id)
    // setProductData({...ProductData, SubCategoryIDtwo:id})
  
   }
    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({ ...categoryData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Name', categoryData.name);
        formData.append('CategoryID', id);
        if (file) formData.append('Image', file);

        try {
            await axios.post('https://baseo.onrender.com/topcategories', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            formRef.current.reset();
            alert('Category added successfully!');
            // fetchCategories();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Top Selling Categories</h1>

            {/* Add Category Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="mb-10 space-y-4 bg-gray-100 p-6 rounded shadow-md">
               <div className="w-[100%] grid grid-cols-3 gap-5">
               <select
            name="categoryId"
            id=""
            onChange={(e) => handleGetSubCategoryOne(e.target.value)}
            className="w-[100%] outline-none px-4 py-3 bg-white"
            required
          >
            <option value="">Select Main Category</option>
            {!isLoading &&
              data?.map((data, index) => (
                <option value={data?.CategoryID}>{data.CategoryName}</option>
              ))}
          </select>
          <select
            name=""
            id=""
            onChange={(e) => handleGetSubCategoryTwo(e.target.value)}
            className="w-[100%] outline-none px-4 py-3 bg-white"
            required
          >
            <option value="">Select SubCategory One Category</option>
            {one.length > 0 && 
              one.map((data, index) => (
                <option key={data?.CategoryID} value={data?.CategoryID}>
                  {data?.CategoryName? data?.CategoryName:''}
                </option>
              ))}
          </select>
          <select
            name=""
            onChange={(e) => handleGetSubCategoryThree(e.target.value)}
            id=""
            className="w-[100%] outline-none px-4 py-3 bg-white"
            required
          >
            <option value="">Select SubCategory Two Category</option>

            {two.length > 0 &&
              two.map((data, index) => (
                <option key={data.CategoryID} value={data.CategoryID}>
                  {data.CategoryName}
                </option>
              ))}
          </select>

               </div>
                <div>
               
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter category name"
                        className="w-full border border-gray-300 rounded p-2"
                        value={categoryData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div
                    {...getRootProps()}
                    className="border-2 h-[5rem] border-dashed border-gray-300 p-4 text-center cursor-pointer rounded"
                >
                    <input {...getInputProps()} />
                    {file ? (
                        <p className="text-sm text-gray-700">{file.name}</p>
                    ) : (
                        <p className="text-sm text-gray-500">Drag and drop an image, or click to select</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    Add Category
                </button>
            </form>

           
        </div>
    );
};

export default TopSellingCategories;
