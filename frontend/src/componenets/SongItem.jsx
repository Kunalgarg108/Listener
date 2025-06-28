import React from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { useContext } from 'react';
function SongItem({name,desc,id,image}) {
  const {playwithId} = useContext(PlayerContext);

  return (
    <>
      <div onClick={()=>playwithId(id)} className='min-w-[215px] max-w-[250px] bg-gray-800 rounded-lg p-2 px-3 cursor-pointer hover:bg-gray-700 transition-all duration-300'>
        <div className="flex justify-center items-center">
      <img src={image} className='w-45 h-40 object-cover rounded-lg shadow-md items-center' alt="" />
      </div>
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <p className='text-slate-200 text-sm '>{desc}</p>
    </div>
    </>
  )
}

export default SongItem
