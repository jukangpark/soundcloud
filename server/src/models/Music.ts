import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
});

const Music = mongoose.model("Music", musicSchema);

export default Music;
