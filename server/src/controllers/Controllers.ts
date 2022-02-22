import Music from "../models/Music";
import Comment from "../models/Comment";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerView = (req, res) => {
  console.log("register view에 도착했습니다.");
  res.json({ hello: "노디몬" });
};

export const getMusicList = async (req, res) => {
  const list = await Music.find({})
    .populate("owner")
    .populate({
      path: "comments",
      populate: { path: "owner" },
    });
  // 배열을 리턴해준다.

  res.send(list); // res.send 로 배열을 보내줌.
};

export const searchTitle = async (req, res) => {
  const { keyword } = req.query;
  console.log(keyword);
  let musics;
  if (keyword) {
    musics = await Music.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    });
  }
  res.json({ list: musics });
};

export const viewMusic = async (req, res) => {
  const { id } = req.params;
  const music = await Music.findById(id)
    .populate("owner")
    .populate({ path: "comments", populate: { path: "owner" } });
  return res.json({ music });
};

export const deleteMusic = async (req, res) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;

  const music = await Music.findById(id);
  if (user_id === String(music.owner)) {
    await music.delete();
    return res.json({ message: "음악 삭제 완료" });
  }
  return res.json({ message: "음악 작성자만 삭제할 수 있습니다." });
  // api 로 요청한 것들은 모두 proxy localhost:9000 으로 가기 때문에
  // localhost:9000 으로 redirect "/" 하고 있어서 에러가 발생하는 거 같은데? 아닐 수도 있음.
};

export const postUpdateMusic = async (req, res) => {
  const { user_id } = res.locals.user;
  const { id } = req.params;
  const { title, content } = req.body;

  const music = await Music.findById(id);
  if (user_id === String(music.owner)) {
    music.title = title;
    music.content = content;
    await music.save();
    return res.json({ message: "업데이트 완료" });
  }

  return res
    .status(401)
    .json({ message: "음악 소유자만 업데이트 할 수 있습니다." });
};

//user

export const join = async (req, res) => {
  const { password, username, email, location } = req.body;
  const exists = await User.findOne({ email });

  if (exists) {
    return res
      .status(400)
      .json({ message: "해당 이메일을 가지고 있는 계정이 존재합니다." })
      .end();
  }
  try {
    await User.create({ password, username, email, location });
  } catch (error) {
    return res.status(400).json({ message: "에러가 발생했습니다." }).end();
  }

  return res.status(200).json({ message: "회원가입 완료" }).end();
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "아이디가 존재하지 않습니다." })
      .end();
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res
      .status(400)
      .json({ message: "비밀번호가 일치하지 않습니다." })
      .end();
  }
  const token = jwt.sign(
    {
      user_id: user._id,
    },
    process.env.SECRET_KEY || "secret key",
    {
      expiresIn: "1h",
    }
  );
  // jwt 에 넣을 사용자 정보는 절대 비밀번호나 주민번호와 같은
  // 민감한 정보를 담고 있어서는 안된다.

  // user 가 db에 존재하는 경우 jwt 를 새로 생성하여 쿠키에 저장하고, 201 응답을 반환.
  res.cookie("user", token);
  return res.status(201).json({
    result: "ok",
    token,
  });
};
export const getUpdateProfile = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  res.send(user);
};

export const postUpdateProfile = async (req, res) => {
  const { id } = req.params;
  const { email, username, location } = req.body;

  const exists = await User.exists({
    $or: [{ username }, { email }],
  });

  if (exists) {
    return res
      .status(400)
      .json({ errorMessage: "이미 사용하고 있는 username 또는 email 입니다." });
  }
  const user = await User.findByIdAndUpdate(id, {
    email,
    username,
    location,
  });
  return res.status(200).json({ errorMessage: "업데이트 완료" });
};

export const logOut = (req, res) => {
  return res.status(200).end();
};

export const postUpdateProfileImage = async (req, res) => {
  const { file } = req;
  const isHeroku = process.env.NODE_ENV === "production";
  const {
    locals: {
      user: { user_id: _id },
    },
  } = res;
  await User.findByIdAndUpdate(_id, {
    profileImageUrl: file
      ? isHeroku
        ? file.location
        : file.path
      : "파일 없음",
  });
  return res.json({ message: "프로필 이미지가 업데이트 되었습니다." });
};

export const postUpload = async (req, res) => {
  const {
    user: { user_id: _id },
  } = res.locals;

  const isHeroku = process.env.NODE_ENV === "production";
  const { title, content } = req.body;
  const { music, thumbnail } = req.files;
  try {
    const newMusic = await Music.create({
      title,
      content,
      fileUrl: isHeroku ? music[0].location : music[0].path,
      thumbUrl: isHeroku ? thumbnail[0].location : thumbnail[0].path,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.musics.push(newMusic._id);
    await user.save();
  } catch (error) {
    return res.status(400).redirect("/");
  }
  res.redirect("/");
};

export const getUserInfo = async (req, res, next) => {
  const user = res.locals.user;
  const findedUser = await User.findById(user.user_id).populate("musics");
  res.send(findedUser);
};

export const getComment = async (req, res) => {
  const { id } = req.params;
  const music = await Music.findById(id).populate({
    path: "comments",
    populate: {
      path: "owner",
    },
  });
  const comments = music.comments.sort((a, b) => b.createdAt - a.createdAt);
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
  const { commentid, ownerid } = req.body;

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

export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  const { username, musics, profileImageUrl, _id } = await User.findById(
    id
  ).populate("musics");

  res.json({ username, musics, profileImageUrl, _id });
};
