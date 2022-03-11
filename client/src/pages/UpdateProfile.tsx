import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import { Banner } from "../components/Banner";
import { TitleContainer, TitleBox, Description } from "../components/Banner";
import Title from "../components/MainTitle";
import Form from "../components/Form";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Btn } from "../components/Btn";

interface IUser {
  email: string;
  id: string;
  password: string;
  password2: string;
  username: string;
  location: string;
  profileImage: string;
}

interface IParams {
  id: string;
}

const UpdateProfile = () => {
  const { id } = useParams<IParams>();
  const [user, setUser] = useState<IUser>();

  console.log(id); //userId

  useEffect(() => {
    fetch(`/api/profile/${id}/update`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUser>();

  const onValid = async ({ email, username, location }: IUser) => {
    const res = await fetch(`/api/profile/${id}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        location,
      }),
    }).then((response) => response.json());

    fetch(`/api/profile/${id}/update`)
      .then((response) => response.json())
      .then((data) => setUser(data));

    alert(res.errorMessage);

    setValue("username", "");
    setValue("email", "");
    setValue("password", "");
    setValue("password2", "");
    setValue("location", "");
  };

  return (
    <Wrapper>
      <Banner>
        <Header />
        <TitleContainer>
          <TitleBox>
            <Title>Update Your Profile</Title>
            <Description>
              Create your SoundCloud Member profile and get first access to the
              very best of music , inspiration and community.
            </Description>
          </TitleBox>
        </TitleContainer>
      </Banner>
      <Form
        onSubmit={handleSubmit(onValid)}
        method="POST"
        action={`/api/profile/${id}/update`}
      >
        <Input
          {...register("username", { required: "이름을 입력해주세요" })}
          placeholder={user?.username}
          name="username"
        />
        {errors.username?.message}

        <Input
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "올바르지 않은 이메일 형식입니다.",
            },
          })}
          placeholder={user?.email}
          name="email"
          type="email"
        />
        {errors.email?.message}

        <Input
          {...register("location", {
            required: "location을 입력해주세요.",
          })}
          placeholder={user?.location}
          name="location"
        />
        {errors.location?.message}

        <Btn>Update</Btn>
      </Form>
    </Wrapper>
  );
};

export default UpdateProfile;
