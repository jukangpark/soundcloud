import styled from "styled-components";

export const Music = styled.div`
  background-position: center;
  background-size: cover;
  a:hover {
    color: #f50;
    transition-duration: 400ms;
  }
  @media ${(props) => props.theme.desktop} {
    width: 180px;
    height: 180px;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    height: 180px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 200px;
  }
`;
