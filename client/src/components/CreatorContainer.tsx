import styled from "styled-components";

const CreatorContainer = styled.div`
  background-image: url("https://a-v2.sndcdn.com/assets/images/hp_creator_image_featured_artists@2x-3007d170.jpg");
  height: 350px;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  div {
    color: white;
    width: 50%;
    margin-left: 70px;
    h1 {
      font-size: 36px;
      @media ${(props) => props.theme.mobile} {
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 0;
      }
    }
    p {
      font-size: 24px;
      margin-top: 11px;
      margin-bottom: 26px;
      line-height: 30px;
      @media ${(props) => props.theme.mobile} {
        font-size: 20px;
        line-height: 20px;
        letter-spacing: 0;
      }
    }
    a {
      font-size: 16px;
      line-height: 18px;
      padding: 10px 15px;
      height: 40px;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
    }
  }
`;

export default CreatorContainer;
