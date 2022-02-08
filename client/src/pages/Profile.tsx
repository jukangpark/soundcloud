import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms";
import {
  Banner,
  Description,
  TitleBox,
  TitleContainer,
} from "../components/Banner";
import Header from "../components/Header";
import Title from "../components/MainTitle";
import MainTitle from "../components/MainTitle";
import SignUpBtn from "../components/SignUpBtn";
import Wrapper from "../components/Wrapper";

const MyProfile = () => {
  const user = useRecoilValue(userState);
  return (
    <Wrapper>
      <Banner>
        <Header />
        <TitleContainer>
          <TitleBox>
            <div
              style={{
                borderRadius: "90%",
                backgroundColor: "gray",
                height: "100px",
                width: "100px",
              }}
            ></div>
            <Title>Profile</Title>
            <Description>{`Hello ${user.username}`}</Description>
            <SignUpBtn>
              <Link to="/profile/update">Update Profile</Link>
            </SignUpBtn>
          </TitleBox>
        </TitleContainer>
      </Banner>
      <h1>내가 작성한 글</h1>
      <li>글1</li>
      <li>글2</li>
      <li>글3</li>
      <button>회원 정보 수정하기</button>
    </Wrapper>
  );
};

export default MyProfile;
