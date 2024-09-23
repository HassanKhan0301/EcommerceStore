import React from 'react'
import Navbar from '../components/Navbar'
import Profile from '../components/Profile'
import Footer from '../components/Footer'

function Profiles() {
  return (
    <>
    <Navbar/>
  <div className="min-h-screen">
  <Profile/>
  </div>
  
  <Footer/>
  </>
  )
}

export default Profiles