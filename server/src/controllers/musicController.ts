import Music from "../models/Music";
import User from "../models/User";

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

export const viewMusic = async (req, res) => {
  const { id } = req.params;
  const music = await Music.findById(id)
    .populate("owner")
    .populate({ path: "comments", populate: { path: "owner" } });
  return res.send(music);
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

export const registerView = (req, res) => {
  console.log("register view에 도착했습니다.");
  res.json({ hello: "노디몬" });
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
