import React, { useEffect } from 'react'
import Banner from './Banner'
import PopularProduct from './PopularProduct'
import Testimonial from './Testimonial'
import Stock from './Stock'
import Mobile from './Mobile'
import Brand from './Bands'
import TopSellingCate from './TopSellingCate'
import Cookies from "js-cookie";
import Discount from './Discount'
import useTokenVerification from '../hooks/useTokenVerification'
import axios from 'axios'

export default function Container() {

//  
  return (
    <>
   
      <Banner/>
      <PopularProduct/>
      <Testimonial/>
      <Stock/>
      <Mobile/>
      <TopSellingCate/>
      <Discount/>
      <Brand/>
    
    </>
  )
}
