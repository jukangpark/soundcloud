import styled from "styled-components";

const Wrapper = styled.div`
  @media ${(props) => props.theme.desktop} {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
`;

export default Wrapper;
