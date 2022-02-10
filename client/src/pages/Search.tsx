import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { Music } from "../pages/Home";
import { Form } from "./Write";

export interface IFormData {
  keyword: string;
}

const Search = () => {
  const { register, handleSubmit } = useForm<IFormData>();
  const [list, setList] = useState<Music[]>();

  const onValid = ({ keyword }: IFormData) => {
    fetch(`/api/search?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => setList(data.list));
  };

  console.log(list);

  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          style={{
            backgroundColor: "#f2f2f2",
          }}
          {...register("keyword", { required: "키워드를 작성해주세요" })}
          placeholder="Search Title"
          name="keyword"
        />
      </Form>
      <ul>
        {list === undefined ? (
          "nothing is found"
        ) : (
          <>
            {list?.map((x, index) => (
              <li key={index}>
                <Link to={`/${x._id}`}>{x.title}</Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Search;
