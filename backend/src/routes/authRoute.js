import express from 'express';
const userRouter=express.Router();
import { registerUser,loginUser,getHistory,postHistory,verifyEmail,getUserProfile } from '../controllers/authController.js';   

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/history', postHistory);
userRouter.get('/verify-email', verifyEmail);
userRouter.get('/profile', getUserProfile);
userRouter.get('/:userId',getHistory);
export default userRouter;