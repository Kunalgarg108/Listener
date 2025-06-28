import React from 'react'
import { useState } from 'react';
import { FaVolumeUp } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { FaShuffle } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { RiLoopRightFill } from "react-icons/ri";
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

function Player() {
  const { seekBg, seekBar, audioRef, play, pause, isPlaying, track, time, previous, next, seekSong, handleVolumeChange, volume, isLooping, setIsLooping, isShuffling, setIsShuffling, togglePlayPause } = useContext(PlayerContext);

  const [showSlider, setShowSlider] = useState(false);

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };
  return track ? (
    <>
      <div className='h-[10%] flex justify-between items-center bg-black px-4 text-white'>
        <div className='lg:flex items-center gap-4 hidden'>
          <img src={track.image} alt="Song Cover" className='w-12 h-12 rounded-full' />
          <div className='flex flex-col'>
            <p className='font-bold'>{track.name}</p>
            <p className="text-xs text-gray-400 whitespace-pre-wrap break-words w-40">
              {track.desc.length > 25 ? track.desc.slice(0, 25) + "..." : track.desc}
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-1 items-center'>
          <div className='flex gap-4'>
            <FaShuffle onClick={() => setIsShuffling(!isShuffling)} className={`text-xl mt-1.5 cursor-pointer ${isShuffling ? 'text-blue-500' : ''}`} />
            <MdSkipPrevious className='text-3xl cursor-pointer' onClick={previous} />
            {isPlaying ? (
              <FaPause className="text-xl mt-1.5 cursor-pointer" onClick={togglePlayPause} />
            ) : (
              <FaPlay className="text-xl mt-1.5 cursor-pointer" onClick={togglePlayPause} />
            )}
            <MdSkipNext className='text-3xl cursor-pointer' onClick={next
            } />
            <RiLoopRightFill onClick={() => setIsLooping(!isLooping)} className={`text-xl mt-1.5 cursor-pointer ${isLooping ? 'text-blue-500' : ''}`} />
          </div>
          <div className='flex items-center gap-5'>
            <p>{time.currentTime.minute}:{time.currentTime.second}</p>
            <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-500 rounded-full cursor-pointer'>
              <hr ref={seekBar} className='h-1 bg-green-600 border-none w-0 rounded-full' />
            </div>
            <p>{time.totalTime.minute}:{time.totalTime.second}</p>
          </div>
        </div>
        <div className='lg:flex items-center hidden gap-2 opacity-75 pr-10'>
          <FaVolumeUp className='text-xl cursor-pointer' onClick={toggleSlider} />

          {showSlider && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="left-8 top-1 w-30 accent-green-500"
            />
          )}
        </div>
      </div>
    </>
  ) : null
}

export default Player
