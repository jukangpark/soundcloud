import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const getUserInfo = async (req, res, next) => {
  const user = res.locals.user;
  const findedUser = await User.findById(user.user_id).populate("musics");
  res.send(findedUser);
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  const { username, musics, profileImageUrl, _id } = await User.findById(
    id
  ).populate("musics");

  res.json({ username, musics, profileImageUrl, _id });
};
