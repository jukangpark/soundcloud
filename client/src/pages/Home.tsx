import { Link } from "react-router-dom";
import Header from "../components/Header";
import Write from "./Write";
import styled from "styled-components";
import { useEffect, useState } from "react";

const MainTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-top: 50px;
`;

// interface list {
//   title: string;
//   content: string;
//   meta: object;
//   comments: object;
// }

interface IPost {
  title: string;
  content: string;
}

// 해로쿠에서는 어디에 fetch 날릴거임?

const Home = () => {
  const [list, setList] = useState<IPost[]>();
  const [isLoading, setLoading] = useState(true);

  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
      )
    ).json();
    console.log(json);
  };
  useEffect(() => {
    getMovie();
    fetch("/api/view")
      .then((response) => response.json())
      .then((data) => setList(data.list));
    // json을 파싱하면 어떤 형태로 나오는지 봐보자.
    // 나의 예상으로는 data는 배열을 담고 있는 객체 형태여야합니다.
    setLoading(false);
  }, []);

  return (
    <div>
      <Header />
      <MainTitle>Board App</MainTitle>

      <button
        onClick={() => {
          fetch("/api/data")
            .then((response) => response.json())
            .then((data) => console.log(data));
        }}
      >
        get data
      </button>

      {isLoading
        ? "laoding..."
        : list?.map((x) => (
            <li>
              <span>{x.title}</span>
              <span>{x.content}</span>
            </li>
          ))}
    </div>
  );
};

export default Home;

// json() 을 빼주니까 에러가 안나오네? 그럼 왜 json() 을 사용하면 안되는거죠?
