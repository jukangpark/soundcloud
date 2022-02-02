"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log(process.env.DB_URL); //undefined
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const isHeroku = process.env.NODE_ENV === "production";
// 이 NODE_ENV 는 heroku에 정의되어 있다.
(() => {
    if (isHeroku)
        return;
    const result = dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });
    // .env 파일의 경로를 dotenv.config 에 넘겨주고 성공여부를 저장함.
    if (result.parsed == undefined)
        // .env 파일 parsing 성공 여부 확인
        throw new Error("Cannot loaded envrionment variables file."); // parsing 실패시 Throwing
})();
// 여기 있는 즉시 실행 함수를 실행하게 되면
// process.env.PORT 를 heroku 앱으로 접속했을 때
// 에러가 나기 때문에
// 해로쿠 환경에서는 이 즉시 실행함수가 실행되지 않도록 막는다.
console.log(process.env.DB_URL); // mongodb://127.0.0.1:27017/boardApp
require("./db");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const POST_1 = __importDefault(require("./models/POST"));
const apiRouter_1 = __importDefault(require("./ routers/apiRouter")); // typescript에서 dotenv import 할 때 이런식으로 작성.
const app = (0, express_1.default)();
const PORT = process.env.PORT || 9000;
app.use(express_1.default.static("build"));
// 이렇게 작성해주면 정상적으로 build 폴더 안에 있는 파일들을 서버에서 가져올 수 있습니다.
const logger = (0, morgan_1.default)("dev");
app.use(logger);
// body-parser 는 내장되어 있기 때문에, json 파싱하기 위해 설정 추가.
app.use(express_1.default.json());
// express 에는 json 데이터를 파싱하는 모듈이 저장되어 있다.
// 하지만 json만 되고 x-www-form-urlencoded 를 파싱하기위해 이런식으로 확장해야함.
app.use(express_1.default.urlencoded({ extended: true }));
// app.get("/")
app.use("/api", apiRouter_1.default);
app.post("/api/write", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    console.log(title, content);
    try {
        const newPost = yield POST_1.default.create({
            title,
            content,
        });
        // const _id = req.body._id;
        // const board = await Board.find({writer: _id})
        // res.json({list: board});
        // const board = await Board.find({_id});
        // res.json({board});
        // 뭐 이런식으로 몽구스 조회해서 보내버리네잉.. json 형태로.
    }
    catch (error) {
        return res.status(400).redirect("/");
    }
    res.redirect("/");
}));
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/build/index.html");
// });
// 리액트 라우팅으로 /list 페이지를 개발해놨는데
// 실제 localhost:8080/list 로 접속하면 아무것도 뜨지 않아요.
// 왜냐하면 브라우저 URL 창에서 때려박는건 서버에서 요청하는 거지.
// 리액트 라우터에게 라우팅 요청하는게 아니기 때문입니다.
// 따라서 이걸 리액트가 라우팅 전권을 넘기고 싶다면
// server.js 에 다음과 같은 코드를 추가해야함.
app.get("*", (req, res) => {
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
