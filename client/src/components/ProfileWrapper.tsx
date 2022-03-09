import styled from "styled-components";

const ProfileWrapper = styled.div`
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

export default ProfileWrapper;
