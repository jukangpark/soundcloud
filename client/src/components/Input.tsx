import styled from "styled-components";

const Input = styled.input`
  margin-top: 20px;
  height: 40px;
  padding: 0px;
  padding-left: 10px;
  box-sizing: border-box;
  display: block;
  border: none;
  outline: none;
  border: 0.5px solid #999999;
  @media ${(props) => props.theme.desktop} {
    width: 420px;
    height: 40px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

export default Input;
