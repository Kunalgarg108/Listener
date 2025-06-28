import React, { useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { url } from '../App'
import { toast } from 'react-toastify'

function AddSong() {
  const [image,setImage] = useState(false);
  const [song,setSong] = useState(false);
  const [name,setName] = useState('');
  const [desc,setDesc] = useState('');
  const [album,setAlbum] = useState('none');
  const [loading,setLoading] = useState(false);
  const [albumData,setAlbumData] = useState([]);

  const onSubmitHandlar = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData=new FormData();
      formData.append('name',name);
      formData.append('desc',desc);
      formData.append('image',image);
      formData.append('audio',song);
      formData.append('album',album);
      const res = await axios.post(`${url}/api/song/add`,formData);
      if(res.data.success) {
        setName('');
        setDesc('');
        setImage(false);
        setSong(false);
        setAlbum('none');
        toast.success('Song added successfully');
      }
      else{
        toast.error('Failed to add song');
      }
    } catch (error) {
      toast.error('Failed to add song:Error occurred');
    }
    setLoading(false);
  }

  const loadalbumData=async()=>{
    try {
      const res=await axios.get(`${url}/api/album/list`);
      if(res.data.success){
        setAlbumData(res.data.albums);
      }
      else{
        toast.error("Unable to albums data");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  }

  useEffect(()=>{
    loadalbumData();
  },[])

  return loading ? (<div className='grid place-items-center min-h-[80vh]'>
    <div className='w-16 h-16 place-self-center border-4 border-gray-500 border-t-blue-800 rounded-full animate-spin'>

    </div>
  </div>) : (
    <form onSubmit={onSubmitHandlar}
    action="" className='flex flex-col items-start gap-8 text-gray-700'>
        <div className='flex gap-8'>
           <div className='flex flex-col gap-4'>
               <p>Upload Song</p>
               <input onChange={(e)=>{
                   const file = e.target.files[0];
                   if (file) {
                       setSong(file);
                   }
               }} type="file" id='song' accept='audio/*' hidden/>
               <label htmlFor="song">
                <img src={song?assets.upload_added:assets.upload_song} alt="" className='w-24 cursor-pointer'/>
               </label>
           </div>
           <div className='flex flex-col gap-4'>
               <p>Upload Image</p>
               <input onChange={(e)=>{
                   const file = e.target.files[0];
                   if (file) {
                       setImage(file);
                   }
               }} type="file" id='image' accept='image/*' hidden/>
               <label htmlFor="image">
                <img src={image? URL.createObjectURL(image) :assets.upload_area} alt="" className='w-24 cursor-pointer'/>
               </label>
           </div>
        </div><div className='flex flex-col gap-4'>
           <p>Song Title</p>
           <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter title' className='border border-gray-300 p-2 rounded w-[max(40vw,250px)] hover:border-blue-800' required
            />
       </div>
       <div className='flex flex-col gap-4'>
           <p>Song Description</p>
           <input onChange={(e)=>setDesc(e.target.value)} value={desc} type="text" placeholder='Enter description' className='border border-gray-300 p-2 rounded w-[max(40vw,250px)] hover:border-blue-800' required/>
       </div>
       <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select  onChange={(e)=>setAlbum(e.target.value)} defaultValue={album} className='bg-transparent outline-blue-500 border-gray-500 p-2.5 w-[150px] rounded hover:border-blue-800' required>
            <option value="none">None</option>
            {albumData.map((item,index)=>(
       <option key={index} value={item.name}>{item.name}</option>
            ))}
       </select>
       </div>
       <button type='submit' className='text-base text-white bg-black py-2.5 px-14 cursor-pointer hover:bg-gray-800'>Add Song</button>
    </form>
  )
}

export default AddSong
