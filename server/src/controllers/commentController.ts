import Music from "../models/Music";
import Comment from "../models/Comment";
import User from "../models/User";

export const getComment = async (req, res) => {
  const { id } = req.params;
  const music = await Music.findById(id).populate({
    path: "comments",
    populate: {
      path: "owner",
    },
  });
  const comments = music.comments.sort((a, b) => b.createdAt - a.createdAt);
  // 최신 댓글이 맨 상단으로 올라올 수 있도록.
  res.status(201).send(comments);
};

export const postComment = async (req, res) => {
  const user = res.locals.user;
  const {
    params: { id },
    body: { comment },
  } = req;

  const music = await Music.findById(id);
  const searchedUser = await User.findById(user.user_id);

  if (!music) {
    return res.status(404).end();
  }

  const newComment = await Comment.create({
    text: comment,
    owner: searchedUser._id,
    music: music._id,
  });

  music.comments.push(newComment);
  music.save();

  searchedUser.comments.push(newComment);
  searchedUser.save();

  return res.status(201).end();
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { commentid } = req.body;

  const music = await Music.findById(id);
  const comment = await Comment.findById(commentid);
  const { user_id } = res.locals.user;

  const foundUser = await User.findById(user_id);

  if (user_id !== String(comment.owner)) {
    return res
      .status(401)
      .json({ message: "댓글 작성자만 삭제할 수 있습니다." });
  }

  if (!comment) {
    return res.status(400).json({ message: "댓글이 존재하지 않습니다." });
  }

  await Comment.findByIdAndDelete(commentid);

  if (!music) {
    return res.status(400).json({ message: "음악이 존재하지 않습니다." });
  }

  music.comments = music.comments.filter(
    (comment) => String(comment) !== commentid
  );

  foundUser.comments = foundUser.comments.filter(
    (comment) => String(comment) !== commentid
  );

  await music.save();
  await foundUser.save();

  res.status(200).json({ message: "댓글 삭제 완료" });
};
