import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Title from "./MainTitle";
import { Btn } from "./Btn";

export const Banner = styled.div`
  background-image: url("https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists@2x-00444712.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 450px;
`;

export const TitleContainer = styled.div`
  position: relative;
  height: 100%;
`;

export const TitleBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

export const Description = styled.p`
  text-align: center;
  font-size: 18px;
  max-width: 530px;
  line-height: 25px;
`;

const BannerContainer = () => {
  return (
    <Banner>
      <Header />
      <TitleContainer>
        <TitleBox>
          <Title>Connect on SoundCloud</Title>
          <Description>
            Discover, stream, and share a constantly expanding mix of music from
            emerging and major artists around the world.
          </Description>
          <Btn>
            <Link to="/join">Create account</Link>
          </Btn>
        </TitleBox>
      </TitleContainer>
    </Banner>
  );
};

export default BannerContainer;
