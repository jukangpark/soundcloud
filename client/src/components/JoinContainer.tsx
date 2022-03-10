import styled from "styled-components";
import { Btn } from "./Btn";

const Container = styled.div`
  height: 375px;
  position: relative;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  div > h1 {
    font-size: 36px;
    @media ${(props) => props.theme.mobile} {
      font-size: 24px;
      line-height: 24px;
      letter-spacing: 0;
    }
  }
  div > p {
    font-size: 24px;
    margin-top: 7px;
    font-weight: 100;
    @media ${(props) => props.theme.mobile} {
      font-size: 20px;
      line-height: 20px;
      letter-spacing: 0;
      font-weight: lighter;
    }
  }
  div > span {
    display: block;
    font-size: 12px;
    margin-top: 20px;
  }
  a {
    font-size: 16px;
    line-height: 18px;
    padding: 10px 15px;
    height: 40px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
  }
`;

const JoinContainer = () => {
  return (
    <Container>
      <div>
        <h1>Thanks for listening. Now join in.</h1>
        <p>Save tracks, follow artists and build playlists. All for free.</p>
        <Btn>Create account</Btn>
      </div>
    </Container>
  );
};

export default JoinContainer;
