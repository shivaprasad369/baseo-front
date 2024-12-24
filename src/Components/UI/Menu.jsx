import React, { useEffect, useState } from 'react'

export default function Menu({data,setCard,card,type}) {
    const [category,setCategory]=useState([])
    const [load,setLoad]=useState(false)
    useEffect(()=>{
        const res=data.filter((data)=>data.CategoryName===type)
        setCategory(res)
        setLoad(true)
        
    },[type,card])
  return (
    <div onMouseEnter={()=>setCard(true)} 
    onMouseLeave={()=>setCard((data)=>(false))} className={`${!card && 'hidden'} duration-500  w-[100%] h-[20rem] z-30 overflow-y-auto px-3 py-3 bg-white absolute left-0 max-xl:top-[3.2rem] xl:top-[3.3rem]`}>
      <div className={`${!load && 'hidden'} w-[100%] grid grid-cols-4 text-black `}>
            {category.length>0 ? category.map((data,index)=>
            <div key={data.CategoryID} className='xl:text-xl max-xl:text-md font-bold flex flex-col gap-3 '>
                {/* <h1>{data.CategoryName}</h1> */}
            {data.SubCategories.length>0 && data.SubCategories.map((data,index)=><div key={data.CategoryID} className='flex flex-col gap-2'>
                <span className='xl:text-lg font-semibold max-xl:text-md'>
                    {data.CategoryName}
                </span>
                <div className="flex flex-col gap-2 ">
                {data.SubCategories.map((data,index)=><div key={data.CategoryID} className='flex gap-2'>
                        <span className='text-base cursor-pointer max-xl:text-md hover:text-green-500 duration-500 text-gray-500 font-semibold'>
                            {data.CategoryName}
                        </span>
                    </div>)}
                </div>
                
                </div>)}</div>
            ):<h1 className='text-center font-bold'>No Category present</h1>}


        </div>
    </div>
  )
}
