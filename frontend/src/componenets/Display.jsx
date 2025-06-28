import React, { useRef } from 'react'
import { Route , Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import History from './History'
import { PlayerContext } from '../context/PlayerContext'
import { useEffect } from 'react';
import { useContext } from 'react';
import AllSong from './AllSong';
import Premium from './Premium'
import Profile from './Profile';

function Display() {
  const { albumsData } = useContext(PlayerContext); 

    const displayRef =useRef();
    const location=useLocation();
    
    const isAlbumPage = location.pathname.includes('album');
    const AlbumId= isAlbumPage ? location.pathname.split('/').pop() : ""; 
    
    const bgColor = isAlbumPage && albumsData.length > 0 ?albumsData.find(album => album._id == AlbumId).bgColor : '#101010';
    
    useEffect(() => {
        if (!displayRef.current) return;
        if (isAlbumPage) {
          displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
        }
        else{
            displayRef.current.style.backgroundColor = '#101010';
        }
    }, [isAlbumPage, bgColor, AlbumId, albumsData]);

  return (
    <div ref={displayRef} className='w-[100%] pt-4 px-6 m-0.5 rounded bg-[#101010] text-white overflow-auto lg:w-[75%] lg:mt-0'>
      {albumsData.length > 0 ? <Routes>
          <Route path='/' element={<DisplayHome/>} />
          <Route path='/history' element={<History />} />
          <Route path='/allsong' element={<AllSong />} />
          <Route path='/premium' element={<Premium />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find(album => album._id == AlbumId)} />} />
        </Routes> : null }

    </div>
  )
}

export default Display
