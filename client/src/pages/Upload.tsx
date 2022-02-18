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
import { Btn } from "../components/Btn";
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
            <Btn>
              <Link to="/join">Upload your first track</Link>
            </Btn>
          </TitleBox>
        </TitleContainer>
      </Banner>
      <Form method="POST" action="/api/upload" encType="multipart/form-data">
        <label htmlFor="music" style={{ display: "block", marginTop: "20px" }}>
          Music
        </label>
        <Input
          type="file"
          accept="audio/*"
          id="music"
          name="music"
          style={{ marginTop: "5px", cursor: "pointer" }}
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
          style={{ marginTop: "5px", cursor: "pointer" }}
        />
        <Input placeholder="Title" id="title" name="title" maxLength={17} />
        <Input id="content" name="content" placeholder="description" />
        <Btn>Submit</Btn>
      </Form>
    </Wrapper>
  );
};

export default Write;

// text area is often used in a form, to collect user inputs like comments or reviews.
