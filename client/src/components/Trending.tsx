import styled from "styled-components";

export const Trending = styled.div<{ isDark: boolean }>`
  font-size: 24px;
  text-align: center;
  padding-top: 20px;
  margin-bottom: 30px;
  margin-top: 60px;
  background-color: ${(props) =>
    props.isDark ? props.theme.bgColor : "white"};
`;
