import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Write from "./pages/Write";

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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
