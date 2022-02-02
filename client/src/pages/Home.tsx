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
  createdAt: number;
  meta: {
    views: number;
  };
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
            <li key={x.createdAt}>
              <span>{x.title}</span>
              <span>{x.content}</span>
            </li>
          ))}
    </div>
  );
};

export default Home;

// json() 을 빼주니까 에러가 안나오네? 그럼 왜 json() 을 사용하면 안되는거죠?
