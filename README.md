# 🎵 Listener (MERN Stack)
---
## Overview

#### **Listener** is a full-featured music streaming web application inspired by Spotify. Built using the **MERN** stack, it offers both a user-facing music player and an admin dashboard for managing songs and albums. The project supports secure authentication, music uploads, album management, and a seamless listening experience.

---

## ✨ Features
### 🎶 Frontend (User Side)
- Browse and play songs and albums.
- Seekbar, volume control, shuffle, and looping.
- **User authentication** with JWT and email verification.
- Profile page with user details.
- History page to view previously played songs.
- Responsive and clean UI.

### 🛠️ Admin Dashboard
- Add new songs and albums via form uploads.
- View and manage listed songs and albums.
- Upload images and audio files via Cloudinary.

### 📡 Backend
- Secure authentication using JWT.
- Password hashing with bcrypt.
- Email services via Nodemailer.
- File uploads handled with Multer and stored in Cloudinary.

---

## Screenshots
<div style="display: flex; flex-wrap: wrap; justify-content: center;">
  <img src="images/image1.png" width="90%">
  <img src="images/image7.png" width="45%">
  <img src="images/image6.png" width="45%">
  <img src="images/image5.png" width="45%">
  <img src="images/image4.png" width="45%">
  <img src="images/image3.png" width="45%">
  <img src="images/image2.png" width="45%">
  <img src="images/image9.png" width="45%">
  <img src="images/image8.png" width="45%">
</div>

---
## 📚 Tech Stack

### 🖥️ Frontend
- **React** `^19.1.0`
- **React Router DOM** `^7.6.2`
- **Tailwind CSS** `^4.1.10`
- **Axios** `^1.10.0`
- **React Toastify** `^11.0.5`
- **React Icons** `^5.5.0`
- **jwt-decode** `^4.0.0`

### ⚙️ Backend
- **Node.js** `^18+`
- **Express** `^5.1.0`
- **Mongoose** `^8.16.0`
- **bcryptjs** `^3.0.2`
- **jsonwebtoken** `^9.0.2`
- **dotenv** `^16.5.0`
- **cors** `^2.8.5`
- **multer** `^2.0.1`
- **nodemailer** `^7.0.3`
- **cloudinary** `^2.7.0`
- **nodemon** `^3.1.10`

 ---
 
##  Installation Guide 
### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/Kunalgarg108/Listener.git
cd Listener
```

### 2️⃣ Install Dependencies  
```sh
cd backend
npm install
cd ../frontend
npm install
cd ../admin_dashboard
npm install
```


### 3️⃣ Create .env File
Create a .env file in the backend/ directory:
```sh
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_SECRET_KEY
MONGODB_URI
JWT_SECRET
EMAIL_USER
EMAIL_PASS
BASE_URL=http://localhost:4000
PORT=4000

```
### 4️⃣ Run the Project
```sh
cd backend
npm run server
cd frontend
npm run dev
cd admin_dashboard
npm run dev
```

