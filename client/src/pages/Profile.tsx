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
import IUser from "./Home";
import { useParams } from "react-router-dom";
import { Music } from "../components/Music";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface IData {
  username: string;
  musics: Array<IMusic>;
  profileImageUrl: string;
  _id: string;
}

interface IParams {
  id: string;
}

const Profile = () => {
  const isDark = useRecoilValue(isDarkState);
  const [list, setList] = useState<IMusic[]>();
  const [user, setUser] = useState<IData>();

  const { id } = useParams<IParams>();

  useEffect(() => {
    fetch(`/api/profile/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            ></div>
            <Description>{`${user?.username}`}</Description>
          </TitleBox>
        </TitleContainer>
      </Banner>
      <h1>{`${user?.username}가 올린 음악들`}</h1>
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
            <span>{`재생수:  ${music.meta.views}`}</span>
          </li>
        ))}
      </MusicContainer>
    </Wrapper>
  );
};

export default Profile;
