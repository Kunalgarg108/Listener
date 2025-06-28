import React from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import SongItem from './SongItem'
function DisplayHome() {

  const {songsData,albumsData} = useContext(PlayerContext);
  return (
    <>
      <Navbar/>
      <div className='mb-4'>
        <h1 className='font-bold my-5 text-2xl'>Featured Albums</h1>
        <div className='flex overflow-auto hide-scrollbar gap-5 px-1'>
          {albumsData.slice(0,5).map((item,index)=>(
            <AlbumItem key={index} name={item.name} desc={item.desc} image={item.image} id={item._id}/>
          ))}
        </div>
      </div>
      <div className='mb-4'>
        <h1 className='font-bold my-5 text-2xl'>Biggest Hit's</h1>
        <div className='flex overflow-auto hide-scrollbar gap-1 px-1'>
          {songsData.slice(0,8).map((item,index)=>(
            <SongItem key={index} name={item.name} desc={item.desc} image={item.image} id={item._id}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default DisplayHome
