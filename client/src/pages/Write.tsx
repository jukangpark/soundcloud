import styled from "styled-components";
import Header from "../components/Header";

const Write = () => {
  const MainTitle = styled.h1`
    font-size: 24px;
    text-align: center;
    margin-top: 50px;
  `;

  const Form = styled.form`
    display: block;
    max-width: 250px;
    margin: 50px auto;
  `;

  const Input = styled.input`
    width: 200px;
    padding: 0;
    box-sizing: border-box;
  `;

  const TextArea = styled.textarea`
    width: 200px;
    height: 100px;
    padding: 0;
    box-sizing: border-box;
  `;

  const Label = styled.label`
    width: 50px;
    display: block;
  `;

  return (
    <div>
      <Header />
      <MainTitle>글 작성하기</MainTitle>
      <Form method="POST" action="/api/write">
        <Label htmlFor="title">제목</Label>
        <Input placeholder="제목" id="title" name="title"></Input>

        <Label>내용</Label>
        <TextArea id="content" name="content" placeholder="내용"></TextArea>
        <button>Submit</button>
      </Form>
    </div>
  );
};

export default Write;

// text area is often used in a form, to collect user inputs like comments or reviews.
