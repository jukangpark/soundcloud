import styled from "styled-components";

const MusicContainer = styled.div<{ isDark: boolean }>`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  background-color: ${(props) =>
    props.isDark ? props.theme.bgColor : "white"};

  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }
`;

export default MusicContainer;
