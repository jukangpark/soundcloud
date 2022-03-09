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
import Wrapper from "../components/Wrapper";
import ProfileWrapper from "../components/ProfileWrapper";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import Input from "../components/Input";
import Form from "../components/Form";
import { useForm } from "react-hook-form";
import { IOwner } from "../interface";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { fetchComments, fetchMusic } from "../api";

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
  const [commentState, setComment] = useState<IComment[]>();
  const hasCookie = useRecoilValue(cookieState);

  const { isLoading: commentsLoading, data: comments } = useQuery<IComment[]>(
    "comments",
    () => fetchComments(id)
  );
  // db 에서 전체 comments 가져오는 쿼리
  // 리액트 쿼리는 response 를 caching 한다.
  // React query 는 우리가 원하는 데이터가 이미 캐시에 있다는 걸 알고 있다.
  // 따라서 API 에 접근하지 않고 data 를 가져옴.
  // deleteComment 를 하면 자동으로 useQuery 가 호출되서 comments 안의 데이터가 바뀐다.
  // 이유는?

  useEffect(() => {
    setComment(comments);
  }, [comments]);

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
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  // setComment(comments); 를 했을 경우.
  // erros: too many re-renders.
  // 리액트의 렌더링 조건
  // 1. state 변경이 되었을 때
  // 2. 부모 컴포넌트가 렌더링 될 때
  // 3. 새로운 props 가 들어올 때
  // 4. shouldComponentUpdate 에서 true 가 반환될 때
  // 5. forceUpdate 가 실행될 때

  // 리액트의 useState 렌더링은 비동기로 이루어진다.
  // 때문에 개발자의 예측대로 렌더링이 되지 않고 꼬여버린다.

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
      .then((data) => setComment(data));
  };

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
        // if (data.message === "업데이트 완료") {
        //   history.push("/");
        // }
      });
  };

  const { isLoading, data } = useQuery("music", () => fetchMusic(id));

  return (
    <Wrapper>
      <Banner style={{ backgroundImage: "none" }}>
        <Header />
        <BlurWrapper thumbUrl={isLoading ? "undefined" : data?.music?.thumbUrl}>
          <div style={{ width: "870px", height: "100%" }}>
            <MusicTextWrapper>
              <MusicTitle>
                <span>{data?.music?.title}</span>
              </MusicTitle>
              <MusicCreator>
                <span>{data?.music?.owner.username}</span>
              </MusicCreator>
            </MusicTextWrapper>
            <div>
              <AudioPlayer
                autoPlay={false}
                src={`${data?.music?.fileUrl}`}
                onPlay={(e) =>
                  fetch(`/api/musics/${id}/play`, { method: "POST" })
                }
              />
            </div>
          </div>
          <ThumbNail
            style={{
              backgroundImage: `url(${
                isLoading ? "undefined" : data?.music.thumbUrl
              })`,
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
        <h1 style={{ textAlign: "center", margin: "50px", fontSize: "20px" }}>
          If you want to leave comments, please
          <Link
            to="/login"
            style={{
              textDecoration: "underline",
              marginLeft: "10px",
              marginTop: "100px",
            }}
          >
            Sign In
          </Link>
        </h1>
      )}

      <ul>
        {commentsLoading
          ? "Loading ..."
          : commentState?.map((comment, index) => (
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
                  {hasCookie ? (
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
                  ) : null}
                </ProfileWrapper>
              </Comment>
            ))}
      </ul>
    </Wrapper>
  );
};

export default Music;

// redirect 되게 하는 법.
// deploy
