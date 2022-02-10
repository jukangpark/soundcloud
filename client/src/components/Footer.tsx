import styled from "styled-components";

const FooterComponent = styled.footer`
  height: 170px;
`;

const Ul = styled.ul`
  display: flex;
  font-size: 14px;

  li {
    color: #666666;
    cursor: pointer;
    margin-right: 10px;
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
