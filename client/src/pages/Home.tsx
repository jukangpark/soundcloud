import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";

import Search from "./Search";
import BannerContainer from "../components/Banner";
import styled from "styled-components";

const Trending = styled.div`
  font-size: 24px;
  text-align: center;
  padding-top: 20px;
  margin-bottom: 30px;
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
      <BannerContainer />

      {isLoading ? (
        "laoding..."
      ) : (
        <>
          <Search />
          <Trending>
            Hear what’s trending for free in the SoundCloud community
          </Trending>
          {list?.map((x, index) => (
            <li key={x.createdAt}>
              <Link to={`${x._id}`}>
                <div
                  style={{
                    backgroundColor: "gray",
                    width: "200px",
                    height: "200px",
                  }}
                >
                  썸네일
                </div>
                <h1>{`제목 : ${x.title}`}</h1>
                <span>{`작성한 날짜 : ${x.createdAt}`}</span>
                <p>{`조회수 : ${x.meta.views}`}</p>
              </Link>
              <hr></hr>
            </li>
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default Home;

// json() 을 빼주니까 에러가 안나오네? 그럼 왜 json() 을 사용하면 안되는거죠?
