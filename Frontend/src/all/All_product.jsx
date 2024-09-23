import React from 'react'
import Navbar from '../components/Navbar'
import All_products from '../components/All_products'
import Footer from '../components/Footer'

function All_product() {
  return (
    <>
<Navbar/>
<div className=" min-h-screen">
    <All_products/>
    </div>
<Footer/>
 </>
    
  )
}

export default All_product