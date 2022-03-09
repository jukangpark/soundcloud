import Header from "../components/Header";
import styled from "styled-components";
import MainTitle from "../components/MainTitle";
import Form from "../components/Form";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
// useHistory hook gives you access to the history instance that you may use to navigate.
import { useState } from "react";
import { useRecoilState } from "recoil";
import { cookieState, userState } from "../atoms";
import Wrapper from "../components/Wrapper";
import {
  Banner,
  Description,
  TitleBox,
  TitleContainer,
} from "../components/Banner";
import Title from "../components/MainTitle";
import { Btn } from "../components/Btn";
import Input from "../components/Input";
import Footer from "../components/Footer";

interface IForm {
  username: string;
  password: string;
}

interface IData {
  user: object;
  message: string;
}
const Login = () => {
  const [user, setUser] = useRecoilState(userState);
  const [hasCookie, setHasCookie] = useRecoilState(cookieState);
  const [data, setData] = useState<IData>();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onValid = async ({ username, password }: IForm) => {
    const response = await fetch(`/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    if (data.result === "ok") {
      setHasCookie(true);
    } else {
      alert(data?.message);
      throw new Error(data.error);
    }
    alert("로그인 성공");
    setUser(data.user);

    if (data.user) {
      history.push("/"); // redirect 로그인 성공.
    }
  };

  return (
    <Wrapper>
      <Banner>
        <Header />
        <TitleContainer>
          <TitleBox>
            <Title>Sign in</Title>
            <Description>
              When registering, you agree that we may use your provided data for
              the registration and to send you notifications on our products and
              services.
            </Description>
          </TitleBox>
        </TitleContainer>
      </Banner>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("username", {
            required: "id를 입력해주세요",
          })}
          placeholder="username"
          name="username"
          id="username"
        />
        <p>{errors.username?.message}</p>

        <Input
          {...register("password", {
            required: "password 를 입력해주세요.",
          })}
          placeholder="password"
          name="password"
          id="password"
          type="password"
        />
        {errors.password?.message}

        <Btn style={{ marginTop: "20px" }} onClick={handleSubmit(onValid)}>
          Log In
        </Btn>
        <p style={{ marginTop: "10px" }}>If you have no account?</p>
        <Link to="/join" style={{ textDecoration: "underline" }}>
          Create account
        </Link>
        <span>{data?.message}</span>
      </Form>
      <Footer />
    </Wrapper>
  );
};

export default Login;

// 어떻게 해야 username 과 password 데이터를 서버로 넘겨준다음에
// redirect 홈 화면으로 넘어가지?
