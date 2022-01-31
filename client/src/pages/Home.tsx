import { Link } from "react-router-dom";
import Header from "../components/Header";
import Write from "./Write";
import styled from "styled-components";

const Home = () => {
  const MainTitle = styled.h1`
    font-size: 24px;
    text-align: center;
    margin-top: 50px;
  `;

  return (
    <div>
      <Header />
      <MainTitle>Board App</MainTitle>
    </div>
  );
};

export default Home;
