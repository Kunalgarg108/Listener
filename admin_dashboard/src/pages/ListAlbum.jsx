import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { url } from '../App'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
function ListAlbum() {
  const [data, setData] = useState([])
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`)
      if (response.data.success) {
        setData(response.data.albums)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Failed to fetch albums: Error occurred')
    }
  }
  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id })
      if (response.data.success) {
        toast.success('Album removed successfully')
        await fetchAlbums()
      } else {
        toast.error('Error occurred')
      }
    } catch (error) {
      toast.error('Failed to remove album: Error occurred')
    }
  };

  useEffect(() => {
    fetchAlbums()
  },[]);
  return (
    
    <div>
      <p className='text-lg font-bold'>All Album List
      </p>
        <br />
        <div>
          <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-3 p-3 border border-gray-600 text-sm bg-gray-300'>
        <b>Image</b>
        <b>Title</b>
        <b>Description</b>
        <b>Album Color</b>
        <b>Action</b>
      </div>
      {
        data.map((album, index) => {
          return (
            <div key={index} className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-3 p-3'>
              <img src={album.image} alt="Album" className='w-12 rounded-full' />
              <p>{album.name}</p>
              <p>{album.desc}</p>
               <input type="color" value={album.bgColor} />
               <p onClick={() => removeAlbum(album._id)} className='cursor-pointer text-red-500 text-xl'>x</p>
            </div>
          )
        })
      }
        </div>
    </div>
  )
}

export default ListAlbum
