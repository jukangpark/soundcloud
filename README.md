https://board-app-jkp.herokuapp.com/

## Stack

React, Express, MongoDB, Mongoose, typescript, jwt, bcrypt, react-query, recoil, multerS3,
react-hook-form, react-router-dom, styled-components

## Deploy

서버 ⇒ heroku
db ⇒ mongoDB Atlas
storage ⇒ Amazon S3(Simple Storage Service)

## Description

사용자들이 음악을 업로드 하고 음악을 즐기고
댓글을 달 수 있는 사운드 클라우드를 클론 하는 웹사이트를 모두 혼자 빌드해보았습니다.

## 개선해야할 점

전체적인 UX 개선
unauthorized 유저가 음악을 업데이트할 때 다른 페이지로 넘어가는 것이 아닌
그 페이지에서 업데이트 하지 못하게끔 막기.
좋아요 기능
반응형
댓글 시간 유튜브 처럼 바꾸기

## 힘들었던 점

cookie-session 방식의 로그인을 구현했었는데
처음으로 jwt 방식을 사용해보았습니다.
구글링 하는게 힘들었습니다.

서버를 스스로 빌드하는게 처음이여서
클라이언트와 서버를 동시에 빌드하고,
동시에 배포를 하기 위해서
개발 환경을 구축하였는데
proxy 설정에서 좀 애를 먹었습니다.
