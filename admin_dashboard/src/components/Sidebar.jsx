import React from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='bg-blue-900 text-white min-h-screen pl-[4vw]'>
      <div className='flex'>
      <img src='/logo.png' alt="Logo" className='mt-5 w-[max(5vw,50px)] hidden sm:block bg-white rounded-full'/>
      <p className='mt-9 text-3xl font-bold hidden sm:block ml-3 '>Listener</p>
      </div>
      <img src='/logo.png' alt="Sidebar" className='mt-5 w-[max(5vw,40px)] block sm:hidden bg-white rounded-full'/>
      <div className='flex flex-col gap-5 mt-10'>
        <NavLink to='/addsong' className={({ isActive }) =>
    `flex items-center gap-3 border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_0_rgba(0,0,0,1)] text-sm font-medium cursor-pointer
    ${isActive ? 'bg-blue-200 text-gray-800' : 'bg-white text-gray-800 hover:bg-blue-200'}`}>
            <img src={assets.add_song} alt="Add Song" className='w-6 h-6' />
            <span>Add Song</span>
        </NavLink>
        <NavLink to='/listsong' className={({ isActive }) =>
    `flex items-center gap-3 border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_0_rgba(0,0,0,1)] text-sm font-medium cursor-pointer
    ${isActive ? 'bg-blue-200 text-gray-800' : 'bg-white text-gray-800 hover:bg-blue-200'}`}>
            <img src={assets.song_icon} alt="Add Song" className='w-6 h-6' />
            <span>List Song</span>
        </NavLink>
        <NavLink to='/addalbum' className={({ isActive }) =>
    `flex items-center gap-3 border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_0_rgba(0,0,0,1)] text-sm font-medium cursor-pointer
    ${isActive ? 'bg-blue-200 text-gray-800' : 'bg-white text-gray-800 hover:bg-blue-200'}`}>
            <img src={assets.add_album} alt="Add Album" className='w-6 h-6' />
            <span>Add Album</span>
        </NavLink>
        <NavLink to='/listalbum' className={({ isActive }) =>
    `flex items-center gap-3 border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_0_rgba(0,0,0,1)] text-sm font-medium cursor-pointer
    ${isActive ? 'bg-blue-200 text-gray-800' : 'bg-white text-gray-800 hover:bg-blue-200'}`}>
            <img src={assets.album_icon} alt="Add Album" className='w-6 h-6' />
            <span>List Album</span>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
