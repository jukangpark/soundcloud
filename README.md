# sound cloud clone

## 서비스 소개

<p>
    음악을 업로드 하고 공유 할 수 있는 사운드 클라우드 클론📀
</p>
<p align='center'>
<img width="80%" alt="mainPage" src="https://user-images.githubusercontent.com/75718898/157369193-3a3aab6a-e1e6-4fbd-83de-a73994a5034b.png">
</p>

<p align='center'>
    <a href="https://board-app-jkp.herokuapp.com/">Published Webpage</a> 👈🏻
</p>

## 🛠 Using Skill

<p align='center'>

### client

> @fortawesome/fontawesome-svg-core: ^1.3.0<br>
> @fortawesome/free-brands-svg-icons: ^6.0.0<br>
> @fortawesome/free-regular-svg-icons: ^6.0.0<br>
> @fortawesome/free-solid-svg-icons: ^6.0.0<br>
> @fortawesome/react-fontawesome: ^0.1.17<br>
> @testing-library/jest-dom: ^5.16.1<br>
> @testing-library/react: ^12.1.2<br>
> @testing-library/user-event: ^13.5.0<br>
> @types/jest: ^27.4.0<br>
> @types/node: ^16.11.21<br>
> @types/react: ^17.0.38<br>
> @types/react-dom: ^17.0.11<br>
> @types/react-helmet: ^6.1.5<br>
> @types/react-query: ^1.2.9<br>
> @types/react-router-dom: ^5.3.3<br>
> @types/styled-components: ^5.1.21<br>
> concurrently: ^7.0.0<br>
> node-sass: ^7.0.1<br>
> react: ^17.0.2<br>
> react-cookie: ^4.1.1<br>
> react-dom: ^17.0.2<br>
> react-h5-audio-player: ^3.8.2<br>
> react-helmet: ^6.1.0<br>
> react-helmet-async: ^1.2.2<br>
> react-hook-form: ^7.25.3<br>
> react-query: ^3.34.14<br>
> react-router-dom: ^5.3.0<br>
> react-scripts: 5.0.0<br>
> recoil: ^0.6.1<br>
> styled-components: ^5.3.3<br>
> typescript: ^4.5.5<br>

### server

> @types/jsonwebtoken: ^8.5.8<br>
> @types/multer: ^1.4.7<br>
> @types/multer-s3: ^2.7.11<br>
> aws-sdk: ^2.1075.0<br>
> bcrypt: ^5.0.1<br>
> concurrently: ^7.0.0<br>
> connect-mongo: ^4.6.0<br>
> cookie-parser: ^1.4.6<br>
> dotenv: ^14.3.2<br>
> express: ^4.17.2<br>
> express-session: ^1.17.2<br>
> jsonwebtoken: ^8.5.1<br>
> mongoose: ^6.1.8<br>
> morgan: ^1.10.0<br>
> multer: ^1.4.4<br>
> multer-s3: ^2.10.0<br>
> ts-node: ^10.4.0
> @types/bcrypt: ^5.0.0<br>
> @types/dotenv: ^8.2.0<br>
> @types/express: ^4.17.13<br>
> @types/express-session: ^1.17.4<br>
> @types/morgan: ^1.9.3<br>
> nodemon: ^2.0.15<br>
> typescript: ^4.5.5 <br>

</p>

## 기능

- music 차트 / 검색 / 업로드 / 업데이트 / 삭제 / 듣기 / 좋아요
- light / dark mode
- user 생성 / 업데이트 / 삭제

## 실행 방법

```
$ git clone https://github.com/jukangpark/SoundCloud_Clone.git
$ npm install
$ cd server
$ npm run dev
```

## TroubleShooting

1. Cookie-session 방식에서 JWT 토큰 방식으로 전환
2. 뮤직 차트
   - 조회수에 따른 차트 정렬
3. 개발 환경에서 Proxy 설정

## 더 고민한다면

- Social Login 구현하기 with Github & KakaoTalk
- MyProfile 메뉴에서 좋아요한 음악들을 최신 순으로 정렬
- Framer motion 을 이용한 홈 화면 슬라이드 기능
- User Follow 기능 구현하기
- 음악 조회수에 따른 변화 그래프 with Apex Chart 활용
- 반응형 style 주기

## Demo 👇

- light mode

<p align='center'>
<img width="80%" alt="mainPage" src="https://user-images.githubusercontent.com/75718898/157373423-cb35be9f-e004-4ff8-8051-7ad58fa91575.png">
</p>
