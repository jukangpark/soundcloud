import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Input from "../components/Input";
import MainTitle from "../components/MainTitle";
import { IPost } from "../pages/Home";

export interface IFormData {
  keyword: string;
}

const Search = () => {
  const { register, handleSubmit } = useForm<IFormData>();
  const [list, setList] = useState<IPost[]>();

  const onValid = ({ keyword }: IFormData) => {
    fetch(`/api/search?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => setList(data.list));
  };

  console.log(list);

  return (
    <div>
      <Header />
      <MainTitle>Search</MainTitle>
      <form
        style={{ maxWidth: "320px", margin: "0 auto" }}
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          {...register("keyword", { required: "키워드를 작성해주세요" })}
          placeholder="search title"
          name="keyword"
        />
        <button>Search</button>
      </form>
      <ul>
        {list?.map((x, index) => (
          <li key={index}>
            <Link to={`/${x._id}`}>{x.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
