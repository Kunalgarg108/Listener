import { useState } from 'react'
import { ToastContainer ,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route } from 'react-router-dom'
import AddSong from './pages/AddSong'
import AddAlbum from './pages/AddAlbum'
import ListSong from './pages/ListSong'
import ListAlbum from './pages/ListAlbum'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export const url = import.meta.env.VITE_API_URL || 'http://localhost:4000';
function App() {

  return (
   <>
   <div className='flex items-start min-h-screen'>
   <ToastContainer />
   <Sidebar/>
   <div className='flex-1 h-screen overflow-y-scroll bg-gray-100'>
    <Navbar/>
      <div className='px-8 pl-5 sm:pt-12 sm:pl-12'>
        <Routes>
          <Route path='/addsong' element={<AddSong />} />
          <Route path='/addalbum' element={<AddAlbum />} />
          <Route path='/listsong' element={<ListSong />} />
          <Route path='/listalbum' element={<ListAlbum />} />
        </Routes>
      </div>
   </div>
   </div>
   </>
  )
}

export default App
