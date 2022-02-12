import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  profileImageUrl: String,
  username: { type: String, required: true, unique: true },
  password: { type: String },
  location: String,
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
}); // 해시함수 를 통해 비밀 번호 암호화

const User = mongoose.model("User", userSchema);

export default User;
