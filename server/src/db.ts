import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/");

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error: any) => console.log("DB Error", error);

console.log(process.env);

db.on("error", handleError);
db.once("open", handleOpen);
