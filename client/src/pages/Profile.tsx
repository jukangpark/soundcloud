import { useRecoilValue } from "recoil";
import { userState } from "../atoms";

const MyProfile = () => {
  const user = useRecoilValue(userState);
  return <div>{user.username ? user.username : "Profile"}</div>;
};

export default MyProfile;
