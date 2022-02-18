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
import { IMusic, ProfileWrapper } from "./Home";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import "./audioPlayer.scss";
import Input from "../components/Input";
import { Form } from "./Upload";
import { useForm } from "react-hook-form";
import { IOwner } from "./Home";

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

  a {
    display: block;
  }
  &:hover {
    background-color: #f50;
  }
  &:nth-child(1) {
    right: 90px;
  }
`;

const LikeBtn = styled(Btn)`
  position: static;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  &:hover {
    color: white;
  }
`;

export interface IParams {
  id: string;
}

export interface IFormData {
  comment: string;
}

interface IComment {
  _id: string;
  text: string;
  owner: IOwner;
  music: string;
  createdAt: string;
}

// interface ICommentState {
//   [key: string]: IComment[];
// }

const Comment = styled.li`
  line-height: 14px;
  font-size: 14px;
  width: 420px;
  margin: 0 auto;
`;

const Music = () => {
  const { id } = useParams<IParams>();
  const [music, setMusic] = useState<IMusic>();
  const user = useRecoilValue(userState);
  const [comments, setComments] = useState<IComment[]>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  const onValid = async ({ comment }: IFormData) => {
    setValue("comment", "");
    await fetch(`/api/musics/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });

    await fetch(`/api/musics/${id}/comment`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  let history = useHistory();

  const handleClick = () => {
    fetch(`/api/delete/${id}`, {
      method: "POST",
    });
    history.push("/");
  };

  useEffect(() => {
    fetch(`/api/musics/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMusic(data.music);
      });

    fetch(`/api/musics/${id}/comment`)
      .then((res) => res.json())
      .then((data) => setComments(data));
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
                <span>{music?.owner.username}</span>
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
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("comment", { required: "댓글을 작성해주세요" })}
          placeholder="Write a comment"
        ></Input>
        <span>{errors.comment?.message}</span>
      </Form>
      <LikeBtn>Like</LikeBtn>
      <ul>
        {comments?.map((comment, index) => (
          <Comment key={index}>
            <ProfileWrapper
              style={{ padding: "20px", borderBottom: "1px solid gray" }}
            >
              <Link
                to={`/profile/${comment.owner._id}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  style={{
                    backgroundImage: `url(${comment.owner.profileImageUrl})`,
                    display: "inline-block",
                  }}
                ></div>
                <span style={{ marginRight: "20px" }}>
                  {comment.owner.username}
                </span>
              </Link>
              <span>{comment.text}</span>
              <span style={{ color: "gray" }}>{`${comment.createdAt.slice(
                11,
                16
              )}`}</span>
            </ProfileWrapper>
          </Comment>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Music;

// redirect 되게 하는 법.