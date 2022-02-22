import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchLoggedinUser } from "../api";
import { isDarkState, userState } from "../atoms";
import {
  Banner,
  Description,
  TitleBox,
  TitleContainer,
} from "../components/Banner";
import Header from "../components/Header";
import Title from "../components/MainTitle";
import MainTitle from "../components/MainTitle";
import MusicContainer from "../components/MusicContainer";
import { Btn } from "../components/Btn";
import Wrapper from "../components/Wrapper";
import { IMusic } from "./Home";
import { Form } from "./Upload";
import { Music } from "../components/Music";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface IUser {
  username: string;
  _id: string;
  profileImageUrl: string;
  musics: Array<IMusic>;
}

const MyProfile = () => {
  // const user = useRecoilValue(userState);

  const isDark = useRecoilValue(isDarkState);
  const [list, setList] = useState<IMusic[]>();

  const { isLoading, data: user } = useQuery<IUser>("loggedInUser", () =>
    fetchLoggedinUser()
  );

  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = async (data: any) => {
    const formData = new FormData();
    formData.append("profileImage", data.profileImage[0]);

    const res = await fetch(
      `/api/profile/${user?._id}/postUpdateProfileImage`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());
    alert(res.message);
  };

  return (
    <Wrapper>
      <Banner>
        <Header />
        <TitleContainer>
          <TitleBox>
            <div
              style={{
                borderRadius: "90%",
                backgroundColor: "white",
                height: "150px",
                width: "150px",
                marginBottom: "20px",
                position: "relative",
                backgroundImage: `url(${user?.profileImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Form
                onChange={handleSubmit(onValid)}
                style={{
                  display: "block",
                  width: "150px",
                  height: "150px",
                  marginTop: 0,
                  position: "absolute",
                  top: 0,
                }}
              >
                <label
                  htmlFor="profileImage"
                  style={{
                    display: "block",
                    height: "100%",
                    cursor: "pointer",
                  }}
                ></label>
                <input
                  {...register("profileImage", {
                    required: "이미지 파일이 존재하지 않습니다.",
                  })}
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                ></input>
              </Form>
            </div>
            <Description>{`${user?.username}`}</Description>
          </TitleBox>
        </TitleContainer>
      </Banner>
      <h1>{`내가 올린 음악들`}</h1>
      <MusicContainer style={{ marginTop: "50px" }} isDark={isDark}>
        {user?.musics?.map((music, index) => (
          <li key={index} style={{ marginBottom: "40px" }}>
            <Link to={`/${music._id}`}>
              <h1 style={{ fontSize: "18px" }}>{music.title}</h1>
              <Music
                style={{
                  backgroundImage: `url(${music.thumbUrl})`,
                  position: "relative",
                }}
              ></Music>
            </Link>
            <span>{`Played:  ${music.meta.views}`}</span>
          </li>
        ))}
      </MusicContainer>
      <h1>{`내가 좋아요 누른 음악들`}</h1>
      <Btn>
        <Link to={`/profile/${user?._id}/update`} style={{ display: "block" }}>
          Update Profile
        </Link>
      </Btn>
    </Wrapper>
  );
};

export default MyProfile;
