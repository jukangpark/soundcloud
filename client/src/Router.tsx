import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import Music from "./pages/Music";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cookieState } from "./atoms";
import UpdateProfile from "./pages/UpdateProfile";

const Router = () => {
  const [cookies, removeCookie] = useCookies(["user"]);
  const [hasCookie, setHasCookie] = useRecoilState(cookieState);

  useEffect(() => {
    if (cookies.user && cookies.user !== "undefined") {
      setHasCookie(true);
      console.log(
        "cookies 에 user 에 값이 존재한다면 이걸 출력해주고 홈화면을 렌더링해주세요."
      );
    }
  }, [cookies]);

  return (
    <BrowserRouter>
      {hasCookie ? <Redirect to="/" /> : <Redirect to="/login" />}
      {/*       서버로부터 받아온 토큰 정보가 쿠키에 저장되어 있지 않다면 LogIn 컴포넌트를 띄우고,
      저장되어 있다면 ToDo 컴포넌트를 띄운다. */}

      <Switch>
        <Route path="/write">
          <Upload />
        </Route>
        <Route path="/join">{hasCookie ? <Redirect to="/" /> : <Join />}</Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/profile/:id/update">
          <UpdateProfile />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/:id/update">
          <Update />
        </Route>
        <Route path="/:id">
          <Music />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
