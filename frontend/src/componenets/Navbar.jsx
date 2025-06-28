import React from 'react'

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate=useNavigate();
    
  return (
    <>
    <div className='flex items-center gap-2 '>
        <div className='flex items-center gap-2'>
         <FaArrowLeft className='cursor-pointer' onClick={()=>navigate(-1)}/>
         <FaArrowRight className='cursor-pointer' onClick={()=>navigate(1)}/>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <p onClick={()=>navigate('/allsong')} className='text-black bg-white px-2 py-1 hidden rounded-2xl text-[16px] md:block cursor-pointer'>All</p>
          <p onClick={()=>navigate('/history')} className='text-black bg-white px-2 py-1 hidden rounded-2xl text-[16px] md:block cursor-pointer'>History</p>
        <p onClick={()=>navigate('/allsong')} className='text-black bg-white px-2 py-1 hidden rounded-2xl text-[16px] md:block cursor-pointer'>Music</p>
        <p onClick={()=>navigate('/allsong')} className='text-black bg-white px-2 py-1 hidden rounded-2xl text-[16px] md:block cursor-pointer'>Podcast</p>
        </div>
    </div>
    </>
  )
}

export default Navbar
