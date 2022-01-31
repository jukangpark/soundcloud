import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
export default Post;
