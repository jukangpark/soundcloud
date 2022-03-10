import { Banner } from "./Banner";
import Header from "./Header";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory, useParams } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { cookieState } from "../atoms";
import AudioPlayer from "react-h5-audio-player";
import { useEffect } from "react";
import { IMusic } from "../interface";

interface IProps {
  thumbUrl: any;
  // 여기 타입 지정하는거 개선하기. 타입스크립트 공부.
}

interface IParams {
  id: string;
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
  a:hover {
    color: #f50;
    transition-duration: 400ms;
  }
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

  a {
    display: block;
    color: white;
  }
  &:hover {
    background-color: #f50;
  }
  &:nth-child(2) {
    right: 90px;
  }
`;

export interface IMusicProps {
  music?: IMusic;
}

const MusicPlayerContainer = ({ music }: IMusicProps) => {
  const { id } = useParams<IParams>();
  let history = useHistory();

  const handleClick = () => {
    fetch(`/api/delete/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        if (data.message === "음악 삭제 완료") {
          history.push("/");
        }
      });
  };

  const hasCookie = useRecoilValue(cookieState);
  return (
    <BlurWrapper thumbUrl={music?.thumbUrl}>
      <div style={{ width: "870px", height: "100%" }}>
        <MusicTextWrapper>
          <MusicTitle>
            <span>{music?.title}</span>
          </MusicTitle>
          <MusicCreator>
            <span>{music?.owner?.username}</span>
          </MusicCreator>
        </MusicTextWrapper>
        <div>
          <AudioPlayer
            autoPlay={false}
            src={`${music?.fileUrl}`}
            onPlay={(e) => fetch(`/api/musics/${id}/play`, { method: "POST" })}
          />
        </div>
      </div>
      <ThumbNail
        style={{
          backgroundImage: `url(${music?.thumbUrl})`,
        }}
      >
        <Link
          to="#"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "20px",
          }}
        >
          <FontAwesomeIcon icon={faHeart} />
        </Link>

        {hasCookie ? (
          <Btn>
            <Link to={`/${id}/update`} style={{ color: "white" }}>
              Update
            </Link>
          </Btn>
        ) : null}
        {hasCookie ? <Btn onClick={handleClick}>Delete</Btn> : null}
      </ThumbNail>
    </BlurWrapper>
  );
};

export default MusicPlayerContainer;
