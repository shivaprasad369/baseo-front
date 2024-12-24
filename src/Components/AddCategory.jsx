import axios from 'axios';
import React, { useRef } from 'react'

export default function AddCategory({params}) {
    const nameRef=useRef()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryName = nameRef.current.value;
const parentCategoryID=params.id;
        if (!categoryName ) {
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
            SubCategoryLevel:params.level,
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
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" placeholder='enter subcategory' className='w-[20rem] outline-nonepx-2 py-3 bg-slate-100'/>
        <button className='px-3 py-2 font-bold text-white bg-orange-500'>Add</button>
      </form>
    </div>
  )
}
