import {v2 as cloudinary} from 'cloudinary';
import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Album cover image is required." });
    }
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };
    const album = albumModel(albumData);
    await album.save();
    res.status(200).json({success: true, message: "Album added successfully", album });
  } catch (e) {
    console.error("Error adding album:", e);
    res.status(500).json({ success: false, message: "Internal Server Error", error: e.message });
  }
};

const listAlbums = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({});
    res.status(200).json({ success: true, albums: allAlbums });
  } catch (e) {
    console.error("Error fetching albums:", e);
    res.status(500).json({ success: false, message: "Internal Server Error", error: e.message });
  }
};

const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.status(200).json({success: true, message: "Album removed successfully" });
  } catch (e) {
    console.error("Error removing album:", e);
    res.status(500).json({ success: false, message: "Internal Server Error", error: e.message });
  }
};

export {
  addAlbum,
  listAlbums,
  removeAlbum
};