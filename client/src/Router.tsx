import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Search from "./pages/Search";
import Write from "./pages/Write";
import Post from "./pages/Post";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/write">
          <Write />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/:id/update">
          <Update />
        </Route>
        <Route path="/:id">
          <Post />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
