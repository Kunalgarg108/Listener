import React from 'react'
import { FaRegClock } from "react-icons/fa";
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
function AllSong() {
    const {songsData,playwithId} = useContext(PlayerContext);
    const totalSeconds = songsData.reduce((acc, song) => {
    const [min, sec] = song.duration.split(':').map(Number);
    return acc + (min * 60 + (sec || 0));
  }, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const durationFormatted = `${hours} hr ${minutes} min`;
 return (
     <div className='p-4 text-white'>
       <h1 className='font-bold my-5 text-2xl'>All Songs</h1>
         <div className='flex flex-col'>
          <p>
            <span className='mx-2'>•</span>
            <span>{songsData.length} Songs</span>
            <span className='mx-2'>•</span>
            <span>{durationFormatted}</span>
          </p>
        </div>
        <div className='grid grid-cols-3 sm:grid-cols-4 mt-8 mb-4 pl-2 text-color-[#a7a7a7]'>
               <p className='mr-4 gap-18 sm:gap-3 w-full sm:w-auto'># Title</p>
               <p className='hidden sm:block'>Album</p>
               <FaRegClock className='text-xl hidden sm:block'/>
              <p className='hidden sm:block'>Description</p>
         </div>
             <hr />
     {
         songsData.map((song, index) => {
             return (
                 <div key={index}
                 onClick={() => playwithId(song._id)} className='grid grid-cols-3 sm:grid-cols-4 mt-2 mb-4 pl-2  cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-in-out'>
                     <p className='mr-4 flex gap-18 sm:gap-3 w-full sm:w-auto'> <b>{index + 1}</b> <img src={song.image} className='w-10 h-10 rounded shrink-0' alt="" />
                   {song.name}</p>
                   <p className='hidden sm:block'>{song.album }</p>
                    <p className='hidden sm:block'>
                    {song.duration}
                    </p>
                    <p className='text-xs hidden sm:block'>
                    {song.desc}
                    </p>
                 </div>
               )
             })
         }
     </div>
   )
 
}

export default AllSong
