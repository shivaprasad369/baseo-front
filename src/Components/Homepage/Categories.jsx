import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import FetchCategory from '../hooks/FetchCategory'
import Menu from '../UI/Menu';
export default function Categories() {
 const {data}=FetchCategory('all');
 const [main,setMain]=useState(false);
 const [one,setOne]=useState(false);
 const [two,setTwo]=useState(false);
 const [three,setThree]=useState(false);
 const [four,setFour]=useState(false);
  return (
    <section onMouseLeave={()=>(setMain(false),setOne(false),
        setTwo(false),
        setThree(false) ,
        setFour(false)
        )} className='w-[100%] flex items-center justify-center'>
        <div className="max-w-[1400px] w-[100%] max-xl:px-[2%] xl:px-[7%] items-center flex">
            <div   className='w-[100%]  relative flex items-center xl:gap-14 max-xl:5  justify-around'>
                <div onMouseEnter={()=>setMain((true))} 
                onMouseLeave={()=>setMain(false)} className={`${!main && 'hidden'} duration-500  w-[100%] overflow-y-scroll h-[25rem] z-30 
             px-3 py-3 bg-white shadow-xl absolute left-0 max-xl:top-[3.6rem] xl:top-[3.3rem]`}>
                    <div className='w-[100%] grid grid-cols-4 text-black '>
                        {data?.length>0 && data?.map((datas,index)=>
                        <div key={datas.CategoryID} className='text-xl font-bold flex flex-col gap-3 '><a href={`/product/${datas.CategoryID}/${datas.CategoryName}}`}>{datas.CategoryName}</a>
                        {datas?.SubCategories.length>0 && datas?.SubCategories.map((data,index)=><div key={data.CategoryID} className='flex flex-col gap-2'>
                            <a href={`/product/${datas.CategoryID}/${datas.CategoryName}/${data.CategoryID}/${data.CategoryName}`} className='text-lg font-semibold'>
                                {data.CategoryName}
                            </a>
                            <div className="flex flex-col gap-2 ">
                            {data?.SubCategories.map((data1,index)=><div key={data1.CategoryID} className='flex gap-2'>
                                    <a href={`/product/${datas.CategoryID}/${datas.CategoryName}/${data.CategoryID}/${data.CategoryName}/${data1.CategoryID}/${data1.CategoryName}`} className='cursor-pointer hover:text-green-500 text-sm duration-500 text-gray-500 font-semibold'>
                                        {data1.CategoryName}
                                    </a>
                                </div>)}
                            </div>
                            </div>)}</div>
                        )}
                    </div>
                </div>
                <Menu setCard={setOne} card={one} data={data} type="mobile"/>
                <Menu setCard={setThree} card={three} data={data} type="Electronics"/>
                <Menu setCard={setTwo} card={two} data={data} type="Games & Consoles"/>
                <Menu setCard={setFour} card={four} data={data} type="Computing"/>
                <div onMouseEnter={()=>(setMain(true),setOne(false),
                setTwo(false),
                setThree(false) ,
                setFour(false)
                )}
                className="px-6 py-3 rounded-md flex items-center gap-5 text-white xl:text-lg font-bold bg-black">
                    <span>All Categories</span><IoIosArrowDown />
                </div>
                <a href={`/product/1/Electronics`}  onMouseEnter={()=>(setOne(true),setMain(false),
                setTwo(false),
                setThree(false) ,
                setFour(false)
                )}  className='text-black flex items-center gap-2 xl:text-lg font-semibold'>
                <span>Mobile Phones</span><IoIosArrowDown />
                </a>
                <div onMouseEnter={()=>(setOne(false),setMain(false),
                setTwo(true),
                setThree(false),
                setFour(false)
                )} className='text-black flex items-center gap-2 xl:text-lg font-semibold'>
                <span>Games & Consoles</span><IoIosArrowDown />
                </div>
                <div onMouseEnter={()=>(setOne(false),setMain(false),
                setTwo(false),
                setThree(false),
                setFour(true)
                )} className='text-black flex items-center gap-2 xl:text-lg font-semibold'>
                <span>Computing</span><IoIosArrowDown />
                </div>
                <div
                 onMouseEnter={()=>(setOne(false),setMain(false),
                    setTwo(false),
                    setThree(true) ,
                    setFour(false)
                    )} 
                className='text-black flex items-center gap-2 xl:text-lg font-semibold'>
                <span>Electronics</span><IoIosArrowDown />
                </div>
                <div className="xl:text-lg font-semibold text-white px-4 py-2 rounded-md bg-[#56d424]">Sale</div>
            </div>
        </div>
    </section>
  )
}
