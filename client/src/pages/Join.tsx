import Header from "../components/Header";
import styled from "styled-components";
import MainTitle from "../components/MainTitle";
import { Form, Input, Label } from "./Write";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface IUser {
  email: string;
  id: string;
  password: string;
  password2: string;
  username: string;
  location: string;
}

// email: { type: String, required: true, unique: true },
// avatarUrl: String,
// username: { type: String, required: true, unique: true },
// password: { type: String },
// location: String,

const Join = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
      .then((data) => setMessage(data?.message)); // fetchApi 를 통해 서버로 post 요청 날린다.
  };

  return (
    <div>
      <Header />
      <MainTitle>Join</MainTitle>
      <Form onSubmit={handleSubmit(onValid)}>
        <Label>username</Label>
        <Input
          {...register("username", { required: "이름을 입력해주세요" })}
          placeholder="username"
          name="username"
        />
        {errors.username?.message}

        <Label>password</Label>
        <Input
          {...register("password", {
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*]{10,16}$/,
              message: "올바르지 않은 비밀번호 형태입니다.",
            },
          })}
          placeholder="영문 대 소문+숫자+특수문자 10~16자리(특수문자 포함 !@#$%^&*)"
          name="password"
          type="password"
        />
        {errors.password?.message}

        <Label>password2</Label>
        <Input
          {...register("password2", {
            required: "비밀번호 확인을 입력해주세요",
          })}
          placeholder="password2"
          name="password2"
          type="password"
        />
        <span>{error}</span>
        {errors.password2?.message}

        <Label>email</Label>
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

        <Label>location</Label>
        <Input
          {...register("location", {
            required: "location을 입력해주세요.",
          })}
          placeholder="location"
          name="location"
        />
        {errors.location?.message}

        <br />
        <button onClick={handleSubmit(onValid)}>Join</button>
        <p>If you already have account?</p>
        <Link to="/login">Login</Link>
        <p>{message}</p>
      </Form>
    </div>
  );
};

//   email: { type: String, required: true, unique: true },
//   avatarUrl: String,
//   username: { type: String, required: true, unique: true },
//   password: { type: String },
//   name: { type: String, required: true },
//   location: String,
export default Join;
