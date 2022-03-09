import styled from "styled-components";

const FooterComponent = styled.footer`
  padding-top: 100px;
  height: 170px;
`;

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(13, minmax(0, 1fr));
  font-size: 14px;

  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  li {
    color: #666666;
    cursor: pointer;
    text-align: center;
  }
  li:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

const Footer = () => {
  return (
    <FooterComponent>
      <hr style={{ border: "0.5px solid gray" }}></hr>
      <Ul>
        <li>Directory</li>
        <li>About us</li>
        <li>Creator Resources</li>
        <li>Blog</li>
        <li>Jobs</li>
        <li>Developers</li>
        <li>Help</li>
        <li>Legal</li>
        <li>Privacy</li>
        <li>Cookie Policy</li>
        <li>Cookie Manager</li>
        <li>Imprint</li>
        <li>Charts</li>
      </Ul>
    </FooterComponent>
  );
};

export default Footer;
