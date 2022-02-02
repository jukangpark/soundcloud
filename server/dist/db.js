"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(`${process.env.DB_URL}`);
// heroku에 DB_URL 은 따로 정의 되어 있다.
// 따라서 local DB는 루트 디렉토리의 .env 에 숨겨주고
// 웹에서 실행했을 경우 heroku config vars를 참조하도록 만든다.
const db = mongoose_1.default.connection;
const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);
db.on("error", handleError);
db.once("open", handleOpen);
