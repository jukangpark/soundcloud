import React, { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import { IParams } from "./Music";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { IFormData } from "./Search";
import Form from "../components/Form";
import { TextArea } from "./Upload";
import { IMusic } from "./Home";
import BannerContainer, {
  Banner,
  Description,
  TitleBox,
  TitleContainer,
} from "../components/Banner";
import Title from "../components/MainTitle";
import { Btn } from "../components/Btn";
import { useQuery } from "react-query";
import { fetchMusic } from "../api";
import Wrapper from "../components/Wrapper";

const Update = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMusic>();
  const { id } = useParams<IParams>();

  const { isLoading, data } = useQuery("music", () => fetchMusic(id));

  const onValid = async ({ title, content }: IMusic) => {
    const response = await fetch(`/api/${id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    const { message } = await response.json();
    alert(message);
    history.push(`/${id}`);
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
            <Title>Update Your Music</Title>
            <Description>
              Update your SoundCloud Music title and description
            </Description>
          </TitleBox>
        </TitleContainer>
      </Banner>

      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("title", { required: "title 을 입력해주세요." })}
          id="title"
          name="title"
          placeholder={data?.music.title}
        ></Input>
        <span>{errors?.title?.message}</span>
        <Input
          {...register("content", { required: "description 을 입력해주세요." })}
          id="content"
          name="content"
          placeholder={data?.music.content}
        ></Input>
        <span>{errors?.content?.message}</span>
        <Btn>Update</Btn>
      </Form>
    </Wrapper>
  );
};

export default Update;
