import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
