import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input";
import { IMusic } from "../interface";
import Form from "../components/Form";

export interface IFormData {
  keyword: string;
}

const SearchedMusic = styled.li`
  line-height: 20px;
  transition-duration: 400ms;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
  a {
    padding: 30px;
    display: block;
  }
  border-bottom: 0.5px solid ${(props) => props.theme.textColor};
`;

const Search = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();
  const [list, setList] = useState<IMusic[]>();
  const [keyword, setKeyword] = useState<string>();

  const onValid = ({ keyword }: IFormData) => {
    setKeyword(keyword);
    setValue("keyword", "");
    if (keyword === "") {
      setList(undefined);
      return;
    }

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
        <p style={{ marginTop: "5px" }}>{errors.keyword?.message}</p>
      </Form>
      <ul>
        {list === undefined ? (
          "nothing is found"
        ) : (
          <>
            <h1 style={{ fontSize: "36px", marginBottom: "30px" }}>
              {`${keyword} `}
              <span style={{ fontSize: "18px", color: "gray" }}>
                으로 검색한 결과
              </span>
            </h1>
            {list.length === 0
              ? "nothing is found."
              : list?.map((x, index) => (
                  <SearchedMusic key={index}>
                    <Link to={`${x._id}`}>
                      <h1 style={{ fontSize: "18px" }}>
                        {x.title}
                        <span
                          style={{ marginLeft: "15px" }}
                        >{`Played : ${x.meta.views}`}</span>
                      </h1>
                    </Link>
                  </SearchedMusic>
                ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Search;
