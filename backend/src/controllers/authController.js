import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verified: false
    });

    await newUser.save();
    const emailToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    const verifyUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${emailToken}`;
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });


   const mailOptions = {
    from: `"Listener App" <your-email@gmail.com>`,
    to: newUser.email,
    subject: 'Verify your email',
    text: `Verify your email here: ${verifyUrl}`,
    html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`
  };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Registration successful, check your email for verification link" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).send("Missing token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send("User not found");

    user.verified = true;
    await user.save();

    res.status(200).send("Email verified successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid or expired token");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "Invalid credentials" });

    if (!user.verified) {
      return res.status(401).json({ success: false, message: "Email not verified. Please check your email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate({
        path: 'recentlyPlayed.songId',
        model: 'song',
      })  
      .exec();

    if (!user) return res.status(404).send('User not found');
    const cleaned = user.recentlyPlayed.filter(
      entry => entry.songId !== null 
    );
    res.status(200).json(cleaned);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const postHistory = async (req, res) => {
  const { userId, songId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');
    user.recentlyPlayed = user.recentlyPlayed.filter(
      item => item && item.songId && item.songId.toString() !== songId
    );
    user.recentlyPlayed.unshift({ songId });
    if (user.recentlyPlayed.length > 20) user.recentlyPlayed.pop();

    await user.save();

    res.status(200).send('Added to recently played');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getUserProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('name email');
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}