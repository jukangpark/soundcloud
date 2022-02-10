import styled from "styled-components";

const MusicContainer = styled.div<{ isDark: boolean }>`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  background-color: ${(props) =>
    props.isDark ? props.theme.bgColor : "white"};
`;

export default MusicContainer;
