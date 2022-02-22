import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Helmet } from "react-helmet";

import Search from "./Search";
import BannerContainer from "../components/Banner";
import styled from "styled-components";
import { Btn } from "../components/Btn";
import { useRecoilValue } from "recoil";
import { isDarkState } from "../atoms";
import Footer from "../components/Footer";
import MusicContainer from "../components/MusicContainer";
import { useQuery } from "react-query";
import { fetchMusics } from "../api";
import { HelmetProvider } from "react-helmet-async";
import { Music } from "../components/Music";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const Trending = styled.div<{ isDark: boolean }>`
  font-size: 24px;
  text-align: center;
  padding-top: 20px;
  margin-bottom: 30px;
  margin-top: 60px;
  background-color: ${(props) =>
    props.isDark ? props.theme.bgColor : "white"};
`;

const AppContainer = styled.div`
  margin-top: 70px;
  display: flex;
  height: 450px;

  div:nth-child(2) {
    width: 325px;
    margin-left: 50px;
    h1 {
      font-size: 36px;
      margin-bottom: 17px;
      font-weight: 600;
    }
    h1:after {
      content: "";
      display: block;
      width: 70px;
      height: 3px;
      background-image: linear-gradient(90deg, #7d01a1, #f30 50%, #f50);
      margin-top: 15px;
    }
    p {
      font-size: 24px;
      font-weight: 100;
      line-height: 30px;
      letter-spacing: 2px;
    }
    a {
      display: block;
      background-image: url("https://a-v2.sndcdn.com/assets/images/appstore_badge@en_2x-5a6e21e0.png");
      width: 120px;
      height: 40px;
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
`;

const AppImg = styled.div`
  width: 730px;
  height: 450px;
  background-image: url("https://a-v2.sndcdn.com/assets/images/never_stop_listening@2x-ae7903ca.jpg");
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;
`;

const CreatorContainer = styled.div`
  background-image: url("https://a-v2.sndcdn.com/assets/images/hp_creator_image_featured_artists@2x-3007d170.jpg");
  height: 350px;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  div {
    color: white;
    width: 520px;
    margin-left: 70px;
    h1 {
      font-size: 36px;
    }
    p {
      font-size: 24px;
      margin-top: 11px;
      margin-bottom: 26px;
      line-height: 30px;
    }
    a {
      font-size: 16px;
      line-height: 18px;
      padding: 10px 15px;
      height: 40px;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
    }
  }
`;

const JoinContainer = styled.div`
  height: 375px;
  position: relative;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  div > h1 {
    font-size: 36px;
  }
  div > p {
    font-size: 24px;
    margin-top: 7px;
    font-weight: 100;
  }
  div > span {
    display: block;
    font-size: 12px;
    margin-top: 20px;
  }
  div > span > a {
    font-size: 16px;
    line-height: 18px;
    padding: 10px 15px;
    height: 40px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    margin-left: 15px;
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  div {
    background-position: center;
    background-size: cover;
    width: 30px;
    height: 30px;
    border-radius: 90%;
  }
  span {
    margin-left: 10px;
    font-size: 13px;
  }
`;

// const Span = styled.span`
//   &:hover {
//     color: ${(props) => props.theme.acc};
//   }
// `;
export interface IOwner {
  comments: object;
  email: string;
  username: string;
  profileImageUrl: string;
  _id: string;
}

interface IComment {
  _id: string;
  text: string;
  createdAt: string;
  owner: IOwner;
  music: string;
}

export interface IMusic {
  title: string;
  content: string;
  createdAt: number;
  meta: {
    views: number;
  };
  _id: string;
  thumbUrl: string;
  fileUrl: string;
  owner: { username: string; _id: string; profileImageUrl: string };
  comments: Array<IComment>;
}

// 해로쿠에서는 어디에 fetch 날릴거임?

const Home = () => {
  const isDark = useRecoilValue(isDarkState);
  const { isLoading, data } = useQuery<IMusic[]>("musics", () => fetchMusics());

  return (
    <Wrapper>
      {/* <HelmetProvider>
        <Helmet>
          <title>soundcloud</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </HelmetProvider> */}
      <BannerContainer />

      {isLoading ? (
        <h1 style={{ fontSize: "36px", textAlign: "center" }}>Loading...</h1>
      ) : (
        <>
          <Search />
          <Trending isDark={isDark}>
            Hear what’s trending for free in the SoundCloud community
          </Trending>
          <MusicContainer isDark={isDark}>
            {data?.map((music, index) => (
              <li key={index} style={{ marginBottom: "40px" }}>
                <Link to={`${music._id}`}>
                  <h1 style={{ fontSize: "18px" }}>{music.title}</h1>
                  <Music
                    style={{
                      backgroundImage: `url(${music.thumbUrl})`,
                      position: "relative",
                    }}
                  ></Music>
                </Link>
                <Link to={`/profile/${music.owner._id}`}>
                  <ProfileWrapper>
                    <div
                      style={{
                        backgroundImage: `url(${music.owner.profileImageUrl})`,
                      }}
                    ></div>
                    <span>{music.owner.username}</span>
                    <span>{`Played:  ${music.meta.views}`}</span>
                  </ProfileWrapper>
                </Link>
              </li>
            ))}
          </MusicContainer>
          <Btn style={{ width: "240px" }}>Explore trending playlists</Btn>
          <AppContainer>
            <AppImg></AppImg>
            <div>
              <h1>Never stop listening</h1>
              <p>
                SoundCloud is available on Web, iOS, Android, Sonos, Chromecast,
                and Xbox One.
              </p>
              <div style={{ display: "flex", marginTop: "40px" }}>
                <Link to="#" />
                <Link
                  to="#"
                  style={{
                    width: "135px",
                    marginLeft: "10px",
                    backgroundImage:
                      "url(https://a-v2.sndcdn.com/assets/images/google_play_badge@en-51d52194.png)",
                  }}
                />
              </div>
            </div>
          </AppContainer>
          <CreatorContainer>
            <div>
              <h1>Calling all creators</h1>
              <p>
                Get on SoundCloud to connect with fans, share your sounds, and
                grow your audience. What are you waiting for?
              </p>
              <Link to="#">Find out more</Link>
            </div>
          </CreatorContainer>
          <JoinContainer>
            <div>
              <h1>Thanks for listening. Now join in.</h1>
              <p>
                Save tracks, follow artists and build playlists. All for free.
              </p>
              <Btn>Create account</Btn>
              <span>
                Already have an account? <Link to="/join">Sign in</Link>
              </span>
            </div>
          </JoinContainer>
          <Footer />
        </>
      )}
    </Wrapper>
  );
};

export default Home;

// json() 을 빼주니까 에러가 안나오네? 그럼 왜 json() 을 사용하면 안되는거죠?
