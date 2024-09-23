import React from 'react'
import {  Navigate, Route, Router, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import Home from './home/Home';
import Signup from './components/Signup';
import Product from './product/Product';
import Profiles from './profile/Profiles';

import { useAuth } from './context/AppProvider';
import Update from './update/Update';

import All_product from './all/All_product';
import SearchResults from './components/SearchResults';


function App() {
  const [authUser,setAuthUser]=useAuth();
  console.log(authUser)
  return (
    <>
    <div>
    <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/all' element={<All_product/>}/>
<Route path='/singnup' element={<Signup/>}/>
<Route path='/add' element={authUser ?<Product/> :<Navigate to='/singnup'/>}/>
<Route path='/edit/:id' element={authUser ?<Update/> :<Navigate to="/singnup"/>}/>
<Route path="/search" element={<SearchResults/>} />

<Route path='/profile' element={authUser ?<Profiles/> : <Navigate to="/singnup"/>}/>



 </Routes>
<Toaster/>

    </div>
    </>
  )
}

export default App