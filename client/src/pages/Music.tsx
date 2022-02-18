import { url } from "inspector";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { cookieState, userState } from "../atoms";
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
// import "./audioPlayer.scss";
import Input from "../components/Input";
import { Form } from "./Upload";
import { useForm } from "react-hook-form";
import { IOwner } from "./Home";
// import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// library.add(fas);

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
  const hasCookie = useRecoilValue(cookieState);

  const deleteComment = async (event: React.MouseEvent<HTMLElement>) => {
    const { commentid, ownerid } = event.currentTarget.dataset;
    const data = await fetch(`/api/${id}/comment/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentid,
        ownerid,
      }),
    });

    const { message } = await data.json();
    alert(message);

    await fetch(`/api/musics/${id}/comment`)
      .then((res) => res.json())
      .then((data) => setComments(data));
    // 여기 부분 로직 수정할 필요 있음 너무 느림..
    // comment._id 와 owner._id 와 music._id 가 있으니까
    // comment 삭제 하고 owner 안에 있는 comments 배열 안에 있는 comment 찾아서 삭제.
    // music 안에 comments 배열 안에 있는 comment 삭제.
  };

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
    // 여기 부분 로직 수정할 필요 있음 너무 느림..
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

            <Btn>
              <Link to={`/${id}/update`} style={{ color: "white" }}>
                Update
              </Link>
            </Btn>

            <Btn onClick={handleClick}>Delete</Btn>
          </ThumbNail>
        </BlurWrapper>
      </Banner>
      {hasCookie ? (
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("comment", { required: "댓글을 작성해주세요" })}
            placeholder="Write a comment"
          ></Input>
          <span>{errors.comment?.message}</span>
        </Form>
      ) : (
        <h1
          style={{ textAlign: "center", marginTop: "20px", fontSize: "20px" }}
        >
          If you want to leave comments, please
          <Link
            to="/login"
            style={{ textDecoration: "underline", marginLeft: "10px" }}
          >
            Sign In
          </Link>
        </h1>
      )}

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
              <span
                data-commentid={comment._id}
                data-ownerid={comment.owner._id}
                onClick={deleteComment}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ marginLeft: "10px" }}
                />
              </span>
            </ProfileWrapper>
          </Comment>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Music;

// redirect 되게 하는 법.
