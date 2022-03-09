import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
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
import { Music } from "../components/Music";
import { IMusic } from "../interface";
import { AppContainer, AppImg } from "../components/AppContainer";
import JoinContainer from "../components/JoinContainer";
import { Trending } from "../components/Trending";
import CreatorContainer from "../components/CreatorContainer";
import ProfileWrapper from "../components/ProfileWrapper";

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
