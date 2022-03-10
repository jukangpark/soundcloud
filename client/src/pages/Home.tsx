import Wrapper from "../components/Wrapper";
import Search from "./Search";
import BannerContainer from "../components/Banner";
import { Btn } from "../components/Btn";
import { useRecoilValue } from "recoil";
import { isDarkState } from "../atoms";
import Footer from "../components/Footer";
import MusicContainer from "../components/MusicContainer";
import { useQuery } from "react-query";
import { fetchMusics } from "../api";
import { IMusic } from "../interface";
import AppContainer from "../components/AppContainer";
import JoinContainer from "../components/JoinContainer";
import { Trending } from "../components/Trending";
import CreatorContainer from "../components/CreatorContainer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  const isDark = useRecoilValue(isDarkState);
  const { isLoading, data } = useQuery<IMusic[]>("musics", () => fetchMusics());
  return (
    <Wrapper>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>
      <BannerContainer />

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Search />
          <Trending isDark={isDark}>
            Hear what’s trending for free in the SoundCloud community
          </Trending>
          <MusicContainer isDark={isDark} data={data} />
          <Btn style={{ width: "240px" }}>Explore trending playlists</Btn>
          <AppContainer />
          <CreatorContainer />
          <JoinContainer />
          <Footer />
        </>
      )}
    </Wrapper>
  );
};

export default Home;

// json() 을 빼주니까 에러가 안나오네? 그럼 왜 json() 을 사용하면 안되는거죠?
