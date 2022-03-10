import { atom } from "recoil";

export const isDarkState = atom({
  key: "isDark",
  default: true,
});

export const cookieState = atom({
  key: "cookie",
  default: false,
});
