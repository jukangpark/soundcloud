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
        <li>Search</li>
        <li>
          <Link to="/write">Write</Link>
        </li>
        <li>Join</li>
        <li>Login</li>
      </MenuContainer>
    </header>
  );
};

export default Header;
