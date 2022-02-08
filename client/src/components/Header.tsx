import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../atoms";
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
    a:hover {
      display: block;
      background-color: gray;
      cursor: pointer;
    }
  }
`;

const Header = () => {
  const history = useHistory();
  const [user, setUser] = useRecoilState(userState);
  const [loggedIn, setLoggedIn] = useState(false);

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
          <a href="/" style={{ fontWeight: "bold" }}>
            <FontAwesomeIcon
              icon={faSoundcloud}
              color="white"
              fontSize="25px"
              style={{ marginRight: "10px" }}
            />
            SOUNDCLOUD
          </a>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>

        {loggedIn ? (
          <>
            <li>
              <Link to="/write">Write</Link>
            </li>
            <li>
              <Link to="/profile">
                {user?.username ? user?.username : "Profile"}
              </Link>
            </li>
            <li>
              <div style={{ cursor: "pointer" }} onClick={onClick}>
                Log Out
              </div>
            </li>
          </>
        ) : (
          <>
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
