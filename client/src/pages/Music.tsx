import { url } from "inspector";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../atoms";
import {
  Banner,
  Description,
  TitleBox,
  TitleContainer,
} from "../components/Banner";
import Header from "../components/Header";
import Title from "../components/MainTitle";
import Wrapper from "../components/Wrapper";
import { IMusic } from "./Home";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import "./audioPlayer.scss";

interface IProps {
  thumbUrl: any;
  // 여기 타입 지정하는거 개선하기. 타입스크립트 공부.
}

const BlurWrapper = styled.div<IProps>`
  display: flex;
  padding-top: 50px;
  box-sizing: border-box;
  height: 450px;
  position: relative;
  overflow: hidden;
  align-items: center;
  &::before {
    background-color: black;
    opacity: 80%;
    content: "";
    height: 50px;
    width: 100%;
    position: absolute;
    top: 0;
  }
  &::after {
    background-image: url(${(props) => props.thumbUrl});
    background-size: cover;
    background-position: right;
    position: absolute;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(20px);
    z-index: -1;
    content: "";
  }
`;

const MusicTextWrapper = styled.div`
  height: 70%;
  padding-top: 30px;
  padding-left: 30px;
  box-sizing: border-box;
`;

const MusicTitle = styled.h1`
  top: 50%;
  margin-bottom: 15px;

  span {
    font-size: 24px;
    background-color: #222222;
    padding: 5px;
    color: white;
  }
`;

const MusicCreator = styled.p`
  margin-top: 17px;
  span {
    background-color: #222222;
    padding: 4px;
    color: white;
  }
`;

const ThumbNail = styled.div`
  width: 340px;
  height: 340px;
  background-position: center;
  background-size: cover;
  margin-right: 30px;
  background-repeat: none;
  position: relative;
`;

const Btn = styled.div`
  cursor: pointer;
  background-color: #222222;
  color: white;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  display: inline-block;
  margin-right: 10px;
  position: absolute;
  bottom: 10px;
  right: 0;
  transition-duration: 400ms;
  border-radius: 5px;
  &:hover {
    background-color: #f50;
  }
  &:nth-child(1) {
    right: 90px;
  }
`;

const MusicButton = styled(Btn)`
  position: static;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.btnColor};
  font-size: 16px;
  line-height: 18px;
  padding: 10px 15px;
  height: 40px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  margin-left: 15px;
  &:hover {
    color: white;
  }
`;

export interface IParams {
  id: string;
}

const Music = () => {
  const { id } = useParams<IParams>();
  const [music, setMusic] = useState<IMusic>();
  const user = useRecoilValue(userState);

  let history = useHistory();

  const handleClick = () => {
    fetch(`/api/delete/${id}`, {
      method: "POST",
    });
    history.push("/");
  };

  console.log(id);
  useEffect(() => {
    fetch(`/api/view/${id}`)
      .then((response) => response.json())
      .then((data) => setMusic(data.post));
  }, []);
  return (
    <Wrapper>
      <Banner style={{ backgroundImage: "none" }}>
        <Header />
        <BlurWrapper thumbUrl={music?.thumbUrl}>
          <div style={{ width: "870px", height: "100%" }}>
            <MusicTextWrapper>
              <MusicTitle>
                <span>{music?.title}</span>
              </MusicTitle>
              <MusicCreator>
                <span>작성한 사람 이름</span>
              </MusicCreator>
            </MusicTextWrapper>
            <div>
              <AudioPlayer
                autoPlay={true}
                src={`${music?.fileUrl}`}
                onPlay={(e) => console.log("onPlay")}
              />
            </div>
          </div>
          <ThumbNail style={{ backgroundImage: `url(${music?.thumbUrl})` }}>
            <Btn>
              <Link to={`/${id}/update`}>Update</Link>
            </Btn>

            <Btn onClick={handleClick}>Delete</Btn>
          </ThumbNail>
        </BlurWrapper>
      </Banner>
      <form>
        <input placeholder="Write a comment"></input>
      </form>
      <MusicButton>Like</MusicButton>
      <MusicButton>Repost</MusicButton>
      <MusicButton>Share</MusicButton>
      <div>
        <h1>댓글</h1>
        <p>댓글1</p>
        <p>댓글2</p>
        <p>댓글3</p>
      </div>
    </Wrapper>
  );
};

export default Music;

// redirect 되게 하는 법.
