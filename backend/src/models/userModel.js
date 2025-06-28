import mongoose from "mongoose";

const recentlyPlayedSchema = new mongoose.Schema({
  songId: { type: mongoose.Schema.Types.ObjectId, ref: 'song' },
  playedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
  recentlyPlayed: [recentlyPlayedSchema],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
