import styled from "styled-components";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";

export const Form = styled.form`
  display: block;
  max-width: 250px;
  margin: 50px auto;
`;

export const Input = styled.input`
  width: 200px;
  padding: 0;
  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  width: 200px;
  height: 100px;
  padding: 0;
  box-sizing: border-box;
`;

export const Label = styled.label`
  width: 50px;
  display: block;
`;

const Write = () => {
  return (
    <div>
      <Header />
      <MainTitle>글 작성하기</MainTitle>
      <Form method="POST" action="/api/write">
        <Label htmlFor="title">제목</Label>
        <Input placeholder="제목" id="title" name="title"></Input>
        <Label>내용</Label>
        <Input id="content" name="content" placeholder="내용"></Input>
        <button>Submit</button>
      </Form>
    </div>
  );
};

export default Write;

// text area is often used in a form, to collect user inputs like comments or reviews.
