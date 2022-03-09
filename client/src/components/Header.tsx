import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cookieState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSoundcloud } from "@fortawesome/free-brands-svg-icons";
import ThemeBtn from "./ThemeBtn";
import { useCookies } from "react-cookie";

const MenuContainer = styled.ul`
  display: flex;
  li {
    font-size: 14px;
    width: 25%;
    text-align: center;
    line-height: 50px;
    a {
      display: block;
      height: 50px;
      white-space: nowrap;
      span {
        @media ${(props) => props.theme.mobile} {
          display: none;
        }
      }
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
  const [hasCookie, setHasCookie] = useRecoilState(cookieState);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

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
            <span>SOUNDCLOUD</span>
          </Link>
        </li>

        {hasCookie ? (
          <>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="/myprofile">MyProfile</Link>
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
