import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaList } from 'react-icons/fa';

const AddBrands = () => {
    const [brandName, setBrandName] = useState('');
    const [brandImage, setBrandImage] = useState(null);
 

    const handleFileChange = (e) => {
        setBrandImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('brand', brandName);
        if (brandImage) {
            formData.append('brandImage', brandImage);
        }

        try {
            const response = await axios.post('https://baseo.onrender.com/brands', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Brand added successfully');
            setBrandName('');
            setBrandImage(null);
            // fetchBrands(); // Refresh brand list
        } catch (error) {
            console.error('Error adding brand:', error);
            alert('Failed to add brand');
        }
    };

    return (
        <div className='w-[100%] flex mt-[2rem] items-center  ml-2 justify-center'>
            <div className='w-[100%]  max-w-[1400px] py-[3rem] flex flex-col gap-5'>
<div className='w-[70%] flex flex-col gap-5'>
    <div className='flex px-4 items-center gap-3'>

<FaList className='text-2xl' />
            <h1 className=' text-3xl font-bold'>Manage Brand</h1>
    </div>
            <form onSubmit={handleSubmit} className='w-[100%] p-[2rem] bg-[#e2dfdf]  flex flex-col gap-5'>
                <input
                    type="text"
                    placeholder="Brand Name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className='w-[100%] px-4 py-3 bg-slate-100 border-[1px] border-gray-300 outline-none'
                    required
                />
                <input type="file" accept="image/*"  className='w-[100%] px-4 py-[2rem] bg-slate-100 outline-none' onChange={handleFileChange} />
                <div className="flex items-center  w-[100%] border-t-[1px] border-gray-400  pt-5 justify-between ">
                    <button type='reset' className='px-7 py-2 border-[1px] border-gray-300  bg-white '>Clear</button>
                <button type="submit" className='w-fit px-6 py-3 rounded-md text-white font-bold bg-black'>Add Brand</button>
                </div>
            </form>
         
            </div>
</div>
        </div>
    );
};

export default AddBrands;
