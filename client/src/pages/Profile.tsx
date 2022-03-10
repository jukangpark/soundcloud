import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { fetchUser } from "../api";
import { isDarkState } from "../atoms";
import {
  Banner,
  Description,
  TitleBox,
  TitleContainer,
} from "../components/Banner";
import Header from "../components/Header";
import MusicContainer from "../components/MusicContainer";
import Wrapper from "../components/Wrapper";
import { IParams } from "../interface";
import { IData } from "../interface";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Profile = () => {
  const isDark = useRecoilValue(isDarkState);
  const { id } = useParams<IParams>();
  const { isLoading, data: user } = useQuery<IData>("user", () =>
    fetchUser(id)
  );
  console.log(user);
  return (
    <Wrapper>
      <HelmetProvider>
        <Helmet>
          <title>{user?.username}</title>
        </Helmet>
      </HelmetProvider>
      <Banner>
        <Header />
        <TitleContainer>
          <TitleBox>
            <div
              style={{
                borderRadius: "90%",
                backgroundColor: "white",
                height: "150px",
                width: "150px",
                marginBottom: "20px",
                position: "relative",
                backgroundImage: `url(${
                  isLoading ? "undefined" : user?.profileImageUrl
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <Description>{`${
              isLoading ? "Loading..." : user?.username
            }`}</Description>
          </TitleBox>
        </TitleContainer>
      </Banner>
      <h1>{isLoading ? "Loading..." : `${user?.username}가 올린 음악들`}</h1>
      <MusicContainer isDark={isDark} data={user?.musics} />
      <Footer />
    </Wrapper>
  );
};

export default Profile;

// {user?.musics?.map((music, index) => (
//   <li key={index} style={{ marginBottom: "40px" }}>
//     <Link to={`/${music._id}`}>
//       <h1 style={{ fontSize: "18px" }}>{music.title}</h1>
//       <Music
//         style={{
//           backgroundImage: `url(${music.thumbUrl})`,
//           position: "relative",
//         }}
//       ></Music>
//     </Link>
//     <span>{`재생수:  ${music.meta.views}`}</span>
//   </li>
// ))}
