import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin-top: 70px;
  display: flex;
  height: 450px;

  div:nth-child(2) {
    width: 30%;
    @media ${(props) => props.theme.mobile} {
      padding-left: 10px;
    }

    padding-left: 50px;
    h1 {
      font-size: 36px;
      margin-bottom: 17px;
      font-weight: 600;
      @media ${(props) => props.theme.mobile} {
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 0;
      }
    }
    h1:after {
      content: "";
      display: block;
      width: 70px;
      height: 3px;
      background-image: linear-gradient(90deg, #7d01a1, #f30 50%, #f50);
      margin-top: 15px;
    }
    p {
      font-size: 24px;
      font-weight: 100;
      line-height: 30px;
      letter-spacing: 2px;
      @media ${(props) => props.theme.mobile} {
        font-size: 20px;
        line-height: 20px;
        letter-spacing: 0;
      }
    }
    a {
      display: block;
      background-image: url("https://a-v2.sndcdn.com/assets/images/appstore_badge@en_2x-5a6e21e0.png");
      width: 120px;
      height: 40px;
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
`;

const AppImg = styled.div`
  width: 70%;
  height: 450px;
  background-image: url("https://a-v2.sndcdn.com/assets/images/never_stop_listening@2x-ae7903ca.jpg");
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;
`;

const AppContainer = () => {
  return (
    <Container>
      <AppImg></AppImg>
      <div>
        <h1>Never stop listening</h1>
        <p>
          SoundCloud is available on Web, iOS, Android, Sonos, Chromecast, and
          Xbox One.
        </p>
        <div style={{ display: "flex", marginTop: "40px" }}>
          <Link to="#" />
          <Link
            to="#"
            style={{
              width: "135px",
              marginLeft: "10px",
              backgroundImage:
                "url(https://a-v2.sndcdn.com/assets/images/google_play_badge@en-51d52194.png)",
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default AppContainer;
