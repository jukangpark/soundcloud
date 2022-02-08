import { Link } from "react-router-dom";
import Header from "../components/Header";
import Write from "./Write";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Title from "../components/MainTitle";
import SignUpBtn from "../components/SignUpBtn";

const Banner = styled.div`
  background-image: url("https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists@2x-00444712.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 450px;
`;

const TitleContainer = styled.div`
  position: relative;
  height: 100%;
`;

const TitleBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

const Description = styled.p`
  text-align: center;
  font-size: 18px;
  max-width: 530px;
  line-height: 25px;
`;

export interface IPost {
  title: string;
  content: string;
  createdAt: number;
  meta: {
    views: number;
  };
  _id: number;
}

// 해로쿠에서는 어디에 fetch 날릴거임?

const Home = () => {
  const [list, setList] = useState<IPost[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/view")
      .then((response) => response.json())
      .then((data) => setList(data.list));

    // data는 배열을 담고 있는 객체 입니다.
    setLoading(false);
  }, []);
  console.log(list);
  return (
    <Wrapper>
      <Banner>
        <Header />
        <TitleContainer>
          <TitleBox>
            <Title>Connect on SoundCloud</Title>
            <Description>
              Discover, stream, and share a constantly expanding mix of music
              from emerging and major artists around the world.
            </Description>
            <SignUpBtn>
              <Link to="/join">Create account</Link>
            </SignUpBtn>
          </TitleBox>
        </TitleContainer>
      </Banner>

      {isLoading
        ? "laoding..."
        : list?.map((x, index) => (
            <li key={x.createdAt}>
              <Link to={`${x._id}`}>
                <h1>{`제목 : ${x.title}`}</h1>
                <span>{`작성한 날짜 : ${x.createdAt}`}</span>
                <p>{`조회수 : ${x.meta.views}`}</p>
              </Link>
              <hr></hr>
            </li>
          ))}
    </Wrapper>
  );
};

export default Home;

// json() 을 빼주니까 에러가 안나오네? 그럼 왜 json() 을 사용하면 안되는거죠?
