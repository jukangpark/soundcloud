import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkState, userState } from "../atoms";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSoundcloud } from "@fortawesome/free-brands-svg-icons";
import ThemeBtn from "./ThemeBtn";

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

const Header = () => {
  const history = useHistory();
  const [user, setUser] = useRecoilState(userState);
  const [loggedIn, setLoggedIn] = useState(false);
  const isDark = useRecoilValue(isDarkState);

  useEffect(() => {
    fetch("/api/user/info")
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn(data.loggedIn);
        setUser(data.user);
      });
  }, []);

  const onClick = () => {
    fetch("/api/user/logout");
    setUser({ email: "", location: "", password: "", username: "" });
    setLoggedIn(false);
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

        {loggedIn ? (
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
