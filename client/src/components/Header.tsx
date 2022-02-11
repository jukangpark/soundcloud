import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cookieState, isDarkState, userState } from "../atoms";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSoundcloud } from "@fortawesome/free-brands-svg-icons";
import ThemeBtn from "./ThemeBtn";
import { useQuery } from "react-query";
import { fetchLoggedinUser } from "../api";
import { useCookies } from "react-cookie";

const MenuContainer = styled.ul`
  display: flex;
  li {
    font-size: 14px;
    width: 25%;
    line-height: 50px;
    text-align: center;
    a {
      display: block;
      height: 50px;
      line-height: 50px;
    }
    a:hover {
      background-color: ${(props) => props.theme.accentColor};
      cursor: pointer;
      transition-duration: 400ms;
    }
  }
`;

interface IData {
  user: object;
  loggedIn: boolean;
}

interface IUser {
  email: string;
  location: string;
  password: string;
  username: string;
  _id: string;
}

const Header = () => {
  const history = useHistory();
  const isDark = useRecoilValue(isDarkState);
  const [hasCookie, setHasCookie] = useRecoilState(cookieState);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  // useEffect(() => {
  //   fetch("/api/user/info")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLoggedIn(data.loggedIn);
  //       setUser(data.user);
  //     });
  // }, []);

  // const { isLoading, data } = useQuery<IData>("user", () =>
  //   fetchLoggedinUser()
  // );

  // setUser(data.user)  이거 하면 undefined 일 수도 있다고 뜸.

  const onClick = () => {
    removeCookie("user");
    setHasCookie(false);
    history.push("/");
  };

  return (
    <header
      style={{
        color: "white",
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: "99999",
      }}
    >
      <MenuContainer>
        <li>
          <Link
            to="/"
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
              letterSpacing: "1px",
            }}
          >
            <FontAwesomeIcon
              icon={faSoundcloud}
              color="white"
              fontSize="40px"
              style={{ marginRight: "10px" }}
            />
            SOUNDCLOUD
          </Link>
        </li>

        {hasCookie ? (
          <>
            <li>
              <Link to="/write">Upload</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <div style={{ cursor: "pointer" }} onClick={onClick}>
                Log Out
              </div>
            </li>
          </>
        ) : (
          <>
            <li></li>
            <li>
              <Link to="/join">Create account</Link>
            </li>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
          </>
        )}
        <ThemeBtn />
      </MenuContainer>
    </header>
  );
};

export default Header;
