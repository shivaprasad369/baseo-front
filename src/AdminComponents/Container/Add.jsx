import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import AddCategory from './AddCategory';
import { MdCategory } from 'react-icons/md';

export default function Add() {
    const [data, setData] = useState([]); // Main categories
    const [subcategoriesOne, setSubcategoriesOne] = useState([]); // Subcategory level one
    const [subcategoriesTwo, setSubcategoriesTwo] = useState([]); // Subcategory level two
    const [subcategoriesThree, setSubcategoriesThree] = useState([]); // Subcategory level three
    const [parentCategoryID, setParentCategoryID] = useState(null); // Tracks selected parent category ID
    const [params,setParams]=useState({
        id:'',
        level:''
    })
const [id,setId]=useState({
    main:'',
    one:'',
    two:''
})
    const nameRef = useRef();

    // Fetch categories from the API
    const handleFetch = async () => {
        try {
            const res = await axios.get('https://baseo.onrender.com/categories');
            setData(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    // Handle main category selection and set subcategories
    const handleMainCategoryChange = (parentId) => {
        setParentCategoryID(parentId); // Set parent category ID for the API
        const selectedCategory = data.find((category) => category.CategoryID === Number(parentId));
        setSubcategoriesOne(selectedCategory?.SubCategories || []);
        setSubcategoriesTwo([]);
        setSubcategoriesThree([]);
    };

    // Handle subcategory one selection and set subcategories two
    const handleSubcategoryOneChange = (parentId) => {
        setParentCategoryID(parentId); // Update parent category ID
        const selectedSubcategory = subcategoriesOne.find((subcategory) => subcategory.CategoryID === Number(parentId));
        setSubcategoriesTwo(selectedSubcategory?.SubCategories || []);
        setSubcategoriesThree([]);
    };

    // Handle subcategory two selection and set subcategories three
    const handleSubcategoryTwoChange = (parentId) => {
        setParentCategoryID(parentId); // Update parent category ID
        const selectedSubcategory = subcategoriesTwo.find((subcategory) => subcategory.CategoryID === Number(parentId));
        setSubcategoriesThree(selectedSubcategory?.SubCategories || []);
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryName = nameRef.current.value;

        if (!categoryName || !parentCategoryID) {
            alert('Please fill in all fields and select a valid category!');
            return;
        }

        const payload = {
            CategoryName: categoryName,
            CatURL: categoryName.toLowerCase().replace(/\s+/g, '-'),
            Title: `Shop ${categoryName}`,
            KeyWord: categoryName.toLowerCase(),
            Description: `Latest ${categoryName}`,
            Image: `${categoryName.toLowerCase()}.jpg`,
            ParentCategoryID: Number(parentCategoryID),
            SubCategoryLevel: 'three',
        };

        try {
            const res = await axios.post('https://baseo.onrender.com/categories', payload);
            alert('Category added successfully!');
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Failed to add category. Please try again.');
        }
    };

    return (
        <div className="w-[100%] flex flex-col items-center justify-center">
            <div className="w-[100%] max-w-[1400px] px-[5%] py-[5rem] flex flex-col gap-10 items-start justify-center">
                <h1 className="text-3xl font-bold flex items-center gap-3"> <MdCategory /> Manage Category</h1>
                <form onSubmit={handleSubmit} className="w-[100%] bg-[#e0dfdd] grid grid-cols-2 gap-5 rounded-xl p-[2rem]">
                    {/* Main Category Dropdown */}
                   <div className='flex items-center gap-3'>

                    <select
                        className="w-[100%] outline-none bg-slate-100 border-[1px] px-3 py-3"
                        onChange={(e) =>{ handleMainCategoryChange(e.target.value);  setId((data)=>({...data,main:e.target.value}))}}
                    >
                        <option value="" disabled selected>
                            Select Main Category
                        </option>
                        {data.map((category) => (
                            <option  key={category.CategoryID} value={category.CategoryID}>
                                {category.CategoryName}
                            </option>
                        ))}
                    </select>
                    <div
                //    onClick={()=>handleAddCategory(Number(id.one),'SubCategoryTwo')}
                onClick={()=>setParams({
                    id:null,
                    level:'main'
                })}
                   className={`px-3 py-3 bg-orange-400 text-white`}>+</div>
                        
                   </div>
                        <div className='flex items-center gap-3'>

                    {/* Subcategory One Dropdown */}
                    <select
                        className="w-[100%] outline-none bg-slate-100 border-[1px] px-3 py-3"
                        onChange={(e) => {handleSubcategoryOneChange(e.target.value);  setId((data)=>({...data,one:e.target.value}))}}
                    >
                        <option value="" disabled selected>
                            Select Subcategory One
                        </option>
                        {subcategoriesOne.map((subcategory) => (
                            <option  key={subcategory.CategoryID} value={subcategory.CategoryID}>
                                {subcategory.CategoryName}
                            </option>
                        ))}
                    </select>
                    <div
                //    onClick={()=>handleAddCategory(Number(id.one),'SubCategoryTwo')}
                onClick={()=>setParams({
                    id:Number(id.main),
                    level:'one'
                })}
                   className={`${id.main===''&&'hidden'} px-3 py-3 bg-orange-400 text-white`}>+</div>
                        </div>

                    {/* Subcategory Two Dropdown */}
                    <div className='flex gap-3 items-center'>

                    <select
                        className="w-[100%] outline-none bg-slate-100 border-[1px] px-3 py-3"
                        onChange={(e) =>{ handleSubcategoryTwoChange(e.target.value)
                            setId((data)=>({...data,two:e.target.value}))
                        }}
                       
                    >
                        <option value="" disabled selected>
                            Select Subcategory Two
                        </option>
                        {subcategoriesTwo.map((subcategory) => (
                            <option  key={subcategory.CategoryID} value={subcategory.CategoryID}>
                                {subcategory.CategoryName}
                            </option>
                        ))}
                    </select>
                   <div
                //    onClick={()=>handleAddCategory(Number(id.one),'SubCategoryTwo')}
                onClick={()=>setParams({
                    id:Number(id.one),
                    level:'two'
                })}
                   className={`${id.one===''&&'hidden'} px-3 py-3 bg-orange-400 text-white`}>+</div>
                    </div>

                    {/* Subcategory Three Dropdown */}
                    <select
                        className="w-[100%] outline-none bg-slate-100 border-[1px] px-3 py-3"
                        onChange={(e) => setParentCategoryID(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select Subcategory Three
                        </option>
                        {subcategoriesThree.map((subcategory) => (
                            <option key={subcategory.CategoryID} value={subcategory.CategoryID}>
                                {subcategory.CategoryName}
                            </option>
                        ))}
                    </select>

                    {/* Category Name Input */}
                    <input
                        type="text"
                        ref={nameRef}
                        placeholder="Enter Category Name"
                        className="w-[100%] outline-none px-3 py-3 bg-slate-100"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                    >
                        Add
                    </button>
                </form>
                <AddCategory params={params}/>
            </div>
        </div>
    );
}
