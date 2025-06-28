import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/listener`);
  console.log("MongoDB connected successfully");
};

export default connectDB;
