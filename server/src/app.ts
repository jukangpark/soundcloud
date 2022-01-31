import "dotenv/config";
import "./db";
import express from "express";
import morgan from "morgan";
import Post from "./models/POST";
import apiRouter from "./ routers/apiRouter";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("build"));

const logger = morgan("dev");

app.use(logger);

// body-parser 는 내장되어 있기 때문에, json 파싱하기 위해 설정 추가.
app.use(express.json());

// express 에는 json 데이터를 파싱하는 모듈이 저장되어 있다.
// 하지만 json만 되고 x-www-form-urlencoded 를 파싱하기위해 이런식으로 확장해야함.
app.use(express.urlencoded({ extended: true }));

// app.get("/")

app.use("/api", apiRouter);

app.post("/write", async (req, res) => {
  const { title, content } = req.body;
  console.log(title, content);
  try {
    const newPost = await Post.create({
      title,
      content,
    });
    await newPost.save();
  } catch (error) {
    return res.status(400).redirect("/");
  }
  res.redirect("/");
});

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

// 이거 때문에 json이 가는게 아니라 중간에 막히는거 같은데?
// 위에 작성한 api 와 write 와 관련된 것들은
// 요청이 들어올 때 검사한다음
// 다른 것들 모두 리액트로 화면 보여주게 만드는거임..

// app.get("*") 을 app.use("/api") 이런 것들 보다 더 위에 올려버리면
// res.sendFile() 에 의해서 html 파일이 return 되기 때문에
// json.파싱 에러가 발생해요. 이멍청아.

app.listen(PORT, () => {
  console.log("hello world!");
});
