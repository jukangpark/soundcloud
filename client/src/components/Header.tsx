import styled from "styled-components";
import { Link } from "react-router-dom";

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
          <Link to="/write">Write</Link>
        </li>
        <li>
          <Link to="/join">Join</Link>
        </li>
        <li>Login</li>
      </MenuContainer>
    </header>
  );
};

export default Header;
