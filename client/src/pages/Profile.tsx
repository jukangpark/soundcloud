import { useEffect, useState } from "react";
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
import SignUpBtn from "../components/SignUpBtn";
import Wrapper from "../components/Wrapper";
import { Music } from "./Home";

interface IUser {
  username: "string";
}

const MyProfile = () => {
  // const user = useRecoilValue(userState);

  const isDark = useRecoilValue(isDarkState);
  const [list, setList] = useState<Music[]>();

  const { isLoading, data: user } = useQuery<IUser>("user", () =>
    fetchLoggedinUser()
  );

  useEffect(() => {
    fetch("/api/view")
      .then((response) => response.json())
      .then((data) => setList(data.list));

    // data는 배열을 담고 있는 객체 입니다.
  }, []);

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
                marginLeft: "30px",
                marginBottom: "20px",
              }}
            ></div>
            <Description>{`${user?.username}`}</Description>
            <SignUpBtn>
              <Link to="/profile/update">Update Profile</Link>
            </SignUpBtn>
          </TitleBox>
        </TitleContainer>
      </Banner>
      <MusicContainer style={{ marginTop: "50px" }} isDark={isDark}>
        {list?.map((x, index) => (
          <li key={index} style={{ marginBottom: "40px" }}>
            <Link to={`${x._id}`}>
              <div
                style={{
                  backgroundColor: "gray",
                  width: "180px",
                  height: "180px",
                }}
              >
                썸네일
              </div>
              <h1 style={{ fontSize: "18px" }}>{x.title}</h1>
              <p>{`조회수 : ${x.meta.views}`}</p>
            </Link>
          </li>
        ))}
      </MusicContainer>
    </Wrapper>
  );
};

export default MyProfile;
