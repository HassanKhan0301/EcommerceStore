import React from 'react'
import Navbar from '../components/Navbar'
import Updates from '../components/Updates'
import Footer from '../components/Footer'

function Update() {
  return (
    <>
    <Navbar/>
  <div className="min-h-screen">
  <Updates/>
  </div>
  
  <Footer/>
  </>
  )
}

export default Update