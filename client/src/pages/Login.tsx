import Header from "../components/Header";
import styled from "styled-components";
import MainTitle from "../components/MainTitle";
import { Form, Label, Input } from "./Write";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

interface IForm {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ username, password }: IForm) => {
    fetch(`/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  };

  return (
    <div>
      <Header />
      <MainTitle>Login</MainTitle>
      <Form onSubmit={handleSubmit(onValid)}>
        <Label>username</Label>
        <Input
          {...register("username", {
            required: "id를 입력해주세요",
          })}
          placeholder="username"
          name="username"
        />
        <p>{errors.username?.message}</p>

        <Label>password</Label>
        <Input
          {...register("password", {
            required: "password 를 입력해주세요.",
          })}
          placeholder="password"
          name="password"
          type="password"
        />
        {errors.password?.message}

        <p>If you have no account?</p>
        <button>Log In</button>
        <Link to="/join">Join</Link>
      </Form>
    </div>
  );
};

export default Login;

// 어떻게 해야 username 과 password 데이터를 서버로 넘겨준다음에
// redirect 홈 화면으로 넘어가지?
