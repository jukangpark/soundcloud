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
import SignUpBtn from "../components/SignUpBtn";
import Wrapper from "../components/Wrapper";
import { Music } from "./Home";
import { Form } from "./Upload";

interface IUser {
  username: string;
  _id: string;
  profileImageUrl: string;
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
    console.log(user?.profileImageUrl);

    // data는 배열을 담고 있는 객체 입니다.
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const onValid = async (data: any) => {
    const formData = new FormData();
    console.log(data);
    console.log(data.profileImage[0]);
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
              }}
            >
              <img src={`${user?.profileImageUrl}`} alt="profileImage" />
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
      <p>내가 올린 음악들</p>
      <SignUpBtn>
        <Link to={`/profile/${user?._id}/update`} style={{ display: "block" }}>
          Update Profile
        </Link>
      </SignUpBtn>
    </Wrapper>
  );
};

export default MyProfile;
