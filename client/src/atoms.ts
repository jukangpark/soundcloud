import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    email: "",
    location: "",
    password: "",
    username: "",
  }, // does not exist on type `{}`
});
