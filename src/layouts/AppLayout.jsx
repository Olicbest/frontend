import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
// import JobCard from '../components/JobCard'


const AppLayout = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    {/* <JobCard /> */}
    <Outlet />
    <Footer/>
    </>
  )
}

export default AppLayout