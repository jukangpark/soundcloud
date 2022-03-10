import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { fetchLoggedinUser } from "../api";
import { isDarkState } from "../atoms";
import { Banner } from "../components/Banner";
import Header from "../components/Header";
import MusicContainer from "../components/MusicContainer";
import { Btn } from "../components/Btn";
import Wrapper from "../components/Wrapper";
import { IMusic } from "../interface";
import Footer from "../components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ProfileContainer from "../components/ProfileContainer";

interface IUser {
  username: string;
  _id: string;
  profileImageUrl: string;
  musics: Array<IMusic>;
}

const MyProfile = () => {
  const isDark = useRecoilValue(isDarkState);

  const { isLoading, data: user } = useQuery<IUser>("loggedInUser", () =>
    fetchLoggedinUser()
  );

  return (
    <Wrapper>
      <HelmetProvider>
        <Helmet>
          <title>{user?.username}</title>
        </Helmet>
      </HelmetProvider>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Banner>
            <Header />
            <ProfileContainer user={user} />
          </Banner>
          <h1>내가 올린 음악들</h1>
          <MusicContainer isDark={isDark} data={user?.musics} />
          <h1>내가 좋아요 누른 음악들</h1>
          <Btn>
            <Link
              to={`/profile/${user?._id}/update`}
              style={{ display: "block" }}
            >
              Update Profile
            </Link>
          </Btn>
        </>
      )}
      <Footer />
    </Wrapper>
  );
};

export default MyProfile;
