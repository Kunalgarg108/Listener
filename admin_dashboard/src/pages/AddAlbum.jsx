import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import {url} from '../App'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
function AddAlbum() {
    const [image, setImage] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [loading, setLoading] = useState(false);
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('image', image);
            formData.append('bgColor', bgColor);
            const res = await axios.post(`${url}/api/album/add`, formData);
            if (res.data.success) {
                setName('');
                setDesc('');
                setImage(false);
                setBgColor('#ffffff');
                toast.success('Album added successfully');
            } else {
                toast.error('Failed to add album');
            }
        } catch (error) {
            toast.error('Failed to add album: Error occurred');
        }
        setLoading(false);
    }

  return loading ? (<div className='grid place-items-center min-h-[80vh]'>
    <div className='w-16 h-16 place-self-center border-4 border-gray-500 border-t-blue-800 rounded-full animate-spin'>

    </div>
  </div>):(
     <form onSubmit={onSubmitHandler}
     action="" className='flex flex-col items-start gap-8 text-gray-700'>
       <div className='flex flex-col w-full gap-4'>
        <p>Upload Image</p>
          <input onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                  setImage(file);
              }
          }} type="file" id='image' accept='image/*' hidden/>
         <label htmlFor="image">
          <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" className='w-24 cursor-pointer'/>
         </label>
         <div className='flex flex-col gap-3'>
            <label htmlFor="name">Album Name</label>
             <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" className='border border-gray-300 p-2 rounded w-[max(50vw,250px)] hover:border-blue-800' placeholder='Type Here' />
         </div>
           <div className='flex flex-col gap-3'>
            <label htmlFor="desc">Album Description</label>
             <input onChange={(e) => setDesc(e.target.value)} value={desc} type="text" id="desc" className='border border-gray-300 p-2 rounded w-[max(50vw,250px)] hover:border-blue-800' placeholder='Type Here' />
         </div>
         <div className='flex flex-col gap-3'>
            <label htmlFor="bgColor">Background Color</label>
             <input onChange={(e) => setBgColor(e.target.value)} value={bgColor} type="color" id="bgColor"/>
         </div>
       </div>
       <button type="submit" className='bg-black text-white p-2 rounded text-base px-2.5 py-1.4 hover:bg-gray-800'>Add Album</button>
     </form>
  )
}

export default AddAlbum
