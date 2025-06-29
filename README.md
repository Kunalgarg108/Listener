# 🎵 Listener (MERN Stack)
---
## Overview

### **Listener** is a full-featured music streaming web application inspired by Spotify. Built using the **MERN** stack, it offers both a user-facing music player and an admin dashboard for managing songs and albums. The project supports secure authentication, music uploads, album management, and a seamless listening experience.

---

## Features
- **User Authentication:** Login and signup using Firebase (Email & Google Auth)
- **Routing:** Managed with `react-router-dom` for a smooth user experience
- **Notifications:** Uses `react-toastify` for toast messages
- **Mobile Responsive:** Special media queries ensure a smooth experience on mobile devices

---
## Tech Stack
- **React (Vite):** Fast and optimized front-end framework
- **Firebase:** Used for user authentication (Email & Google)
- **React Router:** Enables navigation and routing
- **React Icons:** Provides icon support
- **React Toastify:** Handles toast notifications
- **Swiper:** Adds smooth carousel functionality

 ---
 
##  Installation Guide 
### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/Kunalgarg108/Hype-Haven-Clothing.git
cd Hype-Haven-Clothing
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Setup Firebase
- Go to Firebase Console
- Create a new project
- Enable Authentication > Sign-in Methods
- Enable Google Sign-In and Email/Password Sign-In
- Copy Firebase Config from Project Settings


### 4️⃣ Create .env File
Create a .env file in the root directory and add your Firebase credentials:
```sh
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

```
### 5️⃣ Run the Project
```sh
npm run dev
```

---

## Screenshots
<div style="display: flex; flex-wrap: wrap; justify-content: center;">
  <img src="https://raw.githubusercontent.com/Kunalgarg108/Hype-Haven-Clothing/main/public/image2.png" width="45%">
  <img src="https://raw.githubusercontent.com/Kunalgarg108/Hype-Haven-Clothing/main/public/image1.png" width="45%">
  <img src="https://raw.githubusercontent.com/Kunalgarg108/Hype-Haven-Clothing/main/public/image3.png" width="45%">
  <img src="https://raw.githubusercontent.com/Kunalgarg108/Hype-Haven-Clothing/main/public/image4.png" width="45%">
  <img src="https://raw.githubusercontent.com/Kunalgarg108/Hype-Haven-Clothing/main/public/image5.png" width="45%">
  <img src="https://raw.githubusercontent.com/Kunalgarg108/Hype-Haven-Clothing/main/public/image6.png" width="45%">
  <img src="https://raw.githubusercontent.com/Kunalgarg108/Hype-Haven-Clothing/main/public/image7.png" width="45%">
  <img src="https://raw.githubusercontent.com/Kunalgarg108/Hype-Haven-Clothing/main/public/image8.png" width="45%">
  <img src="https://raw.githubusercontent.com/Kunalgarg108/Hype-Haven-Clothing/main/public/image9.png" width="45%">
  <img src="https://raw.githubusercontent.com/Kunalgarg108/Hype-Haven-Clothing/main/public/image10.png" width="45%">
</div>

---
## Folder Structure
```
Hype-Haven/
├── public/          # Static files and screenshots
├── src/             # Main source folder
│   ├── assets/      # Images, fonts, and other assets
│   ├── components/  # Reusable components
│   │   ├── BestSeller.jsx
│   │   ├── CardHome.jsx
│   │   ├── CartTotal.jsx
│   │   ├── Footer.jsx
│   │   ├── LatestCollection.jsx
│   │   ├── Navbar.jsx
│   │   ├── NewsLetterBox.jsx
│   │   ├── Policy.jsx
│   │   ├── ProductItem.jsx
│   │   ├── RelatedProduct.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Title.jsx
│   ├── context/     # Context API files
│   │   ├── Shopcontext.jsx
│   ├── pages/       # Application pages
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   ├── Collection.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Order.jsx
│   │   ├── Placeorder.jsx
│   │   ├── Product.jsx
│   ├── App.jsx      # Root app component
│   ├── firebase.js  # Firebase configuration
│   ├── index.css    # Global styles
│   ├── main.jsx     # Entry point for React
├── .env # Environment variables
├── index.html
├── tailwind.config.js

```
