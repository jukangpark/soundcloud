import mongoose from "mongoose";

mongoose.connect(`${process.env.DB_URL}`);
// heroku에 DB_URL 은 따로 정의 되어 있다.
// 따라서 local DB는 루트 디렉토리의 .env 에 숨겨주고
// 웹에서 실행했을 경우 heroku config vars를 참조하도록 만든다.

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
