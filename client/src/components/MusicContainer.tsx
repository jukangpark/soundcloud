import styled from "styled-components";
import { Link } from "react-router-dom";
import { IMusic } from "../interface";
import { Music } from "../components/Music";
import ProfileWrapper from "./ProfileWrapper";

const Container = styled.div<{ isDark: boolean }>`
  margin-top: 50px;
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
  li {
    margin-bottom: 40px;
  }
  li > a > h1 {
    font-size: 18px;
  }
`;

interface IProps {
  isDark: boolean;
  data: IMusic[] | undefined;
}

const MusicContainer = ({ isDark, data }: IProps) => {
  return (
    <Container isDark={isDark}>
      {data?.map((music, index) => (
        <li key={index}>
          <Link to={`${music._id}`}>
            <h1>{music.title}</h1>
            <Music
              style={{
                backgroundImage: `url(/${music.thumbUrl})`,
                position: "relative",
              }}
            />
          </Link>
          <Link to={`/profile/${music.owner._id}`}>
            <ProfileWrapper>
              <div
                style={{
                  backgroundImage: `url(/${music.owner.profileImageUrl})`,
                }}
              ></div>
              <span>{music.owner.username}</span>
              <span>{`Played:  ${music.meta.views}`}</span>
            </ProfileWrapper>
          </Link>
        </li>
      ))}
    </Container>
  );
};

export default MusicContainer;
