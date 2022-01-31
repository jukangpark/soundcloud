import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Write from "./pages/Write";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/write">
          <Write />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
