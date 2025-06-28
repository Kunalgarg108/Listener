import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { GoStack } from "react-icons/go";
import { useState } from 'react';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
     <div
      className={`${
        isExpanded ? 'w-full' : 'w-[25%]'
      } bg-gray-800 text-white flex-col lg:flex hidden transition-all duration-300`}
    >
      <div className='h-[99.8%] bg-[#101010]'>
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-3'>
            <GoStack className='text-2xl' />
            <p className='font-bold text-xl'>Your Library</p>
          </div>
          <div className='flex items-center gap-3'>
             {isExpanded ? (
              <FaArrowLeft
                className='cursor-pointer'
                onClick={() => setIsExpanded(false)}
              />
            ) : (
              <FaArrowRight
                className='cursor-pointer'
                onClick={() => setIsExpanded(true)}
              />
            )}
            <FaPlus className='cursor-pointer' />
          </div>
        </div>
        <div className='flex bg-[#242423] flex-col rounded p-4 m-2 items-start justify-start font-semibold'>
          <h2 className='text-xl'>
            Create You Own Playlist
          </h2>
          <p className='font-light'>It's very easy to make</p>
          <button className='bg-white text-black py-1.5 px-2 m-2 rounded-full cursor-pointer'>Create</button>
        </div>
        <div className='pt-104 bottom-0 w-full text-gray-400 p-4 flex gap-6 justify-center '>
            <div>
              <a href=""><span className='hover:text-blue-800'>
                Legal
              </span>
              </a>
            </div>
            <div>
              <a href=""><span className='hover:text-blue-800'>
                Privacy Center
              </span>
              </a>
            </div>
            <div>
              <a href=""><span className='hover:text-blue-800'>
                Cookies Policy
              </span>
              </a>
            </div>
            <div>
              <a href=""><span className='hover:text-blue-800'>
                Accessibility
              </span>
              </a>
          </div>


        </div>
      <p className='text-xs text-gray-500 text-center'>The listener does not own the rights to any of the songs featured.</p>
      </div>
    </div>
  )
}

export default Sidebar
