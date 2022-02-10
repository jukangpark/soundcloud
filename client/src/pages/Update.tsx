import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import { IParams } from "./Post";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { IFormData } from "./Search";
import { Form, TextArea } from "./Write";
import { Music } from "./Home";

const Update = () => {
  const { id } = useParams<IParams>();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();

  console.log(id);
  useEffect(() => {
    fetch(`/api/view/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.post.title);
        setContent(data.post.content);
      });
  }, []);

  const onChangeTitle = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTitle(value);
  };

  const onChangeContent = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setContent(value);
  };

  return (
    <div>
      <Header />
      <MainTitle>Update</MainTitle>
      <Form method="POST" action={`/api/${id}/update`}>
        <Input
          placeholder="제목"
          id="title"
          name="title"
          value={title || ""} // value 에는 undefined 가 들어올 수 없기 때문에 이렇게.
          onChange={onChangeTitle}
        ></Input>
        <Input
          onChange={onChangeContent}
          id="content"
          name="content"
          placeholder="내용"
          value={content || ""} // value 에는 undefined 가 들어올 수 없기 때문에 이렇게.
        ></Input>
        <button>Update</button>
      </Form>
    </div>
  );
};

export default Update;
