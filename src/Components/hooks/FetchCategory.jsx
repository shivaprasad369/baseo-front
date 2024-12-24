import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function FetchCategory({type}){
    const [data,setDate]=useState([])
    const handleFetch=async(level)=>{
        // fetch category data based on type
        // For example: fetch(`api/category?type=${type}`)
        try{
            const res=await axios.get('https://baseo.onrender.com/categories');
            if(res){
                setDate(res.data)
            }
        }
        catch(error){
            console.error('Error fetching categories:', error);
        }
    }
    useEffect(()=>{
        handleFetch(type)
    },[type])
  return {data}
 
}
