import { useRecoilValue } from "recoil";
import { userState } from "../atoms";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";

const MyProfile = () => {
  const user = useRecoilValue(userState);
  return (
    <div>
      <Header />
      <MainTitle>{user.username ? user.username : "Profile"}</MainTitle>
      <h1>내가 작성한 글</h1>
      <li>글1</li>
      <li>글2</li>
      <li>글3</li>
      <button>회원 정보 수정하기</button>
    </div>
  );
};

export default MyProfile;
