import Header from "../components/Header";
import Form from "../components/Form";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cookieState } from "../atoms";
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
import { Helmet, HelmetProvider } from "react-helmet-async";

interface IForm {
  username: string;
  password: string;
}

const Login = () => {
  const [hasCookie, setHasCookie] = useRecoilState(cookieState);
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

    if (data.user) {
      history.push("/");
    }
  };

  return (
    <Wrapper>
      <HelmetProvider>
        <Helmet>
          <title>Login</title>
        </Helmet>
      </HelmetProvider>
      <Banner>
        <Header />
        <TitleContainer>
          <TitleBox>
            <Title>Log in</Title>
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
      </Form>
      <Footer />
    </Wrapper>
  );
};

export default Login;
