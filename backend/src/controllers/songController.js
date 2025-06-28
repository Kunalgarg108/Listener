import {v2 as cloudinary} from 'cloudinary';
import songModel from '../models/songModel.js';

const addSong= async(req,res)=>{
   try{
    const name=req.body.name;
    const desc=req.body.desc;
    const album=req.body.album;
    if (!req.files || !req.files.audio || !req.files.image) {
      return res.status(400).json({ message: "Audio and Image files are required." });
    }
    const audioFile=req.files.audio[0];
    const imageFile=req.files.image[0];
    const audioUpload=await cloudinary.uploader.upload(audioFile.path,{
        resource_type: "video",
    });
    const imageUpload=await cloudinary.uploader.upload(imageFile.path,{
        resource_type: "image",
    });

    const duration=`${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60).toString().padStart(2, '0')}`;
    const songData={
        name,
        desc,
        image: imageUpload.secure_url,
        album,
        file: audioUpload.secure_url,
        duration
    }
    const song=songModel(songData);
    await song.save();
    res.status(200).json({ success: true, message: "Upload successful", audioUpload, imageUpload });

   }
   catch(e){
      console.error("Error uploading song:", e);
    res.status(500).json({ success: false, message: "Internal Server Error", error: e.message });
   }
}
const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.status(200).json({ success: true, songs: allSongs });
  } catch (e) {
    console.error("Error fetching songs:", e);
    res.status(500).json({ success: false, message: "Internal Server Error", error: e.message });
  }
}

const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Song removed successfully" });
  } catch (e) {
    console.error("Error removing song:", e);
    res.status(500).json({ success: false, message: "Internal Server Error", error: e.message });
  }
};


export {
    addSong,
    listSong,
    removeSong
}