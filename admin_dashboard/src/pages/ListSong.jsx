import React, { use } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { url } from '../App'
import { toast } from 'react-toastify';
import { useEffect } from 'react';


function ListSong() {
  const [data,setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch songs:Error occurred');
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data.success) {
        toast.success('Song removed successfully');
        await fetchSongs();
      } else {
        toast.error("Error occurred");
      }
    } catch (error) {
      toast.error('Failed to remove song:Error occurred');
    }
  };
  useEffect(() => {
    fetchSongs();
  }, []);

return (
  <div>
    <p className='text-lg font-semibold'>All Songs List</p>
    <br />
    <div>
      <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-3 p-3 border border-gray-600 text-sm bg-gray-300'>
        <b>Image</b>
        <b>Title</b>
        <b>Album</b>
        <b>Duration</b>
        <b>Action</b>
      </div>

      {data.map((song, index) => {
        return(
        <div key={index} className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-3 p-3'>
          <img src={song.image} alt="Song" className='w-12 rounded-full' />
          <p>{song.name}</p>
          <p>{song.album}</p>
          <p>{song.duration}</p>
          <p className='cursor-pointer text-red-500 text-xl' onClick={() => removeSong(song._id)}>x</p>
        </div>)
})}
    </div>
  </div>
)
}



export default ListSong
