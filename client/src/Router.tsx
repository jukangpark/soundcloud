import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Search from "./pages/Search";
import Write from "./pages/Write";
import Post from "./pages/Post";
import Update from "./pages/Update";

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
        <Route path="/search">
          <Search />
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
