import React from 'react'
import { Outlet } from 'react-router'
import Footer from './Footer'
import List from '../Details/List'
import Home from './Home'
import Navbar from './Navbar'
import Categories from './Categories'

export default function UserRoutes() {
  return (
    <>
        <List />
        <Home />
        <Navbar />
        <Categories />
      <Outlet/>
      <Footer/>
    </>
  )
}
