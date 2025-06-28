import React from 'react'
import { useNavigate } from 'react-router-dom'

function AlbumItem({name,desc,id,image}) {
        const navigateToAlbum = useNavigate();
    return (
    <div onClick={()=>navigateToAlbum(`/album/${id}`)} className='min-w-[200px] max-w-[200px] bg-gray-800 rounded-lg p-2 px-3 cursor-pointer hover:bg-gray-700 transition-all duration-300'>
      <div className="flex justify-center items-center">
      <img src={image} className='w-40 h-40 object-cover rounded-lg shadow-md items-center' alt="" />
      </div>
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <p className='text-slate-200 text-sm '>{desc}</p>
    </div>
  )
}

export default AlbumItem
