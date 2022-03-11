import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { cookieState } from "../atoms";
import Wrapper from "../components/Wrapper";
import ProfileWrapper from "../components/ProfileWrapper";
import "react-h5-audio-player/src/styles.scss";
import Input from "../components/Input";
import Form from "../components/Form";
import { useForm } from "react-hook-form";
import { IOwner } from "../interface";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { fetchComments, fetchMusic } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Banner } from "../components/Banner";
import Header from "../components/Header";
import { IMusic } from "../interface";
import MusicPlayerContainer, {
  IMusicProps,
} from "../components/MusicPlayerContainer";

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

// const Comment = styled.li`
//   line-height: 14px;
//   font-size: 14px;
//   width: 420px;
//   margin: 0 auto;
// `;

const Comment = styled.li`
  line-height: 14px;
  font-size: 14px;
  width: 420px;
  margin: 0 auto;
`;

const Music = () => {
  const { id } = useParams<IParams>();
  const [isMusicLoading, setMusicLoading] = useState(true);
  const [isCommentsLoading, setCommentsLoading] = useState(true);
  const [commentState, setComment] = useState<IComment[]>();
  const [music, setMusic] = useState<IMusic>();
  const hasCookie = useRecoilValue(cookieState);

  // const { isLoading: commentsLoading, data: comments } = useQuery<IComment[]>(
  //   "comments",
  //   () => fetchComments(id)
  // );

  useEffect(() => {
    fetch(`/api/musics/${id}/comment`)
      .then((res) => res.json())
      .then((data) => {
        setComment(data);
        setCommentsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/musics/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMusic(data);
        setMusicLoading(false);
      });
  }, []);

  const isLoading = isMusicLoading || isCommentsLoading;

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
    fetch(`/api/musics/${id}/comment`)
      .then((res) => res.json())
      .then((data) => setComment(data));
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
      .then((data) => setComment(data));
  };

  return (
    <Wrapper>
      <HelmetProvider>
        <Helmet>
          <title>{music?.title}</title>
        </Helmet>
      </HelmetProvider>
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <Banner style={{ backgroundImage: "none" }}>
            <Header />
            <MusicPlayerContainer music={music} />
          </Banner>

          {hasCookie ? (
            <Form onSubmit={handleSubmit(onValid)}>
              <Input
                {...register("comment", { required: "댓글을 작성해주세요" })}
                placeholder="Write a comment"
              />
              <span>{errors.comment?.message}</span>
            </Form>
          ) : (
            <h1
              style={{ textAlign: "center", margin: "50px", fontSize: "20px" }}
            >
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
            {isLoading
              ? "Loading ..."
              : commentState?.map((comment, index) => (
                  <Comment key={index}>
                    <ProfileWrapper
                      style={{
                        padding: "20px",
                        borderBottom: "1px solid gray",
                      }}
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
                      <span
                        style={{ color: "gray" }}
                      >{`${comment.createdAt.slice(11, 16)}`}</span>
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
        </>
      )}
    </Wrapper>
  );
};

export default Music;

// redirect 되게 하는 법.
// deploy
