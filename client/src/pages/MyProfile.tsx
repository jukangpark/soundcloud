import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { fetchLoggedinUser } from "../api";
import { isDarkState } from "../atoms";
import {
  Banner,
  Description,
  TitleBox,
  TitleContainer,
} from "../components/Banner";
import Header from "../components/Header";
import MusicContainer from "../components/MusicContainer";
import { Btn } from "../components/Btn";
import Wrapper from "../components/Wrapper";
import { IMusic } from "../interface";
import Form from "../components/Form";
import Footer from "../components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

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
  console.log(user?.musics[0].owner);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = async (data: any) => {
    const formData = new FormData();
    formData.append("profileImage", data.profileImage[0]);

    const res = await fetch(
      `/api/profile/${user?._id}/postUpdateProfileImage`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());
    alert(res.message);
  };

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
            >
              <Form
                onChange={handleSubmit(onValid)}
                style={{
                  display: "block",
                  width: "150px",
                  height: "150px",
                  marginTop: 0,
                  position: "absolute",
                  top: 0,
                }}
              >
                <label
                  htmlFor="profileImage"
                  style={{
                    display: "block",
                    height: "100%",
                    cursor: "pointer",
                  }}
                ></label>
                <input
                  {...register("profileImage", {
                    required: "이미지 파일이 존재하지 않습니다.",
                  })}
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                ></input>
              </Form>
            </div>
            <Description>{`${
              isLoading ? "Loading.." : user?.username
            }`}</Description>
          </TitleBox>
        </TitleContainer>
      </Banner>
      <h1>{`내가 올린 음악들`}</h1>
      <MusicContainer isDark={isDark} data={user?.musics} />
      <h1>{`내가 좋아요 누른 음악들`}</h1>
      <Btn>
        <Link to={`/profile/${user?._id}/update`} style={{ display: "block" }}>
          Update Profile
        </Link>
      </Btn>
      <Footer />
    </Wrapper>
  );
};

export default MyProfile;
