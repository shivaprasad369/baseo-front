import React, { useRef, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
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

const AddProduct = () => {
 const formRef=useRef()
  const [ProductData, setProductData] = useState({
    ProductName: null,
    CategoryID: null,
    Description: null,
    ProductPrice: null,
    Discount: null,
    Voucherprice: null,
    CashPrice: null,
    StockQuantity: null,
    SubCategoryIDtwo: null,
    SubCategoryIDone: null,
    Image: null,
    BrandID: null,
    DiscountPercentage: null,
    DiscountPrice: null,
    SellingPrice: null,
    Modelname: null,
    ProductUrl: null,
    MetaTitle: null,
    MetaKeyWords: null,
    MetaDescription: null,
  });
  
  const [one, setOne] = useState([]);
  const [two, setTwo] = useState([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
  });

  const handleGetSubCategoryOne = (id) => {
    setProductData({...ProductData,CategoryID:id})
    const newOne = data.filter((item) => item.CategoryID === Number(id));
    setOne(newOne[0].SubCategories);
  };

  const handleGetSubCategoryTwo = (id) => {
    setProductData({...ProductData, SubCategoryIDone:id})
    const newOne = one.find((item) => item.CategoryID === Number(id));
    setTwo(newOne.SubCategories);
  };
 const handleGetSubCategoryThree=(id)=>{
  setProductData({...ProductData, SubCategoryIDtwo:id})

 }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Calculate discount-related values if the discount field is updated
    if (name === "DiscountPercentage") {
      const productPrice = parseFloat(ProductData.ProductPrice || 0); // Ensure product price is a valid number
      const discountPercentage = parseFloat(value); // Ensure discount is a valid number

      if (productPrice > 0 && discountPercentage >= 0) {
        // Calculate discount price
        const discountPrice = ((discountPercentage / 100) * productPrice).toFixed(2);

        // Calculate selling price
        const sellingPrice = (productPrice - parseFloat(discountPrice)).toFixed(2);

        // Update state with calculated values
        setProductData((prevState) => ({
          ...prevState,
          DiscountPercentage: discountPercentage, // Update discount input value
          Discount: discountPrice,
          SellingPrice: sellingPrice,
        }));

        return; // Exit early since discount logic is handled here
      }
    }

    setProductData({ ...ProductData, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setProductData({ ...ProductData, Description: value });
  };

 const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({ ...ProductData, Image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for required fields (ProductName and ProductPrice)
    if (!ProductData.ProductName || !ProductData.ProductPrice) {
      alert("Product Name and Product Price are required!");
      return;
    }
  
    // Proceed with the form submission
    const formData = new FormData();
    let datas=[];
    for (const key in ProductData) {
      formData.append(key, ProductData[key]);
      // datas.push({[key]: ProductData[key]})
    }
  
    try {
      const response = await axios.post(
        "https://baseo.onrender.com/products",
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data) {
        formRef.current.reset();
        alert("Product added successfully!");
      }
      
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };
  
  

  return (
    <div className="w-[100%] mt-[5rem] flex flex-col gap-5 items-center justify-center">
      <h2 className="text-black text-xl font-bold text-center">Add Product</h2>
      <form
      ref={formRef}
        onSubmit={handleSubmit}
        className="w-[70%] items-center flex flex-col gap-3"
      >
        <div className="w-[100%] grid grid-cols-3 gap-4">
          <select
            name="categoryId"
            id=""
            onChange={(e) => handleGetSubCategoryOne(e.target.value)}
            className="w-[100%] outline-none px-4 py-3 bg-slate-100"
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
            className="w-[100%] outline-none px-4 py-3 bg-slate-100"
          >
            <option value="">Select SubCategory One Category</option>
            {one.length > 0 &&
              one.map((data, index) => (
                <option key={data.CategoryID} value={data.CategoryID}>
                  {data.CategoryName}
                </option>
              ))}
          </select>
          <select
            name=""
            onChange={(e) => handleGetSubCategoryThree(e.target.value)}
            id=""
            className="w-[100%] outline-none px-4 py-3 bg-slate-100"
          >
            <option value="">Select SubCategory Two Category</option>

            {two.length > 0 &&
              two.map((data, index) => (
                <option key={data.CategoryID} value={data.CategoryID}>
                  {data.CategoryName}
                </option>
              ))}
          </select>

          <input
            type="text"
            name="ProductName"
            placeholder="Enter Product Name"
          
            onChange={handleInputChange}
            className="w-[100%] outline-none px-4 py-3  bg-slate-100"
            required
          />

          <input
            type="text"
            name="MetaTitle"
            placeholder="Meta Title"
            
            onChange={handleInputChange}
            className="w-[100%] outline-none px-4 py-3 bg-slate-100"
          />
          <input
            type="text"
            name="MetaKeyWords"
            placeholder="Meta Keywords"
          
            onChange={handleInputChange}
            className="w-[100%] outline-none px-4 py-3 bg-slate-100"
          />
          <textarea
            name="MetaDescription"
            placeholder="Meta Description"
         
            onChange={handleInputChange}
            className="w-[100%] outline-none px-4 py-3 bg-slate-100"
          />
        </div>

        <div className="w-[100%] h-[20rem]">
          <ReactQuill
         
            onChange={handleDescriptionChange}
            placeholder="Write your product description here..."
            className="w-[100%] h-[100%]"
          />
        </div>
        <div className="w-[100%] grid mt-[3rem] grid-cols-3 gap-4">
          <input
            type="text"
            name="BrandID"
            placeholder="Enter Brand ID"
           
            onChange={handleInputChange}
            className="w-[100%] outline-none px-4 py-3 bg-slate-100"
          />
          <input
            type="text"
            name="ModelName"
            placeholder="Model Name"
            
            onChange={handleInputChange}
            className="w-[100%] outline-none px-4 py-3 bg-slate-100"
          />
          <input
            type="number"
            placeholder="Product Price"
            name="ProductPrice"
            className="w-[100%]  outline-none bg-slate-100 px-4 py-3"
           
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="DiscountPercentage"
            placeholder="Discount Percentage"
            className="w-[100%]  outline-none bg-slate-100 px-4 py-3"
        
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="Discount"
            placeholder="Discounted price"
            readOnly={true}
            className="w-[100%]  outline-none bg-slate-100 px-4 py-3"
            value={ProductData.Discount}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="SellingPrice"
            placeholder="Selling Price"
            readOnly={true}
            className="w-[100%]  outline-none bg-slate-100 px-4 py-3"
            value={ProductData.SellingPrice}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="Voucherprice"
            placeholder="Vouchar Price"
            className="w-[100%]  outline-none bg-slate-100 px-4 py-3"
   
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="CashPrice"
            placeholder="Cash Price"
            className="w-[100%]  outline-none bg-slate-100 px-4 py-3"
         
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="StockQuantity"
            placeholder="Stock Quantity"
            className="w-[100%]  outline-none bg-slate-100 px-4 py-3"
        
            onChange={handleInputChange}
          />
        </div>

        <input
          type="file"
          name="Image"
          accept="image/*"
          onChange={handleFileChange}
          
          className="w-[100%] outline-none px-4 py-3 bg-slate-100"
        />

        <button
          type="submit"
          className="w-[100%] mt-5 bg-black text-white py-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
