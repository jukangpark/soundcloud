import Music from "../models/Music";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerView = (req, res) => {
  console.log("register view에 도착했습니다.");
  res.json({ hello: "노디몬" });
};

export const view = async (req, res) => {
  const list = await Music.find();
  // 배열을 리턴해준다.

  // 선회하는 구조를 JSON으로 바꾸려고 해서 나는 에러이다. 배열을 json 형태로 바꿔줬기 때문에 그런듯..
  // JSON 객체의 직렬화에 대상은 ownProperty 이면서, enumerable 한것만 직렬화 대상이된다.
  // 배열이 리턴되었음. 그리고 그 배열안에는 객체가 있다.
  res.send(list);

  // res.send 로 전달해주면 배열 형태로 전해주고
  // res.json 형태로 전달해주면 {} 객체 형태가 됨.
  // list 를 키 값으로 하는 객체를 json 형태로 stringify 해서 보내주는 거였음....
  // 왜 이런식으로 json 으로 넘겨줬는데 map 함수로 돌릴 수 없다고 하지?
  // data 타입이 객체여서 그런건가? oo
  // data 타입이 객체이고 그 객체안에 배열이 있기 때문에
  // 그 배열을 map 함수로 돌려줘야함...
};

// res.json  과 res.send의 차이 때문에 잘 되지 않는건가?
// 아님 둘다 거의 같은 거임.

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

export const viewPost = async (req, res) => {
  const { id } = req.params;
  const post = await Music.findById(id);
  return res.json({ post });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  await Music.findByIdAndDelete(id);
  return res.end();
  // api 로 요청한 것들은 모두 proxy localhost:9000 으로 가기 때문에
  // localhost:9000 으로 redirect "/" 하고 있어서 에러가 발생하는 거 같은데? 아닐 수도 있음.
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  await Music.findByIdAndUpdate(id, {
    title,
    content,
  });

  return res.redirect("/");
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

  // req.session.loggedIn = true;
  // req.session.user = user;
  // 로그인 처리
  // 이 두 줄이 우리가 실제로 세션을 initialize(초기화) 하는 부분.
  // 세션에 정보를 추가하는 것임.
  // session 에 saveUninitialized: false 를 설정하면 세션을 수정할 때만
  // session을 db에 저장하고 쿠키를 넘겨줌.
  // req.session.loggedIn에 true 라는 값을 주었기 때문에 우리는 현재 이 두 줄로
  // 세션을 수정하고 있는 중.

  // return res.status(200).json({ message: "로그인 성공", user }).end();
  // json 으로 user 데이터 보내주기
};
export const getUpdateProfile = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  // console.log(user);
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
  // req.session.destroy(); // 로그 아웃.
  return res.status(200).end();
};

export const postUpdateProfileImage = async (req, res) => {
  const { file } = req;

  const {
    locals: {
      user: { user_id: _id },
    },
  } = res;
  await User.findByIdAndUpdate(_id, {
    profileImageUrl: file ? file.path : "default",
  });
  return res.json({ message: "프로필 이미지가 업데이트 되었습니다." });
};

export const postUpload = async (req, res) => {
  const { title, content } = req.body;
  const { music, thumbnail } = req.files;
  try {
    const newMusic = await Music.create({
      title,
      content,
      fileUrl: music[0].path,
      thumbUrl: thumbnail[0].path,
    });

    // const _id = req.body._id;
    // const board = await Board.find({writer: _id})
    // res.json({list: board});

    // const board = await Board.find({_id});
    // res.json({board});
    // 뭐 이런식으로 몽구스 조회해서 보내버리네잉.. json 형태로.
  } catch (error) {
    return res.status(400).redirect("/");
  }
  res.redirect("/");
};
