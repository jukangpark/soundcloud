console.log(process.env.DB_URL); //undefined
import dotenv from "dotenv";
import path from "path";
// import session from "express-session";
// import MongoStore from "connect-mongo";

const isHeroku = process.env.NODE_ENV === "production";
// 이 NODE_ENV 는 heroku에 정의되어 있다.

(() => {
  if (isHeroku) return; // 해로쿠 환경에서는 이 즉시 실행함수가 실행되지 않도록 막는다.
  const result = dotenv.config({ path: path.join(__dirname, "..", ".env") });
  // .env 파일의 경로를 dotenv.config 에 넘겨주고 성공여부를 저장함.
  if (result.parsed == undefined)
    // .env 파일 parsing 성공 여부 확인
    throw new Error("Cannot loaded environment variables file."); // parsing 실패시 Throwing
})();

import "./db";
import express from "express";
import morgan from "morgan";
import apiRouter from "./routers/apiRouter"; // typescript에서 dotenv import 할 때 이런식으로 작성.
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.static("build")); // 이렇게 작성해주면 정상적으로 build 폴더 안에 있는 파일들을 서버에서 가져올 수 있습니다.
app.use("/uploads", express.static("uploads"));
// static () 에는 너가 노출시키고 싶은 폴더의 이름을 적으면 돼.

const logger = morgan("dev");

app.use(cookieParser());

app.use(logger);

app.use(express.json()); // body-parser 는 내장되어 있기 때문에, json 파싱하기 위해 설정 추가.

// app.use(
//   session({
//     secret: "hello", // 환경 변수를 사용하여 암호를 저장하고 암호 자체가 저장소에 저장되지 않도록 해야함.
//     resave: false, // 수정되지 않은 경우 세션을 저장하지 않음.
//     saveUninitialized: false, // 무언가가 저장될 때까지 세션을 생성하지 않음.
//     store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
//     // The session store instance, defaults to a new MemoryStore instance.
//     // express가 세션을 메모리에 저장하기 때문에 서버를 재 시작할 때마다 세션이 사라지는 것임.
//     // 그래서 백엔드가 잊지 않도록 mongoDB와 연결해야함.
//   })
// );

// app.use((req, res, next) => {
//   console.log(req.headers); // cookie 를 보면 쿠키의 이름이 나와있음.
//   next();
// });

// express 에는 json 데이터를 파싱하는 모듈이 저장되어 있다.
// 하지만 json만 되고 x-www-form-urlencoded 를 파싱하기위해 이런식으로 확장해야함.
app.use(express.urlencoded({ extended: true }));

// app.get("/")

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  if (isHeroku) {
    res.sendFile(__dirname + "/build/index.html");
  } else {
    res.sendFile(process.cwd() + "/dist/build/index.html");
  }
});

// app.get("*") 을 app.use("/api") 이런 것들 보다 더 위에 올려버리면
// res.sendFile() 에 의해서 html 파일이 return 되기 때문에 json 파싱 에러가 발생합니다.

app.listen(PORT, () => {
  console.log("hello world!");
});
