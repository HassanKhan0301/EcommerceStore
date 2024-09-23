import React from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AppProvider'
import User from '../../../Backend/Model/user-model'

function Logout() {
  const [authUser,setAuthUser]=useAuth()
  const handleLogout=()=>{
    try{
      setAuthUser({
        ...authUser,
        User:null
      })
      localStorage.removeItem("Users");
      toast.success("logout Succefully");
      setTimeout(()=>{
        window.location.reload();
      },3000)
    }
    catch (error){
      toast.error("Error :"+error)
      setTimeout(()=>{},2000)
    }
  }
  return (
    <div>     
        
    <button
className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer ml-2"
onClick={handleLogout}

>
Logout 
</button></div>

  )
}

export default Logout