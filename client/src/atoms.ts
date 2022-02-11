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

export const isDarkState = atom({
  key: "isDark",
  default: true,
});

export const cookieState = atom({
  key: "cookie",
  default: false,
});
