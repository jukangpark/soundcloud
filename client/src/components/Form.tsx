import styled from "styled-components";

const Form = styled.form`
  display: block;
  width: 420px;
  margin: 50px auto;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

export default Form;
