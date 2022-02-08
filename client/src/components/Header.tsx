import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../atoms";
import { useEffect, useState } from "react";

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
    <header>
      <MenuContainer>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>

        <li>
          <Link to="/join">Join</Link>
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
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </MenuContainer>
    </header>
  );
};

export default Header;
