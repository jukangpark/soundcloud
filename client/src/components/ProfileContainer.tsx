import { useForm } from "react-hook-form";
import styled from "styled-components";
import { IMusic } from "../interface";

interface IProps {
  user: IUser | undefined;
}

interface IUser {
  username: string;
  _id: string;
  profileImageUrl: string;
  musics: Array<IMusic>;
}

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const ProfileBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

const Form = styled.form`
  display: block;
  width: 150px;
  height: 150px;
  margin-top: 0;
  position: absolute;
  top: 0;
  label {
    display: block;
    height: 100%;
    cursor: pointer;
  }
`;

const Profile = styled.div<{ user: IUser | undefined }>`
  border-radius: 90%;
  background-color: white;
  height: 150px;
  width: 150px;
  margin-bottom: 20px;
  position: relative;
  background-image: url(${(props) => props.user?.profileImageUrl});
  background-size: cover;
  background-position: center;
`;

const ProfileContainer = ({ user }: IProps) => {
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
    <Container>
      <ProfileBox>
        <Profile user={user}>
          <Form onChange={handleSubmit(onValid)}>
            <label htmlFor="profileImage" />
            <input
              {...register("profileImage", {
                required: "이미지 파일이 존재하지 않습니다.",
              })}
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
          </Form>
        </Profile>
      </ProfileBox>
    </Container>
  );
};

export default ProfileContainer;
