import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Banner,
  Description,
  TitleBox,
  TitleContainer,
} from "../components/Banner";
import Header from "../components/Header";
import Input from "../components/Input";
import Title from "../components/MainTitle";
import SignUpBtn from "../components/SignUpBtn";
import Wrapper from "../components/Wrapper";

export const Form = styled.form`
  display: block;
  margin: 50px auto;
  max-width: 420px;
`;

export const TextArea = styled.textarea`
  width: 200px;
  height: 100px;
  padding: 0;
  box-sizing: border-box;
`;

const Write = () => {
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
            <Title>First upload to first album</Title>
            <Description>
              Share your tracks and access the tools you need to break through
              and build your legacy.
            </Description>
            <SignUpBtn>
              <Link to="/join">Upload your first track</Link>
            </SignUpBtn>
          </TitleBox>
        </TitleContainer>
      </Banner>
      <Form method="POST" action="/api/write" encType="multipart/form-data">
        <label htmlFor="music" style={{ display: "block", marginTop: "20px" }}>
          Music
        </label>
        <Input
          type="file"
          accept="audio/*"
          id="music"
          name="music"
          style={{ marginTop: "5px" }}
          required
        />
        <label
          htmlFor="thumbnail"
          style={{ display: "block", marginTop: "20px" }}
        >
          Thumbnail
        </label>
        <Input
          type="file"
          accept="image/*"
          id="thumbnail"
          name="thumbnail"
          required
          style={{ marginTop: "5px" }}
        />
        <Input placeholder="Title" id="title" name="title" />
        <Input id="content" name="content" placeholder="description" />
        <SignUpBtn>Submit</SignUpBtn>
      </Form>
    </Wrapper>
  );
};

export default Write;

// text area is often used in a form, to collect user inputs like comments or reviews.
