https://board-app-jkp.herokuapp.com/

## Stack

React, Express, MongoDB, Mongoose, typescript, jwt, bcrypt, react-query, recoil, multerS3,<br>
react-hook-form, react-router-dom, styled-components

## Deploy

서버 ⇒ heroku<br>
db ⇒ mongoDB Atlas<br>
storage ⇒ Amazon S3(Simple Storage Service)<br>

## Description

사용자들이 음악을 업로드 하고 음악을 즐기고<br>
댓글을 달 수 있는 사운드 클라우드를 클론 하는 웹사이트를 모두 혼자 빌드해보았습니다.<br>

## 개선해야할 점

전체적인 UX 개선<br>
unauthorized 유저가 음악을 업데이트할 때 다른 페이지로 넘어가는 것이 아닌<br>
그 페이지에서 업데이트 하지 못하게끔 막기.<br>
좋아요 기능<br>
반응형<br>
댓글 시간 유튜브 처럼 바꾸기<br>
소셜 로그인 기능 ( 카카오톡, Github)<br>

## 힘들었던 점

cookie-session 방식의 로그인을 구현했었는데<br>
처음으로 jwt 방식을 사용해보았습니다.<br>
구글링 하는게 힘들었습니다.<br>

서버를 스스로 빌드하는게 처음이여서<br>
클라이언트와 서버를 동시에 빌드하고,<br>
동시에 배포를 하기 위해서<br>
개발 환경을 구축하였는데<br>
proxy 설정에서 좀 애를 먹었습니다.<br>

## 기능

Music CRUD<br>
Comment CRD<br>
User CRUD<br>
Dark mode / Light mode with Recoil<br>
