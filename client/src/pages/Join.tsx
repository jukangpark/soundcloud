import Header from "../components/Header";
import styled from "styled-components";
import MainTitle from "../components/MainTitle";
import { Form } from "./Upload";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Wrapper from "../components/Wrapper";
import BannerContainer, {
  Description,
  TitleBox,
  TitleContainer,
  Banner,
} from "../components/Banner";
import Title from "../components/MainTitle";
import { Btn } from "../components/Btn";
import Input from "../components/Input";
import Footer from "../components/Footer";

interface IUser {
  email: string;
  id: string;
  password: string;
  password2: string;
  username: string;
  location: string;
}

// https://a-v2.sndcdn.com/assets/images/img-upload-hero@2x-464ed045.jpg

// email: { type: String, required: true, unique: true },
// avatarUrl: String,
// username: { type: String, required: true, unique: true },
// password: { type: String },
// location: String,

const Join = () => {
  const history = useHistory();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUser>();

  const onValid = ({
    email,
    id,
    password,
    password2,
    username,
    location,
  }: IUser) => {
    if (password !== password2) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setValue("username", "");
    setValue("email", "");
    setValue("id", "");
    setValue("password", "");
    setValue("password2", "");
    setValue("location", "");

    fetch("/api/user/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        id,
        password,
        password2,
        username,
        location,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data?.message);
        history.push("/login"); // redirect 로그인 성공.
      }); // fetchApi 를 통해 서버로 post 요청 날린다.
  };

  return (
    <Wrapper>
      <Banner
        style={{
          backgroundImage:
            "url(https://a-v2.sndcdn.com/assets/images/img-upload-hero@2x-464ed045.jpg)",
        }}
      >
        <Header />
        <TitleContainer>
          <TitleBox>
            <Title>Become a member</Title>
            <Description>
              Create your SoundCloud Member profile and get first access to the
              very best of music , inspiration and community.
            </Description>
          </TitleBox>
        </TitleContainer>
      </Banner>

      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("username", { required: "이름을 입력해주세요" })}
          placeholder="username"
          name="username"
        />
        {errors.username?.message}

        <Input
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*]{10,16}$/,
              message:
                "영문 대 소문+숫자+특수문자 10~16자리(특수문자 포함 !@#$%^&*)",
            },
          })}
          placeholder="password"
          name="password"
          type="password"
        />
        {errors.password?.message}

        <Input
          {...register("password2", {
            required: "비밀번호 확인을 입력해주세요",
          })}
          placeholder="password confirmation"
          name="password2"
          type="password"
        />
        <span>{error}</span>
        {errors.password2?.message}

        <Input
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "올바르지 않은 이메일 형식입니다.",
            },
          })}
          placeholder="email"
          name="email"
          type="email"
        />
        {errors.email?.message}

        <Input
          {...register("location", {
            required: "location을 입력해주세요.",
          })}
          placeholder="location"
          name="location"
        />
        {errors.location?.message}

        <br />
        <Btn style={{ marginTop: "10px" }} onClick={handleSubmit(onValid)}>
          Join
        </Btn>
        <p style={{ marginTop: "10px" }}>If you already have account?</p>
        <Link to="/login" style={{ textDecoration: "underline" }}>
          Login
        </Link>
      </Form>
      <Footer />
    </Wrapper>
  );
};

//   email: { type: String, required: true, unique: true },
//   avatarUrl: String,
//   username: { type: String, required: true, unique: true },
//   password: { type: String },
//   name: { type: String, required: true },
//   location: String,
export default Join;
