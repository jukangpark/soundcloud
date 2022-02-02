import mongoose from "mongoose";
require("dotenv").config();

mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/boardApp");

// precess.env.DB_URL 사용해서 mongoDB atlas 와 어케 연결해줘야하지?

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error: any) => console.log("DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
