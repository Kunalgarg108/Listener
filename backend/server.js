import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
import authRouter from './src/routes/authRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/auth', authRouter);

app.use('/api/song',songRouter);
app.use('/api/album', albumRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});