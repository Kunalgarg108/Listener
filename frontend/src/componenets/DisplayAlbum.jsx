import React from 'react'
import Navbar from './Navbar'
import { FaRegClock } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { useEffect } from 'react';
import { useState } from 'react';
function DisplayAlbum({ album }) {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const { playwithId, songsData, albumsData } = useContext(PlayerContext);
  useEffect(() => {
    albumsData.map((album) => {
      if (album._id === id) {
        setAlbumData(album);
      }
    })
  }, [id, albumsData]);
  const albumSongs = songsData.filter(song => song.album === albumData.name);
  const albumLength = albumSongs.length;

  const totalSeconds = albumSongs.reduce((acc, song) => {
    const [min, sec] = song.duration.split(':').map(Number);
    return acc + (min * 60 + (sec || 0));
  }, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const durationFormatted = `${hours} hr ${minutes} min`;
  return albumData ? (
    <div>
      <Navbar />
      <div className='mt-10 flex flex-col gap-8 md:flex-row md:items-end'>
        <img className='w-48 rounded' src={albumData.image} />
        <div className='flex flex-col'>
          <p className='text-2xl font-semibold'>PlayList</p>
          <h2 className='text-5xl font-bold mb-4 md:text-7xl'> {albumData.name}</h2>
          <h4 className='text-2xl font-semibold'>{albumData.desc}</h4>
          <p>
            <span>3,63,546 likes</span>
            <span className='mx-2'>•</span>
            <span>{albumLength}</span>
            <span className='mx-2'>•</span>
            <span>{durationFormatted}</span>
          </p>
        </div>
      </div>
      <div className='grid grid-cols-3 sm:grid-col-4 mt-10 mb-4 pl-2 text-color-[#a7a7a7]'>
        <p className='mr-4'># Title</p>
        <p className='hidden sm:block'>Date Added</p>
        <div className='sm:flex items-center sm:ml-auto lg:ml-0 justify-center text-center'>
          <FaRegClock className='text-xl' />
        </div>
      </div>
      <hr />
      {
        songsData.filter(song => song.album == album.name).map((song, index) => {
          return (
            <div onClick={() => playwithId(song._id)} key={index} className='grid grid-cols-3 sm:grid-col-4 mt-2 mb-4 pl-2 cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-in-out'>
              <p className='mr-4 flex gap-3'> <b>{index + 1}</b> <img src={song.image} className='w-10 h-10 rounded' alt="" />
                {song.name}</p>
              <p className='hidden sm:block'> 5 Days Ago</p>
              <div className='sm:flex items-center sm:ml-auto lg:ml-0 justify-center text-center'>
                {song.duration}
              </div>
            </div>
          )
        })
      }
    </div>
  ) : null
}

export default DisplayAlbum
