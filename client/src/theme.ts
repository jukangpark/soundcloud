import { DefaultTheme } from "styled-components";

const size = {
  mobile: 767,
  tablet: 1023,
};

export const darkTheme: DefaultTheme = {
  bgColor: "#222222",
  textColor: "white",
  accentColor: "#f50",
  btnColor: "#222222",
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(min-width: ${size.mobile + 1}px) and (max-width: ${size.tablet}px)`,
  desktop: `(min-width: ${size.tablet + 1}px)`,
};

export const lightTheme: DefaultTheme = {
  bgColor: "#white",
  textColor: "#222222",
  accentColor: "#f50",
  btnColor: "white",
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(min-width: ${size.mobile + 1}px) and (max-width: ${size.tablet}px)`,
  desktop: `(min-width: ${size.tablet + 1}px)`,
};
